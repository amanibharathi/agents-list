import {
  GET_AGENT_TEAM_NOTES_LIST,
  POST_AGENT_TEAM_NOTES,
} from '../../../../../../api-utils'
// import CkTextArea from '@/app/components/chakraOverwrites/CkTextArea'
import AppButton from '../../../../../../AppComponents/AppButton-agent'
// import AppImage from '@/app/components/elements/AppImage'
// import AppText from '@/app/components/elements/AppText'
import makeGetRequest from '../../../../../../api/makeGetRequest'
import makePostRequest from '../../../../../../api/makePostRequest'
import { getFirstErrorMessage } from '../../../../../../utils/functions/commonFunctions'
import DummyProfileImage  from '../../../../../../assets/images/dummy-profile-placeholder.png'
import {
  Accordion,
  AccordionButton,
  AccordionItem,
  AccordionPanel,
} from '@chakra-ui/react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { FaSortDown } from 'react-icons/fa'
import { PiPaperPlaneTilt } from 'react-icons/pi'
import { useMutation, useQuery } from 'react-query'
// import TeamListLoader from './skeleton-loader/TeamListLoader'
import CkTextArea from '../../../../../Auth/AgentComponents/admincompenets/CkTextArea'
import AppImage from '../../../../../../AppComponents/AppImage'
import AppText from '../../../../../../AppComponents/AppText-agent'
import TeamListLoader from './TeamListLoader'

const AgentTeamNotesComp = ({
  id,
  isAdmin = false,
}: {
  id: number | string
  isAdmin?: boolean
}) => {
  const [accordionOpen, setAccordionOpen] = useState(false)
  const messagesEndRef = React.useRef<HTMLDivElement | null>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const [notes, setNotes] = useState('')
  const {
    data: noteData,
    isLoading: notesIsLoading,
    refetch,
  } = useQuery(
    [GET_AGENT_TEAM_NOTES_LIST + id],
    () =>
      makeGetRequest(GET_AGENT_TEAM_NOTES_LIST, {
        request: id,
      }),
    {
      enabled: !!id && accordionOpen,
    }
  )

  useEffect(() => {
    if (noteData?.data?.results?.length) {
      scrollToBottom()
    }
  }, [noteData?.data?.results])

  const { isLoading, mutate } = useMutation(
    (body) => makePostRequest(POST_AGENT_TEAM_NOTES, body),
    {
      onSuccess: () => {
        refetch()
        setNotes('')
        toast.success('Notes Added')
      },
      onError: (err) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    }
  )

  return (
    <Accordion index={accordionOpen ? [0] : []}>
      <AccordionItem
        sx={{
          borderTop: 'none',
          borderBottom: 'none',
          zIndex: 0,
        }}
      >
        {({ isExpanded }) => (
          <>
            <AccordionButton
              className="!text-left"
              onClick={() => setAccordionOpen(!isExpanded)}
              sx={{
                display: 'flex',
                flexFlow: 'column',
                textAlign: 'left',
                justifyContent: 'start',
                borderRadius: '17px',

                p: '9px',
                '&:hover': {
                  borderRadius: '17px',
                  background: 'white',
                },
              }}
            >
              <div className="flex-1 flex justify-between items-center w-full">
                <span className="text-[14px] font-[500]">View Notes</span>
                <FaSortDown className="mt-[-5px]" />
              </div>
            </AccordionButton>
            <AccordionPanel
              sx={{
                mt: '10px',
              }}
              className="max-h-[396px] agent-onboarding-checklist overflow-y-auto flex flex-col gap-[10px]"
            >
              {notesIsLoading ? (
                <div>
                  <TeamListLoader />
                </div>
              ) : (
                <>
                  <div>
                    <div className="flex flex-col gap-2 max-h-[200px] overflow-y-scroll">
                      {/* @ts-ignore */}
                      {noteData?.data?.results?.map((noteData: any) => (
                        <MessageListComp
                          created={noteData.created}
                          message={noteData?.notes}
                          name={noteData?.created_by?.full_name}
                          profileImage={
                            noteData?.created_by?.profile_picture?.file
                          }
                          key={noteData?.id}
                        />
                      ))}
                      <div ref={messagesEndRef} />
                    </div>
                    <div>
                      <div className="rounded-[8px] border border-[#DDDDDD] p-[15px]">
                        {/* @ts-ignore */}
                        <CkTextArea
                          //@ts-ignore
                          placeholder="Add new note"
                          className="!text-[14px] min-h-[40px] !p-[0px]  focus:!shadow-none active:!shadow-none !border-none"
                          onChange={(e: any) => setNotes(e?.target?.value)}
                          value={notes}
                          onKeyDown={(e: any) => {
                            if (e.key === 'Enter') {
                              e.preventDefault()
                              if (notes != '') {
                                //@ts-ignore
                                mutate({
                                  notes,
                                  request: id,
                                })
                              }
                            }
                          }}
                        />
                        <div className="flex justify-end">
                          <AppButton
                            icon={isAdmin ? <PiPaperPlaneTilt /> : null}
                            label={isAdmin ? '' : 'Submit'}
                            onClick={() =>
                              //@ts-ignore
                              mutate({
                                notes,
                                request: id,
                              })
                            }
                            disabled={notes == ''}
                            isLoading={isLoading || notesIsLoading}
                            className={` !text-[#10295A] py-[2px] ${isAdmin ? '!p-[13px] !bg-[#EDF3FF] !rounded-full' : 'px-[20px] !bg-white rounded-[8px] border border-[#10295A]'} leading-[20px] font-[600]`}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}

const MessageListComp = ({
  profileImage,
  name,
  created,
  message,
}: {
  profileImage: string | undefined
  name: string
  created: string
  message: string
}) => {
  return (
    <div className="pt-[12px] pb-[8px] border-b border-b-[#E7E7E6] p-2">
      <div className="flex items-center gap-[10px]">
        <AppImage
          width={40}
          height={40}
          src={profileImage || DummyProfileImage}
          alt="profile-image"
          className="h-[40px] w-[40px] rounded-[100px]"
        />
        <AppText
          text={name}
          className="!text-[#1A1C1E] text-[14px] font-[600]"
        />
        <AppText
          text={moment(created).fromNow()}
          className="!text-[#717171] text-[12px] font-[400]"
        />
      </div>
      <div>
        <AppText
          className="leading-[24px] text-[14px] mt-[10px] !text-[#10295A]"
          text={message}
        />
      </div>
    </div>
  )
}

export default AgentTeamNotesComp
