
import { useEffect, useMemo, useState } from 'react'
// import NotesButtonIcon from '@/app/icons/notesButtonIcon'
// import RequestChangeIcon from '@/app/icons/requestChangeIcon'
import CustomContendHeader from '../components/custom-content-header'
import { ButtonDataInterFace } from '../components/custom-content-header'
import CustomFormAccordion from '../components/custom-form-accordion'
// import StageIcon from '@/app/icons/stageIcon'
// import AppText from '@/app/components/elements/AppText'
import AccordionItemComponent from '../components/accordion-item-component'
// import EditBlueIcon from '@/app/icons/editBlueIcon'
// import CkAppModal from '@/app/components/modal/AppModal'
import { useDisclosure } from '@chakra-ui/react'
import ModalNotesComponent from '../components/modal-notes-component'
import ModalRejectComponent from '../components/modal-reject-component'
// import makeGetRequest from '@/app/utils/api/makeGetRequest'
import { useQuery, useMutation } from 'react-query'
import { useParams } from 'react-router-dom'
import ContentRender from './components/contentRender'
// import { capitalize } from '@/app/utils/functions/otherFunctions'
// import makePostRequest from '@/app/utils/api/makePostRequest'
import toast from 'react-hot-toast'
// import { getFirstErrorMessage } from '@/app/utils/functions/otherFunctions'
import TransferLicense from './components/transferLicense'
// import useGetAgentStatus from '@/app/hooks/admin/useGetAgentStatus'
import SignedContracts from './components/signedContracts'
import SponsorCard from './components/sponsorCard'
import DocumentSection from './components/documentSection'
import BillingInfo from './components/billingInfo'
// import { useGetAgentDocumentList } from '@/app/hooks/queryhooks/useGetAgentDocumentList'
import NotesButtonIcon from './components/notesButtonIcon'
import RequestChangeIcon from './components/requestChangeIcon'
import StageIcon from './components/stageIcon'
import AppText from '../../../../AppComponents/AppText-agent'
import EditBlueIcon from './components/editBlueIcon'
import CkAppModal from '../../../Auth/AgentComponents/admincompenets/AppModal'
import { ADMIN_AGENT_TEMPLATE_GET,ADMIN_FORM_BUILDER_FORM_GET,
  ADMIN_FORM_BUILDER_SUB_FORM_GET,
  AGENT_NOTES_CREATE, } from '../../../../api-utils'
import makeGetRequest from '../../../../api/makeGetRequest'
import { capitalize, getFirstErrorMessage } from '../../../../utils/functions/commonFunctions'
import makePostRequest from '../../../../api/makePostRequest'
import useGetAgentStatus from '../../../../utils/hooks/useGetAgentStatus'
import { useGetAgentDocumentList } from '../../../../utils/hooks/useGetAgentDocumentList'
// import moment from 'moment'

const dummyData = {
  stage2: [
    {
      title: 'Contracts',
      status: 'Waiting for Approval',
    },
  ],
  stage3: [
    {
      title: 'Tools & Payments',
      status: '',
    },
  ],
  stage4: [
    {
      title: 'Transfer License & Board',
      status: '',
    },
  ],
}

const GetStatusComp = ({ text }: { text: any }) => {
  let bg = '',
    fontCol = ''
  if (text === 'yet_to_start') {
    bg = '#FF98001A'
    fontCol = '#FF9800'
  } else if (text === 'in_progress') {
    bg = '#FF98001A'
    fontCol = '#FF9800'
  } else if (text === 'submitted') {
    bg = '#FF98001A'
    fontCol = '#FF9800'
  } else if (text === 'approved') {
    bg = '#2FB3441A'
    fontCol = '#2FB344'
  } else if (text === 'completed') {
    bg = '#2FB3441A'
    fontCol = '#2FB344'
  } else if (text === 'rejected') {
    bg = '#FF98001A'
    fontCol = '#FF9800'
  }
  return (
    <AppText
      type="span"
      className={`font-semibold rounded-[80px] px-[10px] !text-[${fontCol}] bg-[${bg}]`}
    >
      {capitalize(text?.replaceAll('_', ' '))}
    </AppText>
  )
}

export default function Page() {
  const { onClose, onOpen, isOpen } = useDisclosure()
  const [isEdit, setEdit] = useState(null)
  const [stageData, setStageData] = useState<any[]>([])
  const [isChangeReq, setChangeReq] = useState(null)
  const {
    onClose: requestOnClose,
    onOpen: requestOnOpen,
    isOpen: requestIsOpen,
  } = useDisclosure()
  const buttonData: ButtonDataInterFace[] = [
    {
      buttonClassName:
        '!text-[#10295A] border border-[#CDCDCD] rounded px-[30px]',
      label: 'Notes',
      variant: 'transparent',
      icon: <NotesButtonIcon />,
      onClick: () => onOpen(),
    },
    {
      buttonClassName: '',
      disabled: stageData?.[0]?.status === 'approved',
      label: 'Request Change',
      icon: <RequestChangeIcon color={'white'} />,
      onClick: () => requestOnOpen(),
    },
  ]
  const { id } = useParams()
  const { mutate } = useMutation(
    (body) => makePostRequest(AGENT_NOTES_CREATE, body),
    {
      onSuccess: () => {
        requestOnClose()
        toast.success('Change Request created Successfully')
      },
      onError: (err) => {
        //@ts-ignore
        const errMsg = getFirstErrorMessage(err?.response?.data?.data)
        //@ts-ignore
        toast.error(errMsg)
      },
    }
  )

  const stageDataResponse = useGetAgentStatus(id)?.search ?? []

  useEffect(() => {
    setStageData(stageDataResponse)
  }, [stageDataResponse])
  //--
  // const stageData_2_status =
  //   stageData[1]?.status === 'approved' ||
  //   stageData[1]?.status === 'submitted' ||
  //   stageData[1]?.status === 'rejected'
  // const stageData_3_status =
  //   stageData[2]?.status === 'approved' ||
  //   stageData[2]?.status === 'submitted' ||
  //   stageData[2]?.status === 'rejected'
  const stageData_2_status =
    stageData[1]?.status === 'completed' || stageData[1]?.status === 'rejected'
  const stageData_3_status =
    stageData[2]?.status === 'completed' || stageData[2]?.status === 'rejected'
  //--
  const { data: templateData, refetch } = useQuery(
    [ADMIN_AGENT_TEMPLATE_GET(id, stageData[0]?.form_template)],
    () =>
      makeGetRequest(ADMIN_AGENT_TEMPLATE_GET(id, stageData[0]?.form_template)),
    {
      enabled:
        stageData.length !== 0 && stageData[0]?.form_template !== undefined,
    }
  )
  const { data: sectionMeta } = useQuery(
    [ADMIN_FORM_BUILDER_FORM_GET(stageData[0]?.form_template)],
    () =>
      makeGetRequest(ADMIN_FORM_BUILDER_FORM_GET(stageData[0]?.form_template)),
    {
      enabled:
        stageData.length !== 0 && stageData[0]?.form_template !== undefined,
    }
  )
  const { data: requriedMeta } = useQuery(
    [ADMIN_FORM_BUILDER_SUB_FORM_GET(isChangeReq)],
    () => makeGetRequest(ADMIN_FORM_BUILDER_SUB_FORM_GET(isChangeReq)),
    {
      enabled: isChangeReq !== null,
    }
  )

  const { refetch: agentDocumentListRefetch } = useGetAgentDocumentList(id)

  const handleRequestSubmit = (data: any) => {
    const bdy = {
      user: id,
      form_group: data?.data?.choose_section?.value,
      form_subgroup: data?.data?.changes_required_in?.map(
        (each: any) => each?.value
      ),
      review_type: 'changes',
      notes: data?.data?.note_for_agent,
      // identity: '',
    }
    //@ts-ignore
    mutate(bdy)
  }
  const inputFields = [
    {
      name: 'choose_section',
      label: 'Choose Section *',
      otherRegProps: {
        required: true,
        onChange: (e: any) => setChangeReq(e?.target?.value?.value),
      },
      type: 'select',
      className: '!z-[10]',
      options: sectionMeta?.data?.results?.map((each: any) => {
        return {
          value: each?.id,
          label: each?.identity,
        }
      }),
    },
    {
      name: 'changes_required_in',
      label: 'Changes required in *',
      otherRegProps: {
        required: true,
      },
      type: 'multi-select',
      options: requriedMeta?.data?.results?.map((each: any) => {
        return {
          value: each?.id,
          label: each?.identity,
        }
      }),
    },
    {
      name: 'note_for_agent',
      label: 'Note for Agent *',
      placeholder: 'Description...',
      otherRegProps: {
        required: true,
      },
      type: 'textarea',
    },
  ]
  const templateList = templateData?.data ?? []

  if (templateList?.length && templateList?.length < 6) {
    templateList?.push({ index: 5, identity: 'Documents' })
    templateList?.push({ index: 6, identity: 'Sponsors' })
  }

  // const { data: sponsorData, isLoading: sponsorLoading } = useQuery(
  //   [ADMIN_AGENT_DETAIL_GET(id)],
  //   () => makeGetRequest(ADMIN_AGENT_DETAIL_GET(id))
  // )
  const accordionData = useMemo(
    () => [
      {
        header: 'Stage 1:',
        title: 'Application', // stageData.length !== 0 ? stageData[0]?.stage : '',
        status: stageData.length !== 0 ? stageData[0]?.status : '',
        time: stageData.length !== 0 ? stageData[0]?.status_updated_at : null,
        accordion: templateList.map((each: any, index: any) => {
          return {
            accordionItem: (
              <AccordionItemComponent
                key={index}
                title={each?.identity}
                // icon={<EditBlueIcon />}
              />
            ),
            accordionPanel:
              each?.identity === 'Documents' ? (
                <DocumentSection onOpen={requestOnOpen} />
              ) : each?.identity === 'Sponsors' ? (
                <SponsorCard />
              ) : (
                <ContentRender
                  data={each?.form_sub_group}
                  form_id={each?.id}
                  isEdit={isEdit == index}
                  setEdit={setEdit}
                  response={each?.response}
                  refetch={refetch}
                />
              ),
            icon: <EditBlueIcon />,
            iconOnClick: () => {
              setEdit(index)
              if (each?.identity === 'Documents') {
                agentDocumentListRefetch()
              }
            },
          }
        }),
      },
      {
        header: 'Stage 2:',
        title: ' Sign your ICA',
        status: stageData.length !== 0 ? stageData[1]?.status : '',
        time: stageData.length !== 0 ? stageData[1]?.status_updated_at : null,
        accordion: dummyData.stage2.map((each: any, index: any) => {
          return {
            accordionItem: (
              <AccordionItemComponent
                key={index}
                title={each.title}
                // icon={<EditBlueIcon />}
              />
            ),
            accordionPanel: stageData.length !== 0 && stageData_2_status && (
              <SignedContracts stage={stageData[1]} onOpen={requestOnOpen} />
            ),
            icon: <EditBlueIcon />,
            iconOnClick: () => setEdit(index),
          }
        }),
      },
      {
        header: 'Stage 3:',
        title: ' Customize your Tools & Launch Fee Payment',
        status: stageData.length !== 0 ? stageData[2]?.status : '',
        time: stageData.length !== 0 ? stageData[2]?.status_updated_at : null,
        accordion: dummyData.stage3.map((each: any, index: any) => {
          return {
            accordionItem: (
              <AccordionItemComponent
                key={index}
                title={each.title}
                // icon={<EditBlueIcon />}
              />
            ),
            accordionPanel: stageData.length !== 0 && stageData_3_status && (
              <BillingInfo />
            ),
            icon: <EditBlueIcon />,
            iconOnClick: () => setEdit(index),
          }
        }),
      },
      {
        header: 'Stage 4:',
        title: ' Transfer License & Board',
        status: stageData.length !== 0 ? stageData[3]?.status : '',
        time: stageData.length !== 0 ? stageData[3]?.status_updated_at : null,
        accordion: dummyData.stage4.map((each: any, index: any) => {
          return {
            accordionItem: (
              <AccordionItemComponent
                key={index}
                title={each.title}
                // icon={<EditBlueIcon />}
              />
            ),
            accordionPanel: <TransferLicense />,
            icon: <EditBlueIcon />,
            iconOnClick: () => {
              setEdit(index)
            },
          }
        }),
      },
    ],
    [templateData, isEdit, stageData]
  )
  return (
    <div className="">
      hiiiiiiiiiiiiiiiiiiiiiiiiii
      <CkAppModal
        className="!w-full !max-w-[823px]"
        bodyClassName="!p-0"
        isOpen={isOpen}
        onClose={onClose}
        //@ts-ignore
        header={'Notes'}
        headerClassName="rounded-md text-[#10295A] text-[20px] font-[500] border-b-[1px] border-[#D9D9D9] !py-[26px] !px-[20px] bg-[#E7EFF7]"
        closeButton={true}
      >
        <ModalNotesComponent id={id} />
      </CkAppModal>
      <CkAppModal
        className="!w-full !max-w-[723px]"
        bodyClassName="!px-[40px] !py-[6px]"
        isOpen={requestIsOpen}
        onClose={requestOnClose}
        //@ts-ignore
        header={'Request Change'}
        headerClassName="rounded-md text-[#10295A] text-[20px] font-[500] !py-[26px] !px-[40px] "
        closeButton={true}
      >
        <ModalRejectComponent
          onClose={requestOnClose}
          inputFields={inputFields}
          buttonLabel1="Cancel"
          buttonLabel2="Request Change"
          handleSumbit={handleRequestSubmit}
        />
      </CkAppModal>
      <div className="my-10">
        <CustomContendHeader
          heading={'Onboarding Application'}
          buttonData={buttonData}
        />
      </div>
      <div className="flex flex-col gap-[20px]">
        {accordionData.map((each, index) => (
          <div key={index}>
            <div className="flex px-[40px] py-[25px] gap-[10px] bg-[#EDF3FF] rounded-[20px] mb-[20px]">
              <StageIcon />
              <div className="flex gap-[100px]">
                <AppText
                  className="!text-[#10295A] text-base font-semibold"
                  type="span"
                >
                  {each?.header}{' '}
                  <AppText type="span" className="ml-[10px] !text-[#000000]">
                    {each?.title}
                  </AppText>
                </AppText>
                {each?.status ? <GetStatusComp text={each?.status} /> : ''}
                {each?.time
                  ? // <AppText
                    //   type="span"
                    //   className="ml-[2px] !text-[14px] !text-[#000000]"
                    // >
                    //   {moment(each?.time).fromNow()}
                    // </AppText>
                    ''
                  : ''}
              </div>
            </div>
            <CustomFormAccordion accordionData={each?.accordion} />
          </div>
        ))}
      </div>
    </div>
  )
}
