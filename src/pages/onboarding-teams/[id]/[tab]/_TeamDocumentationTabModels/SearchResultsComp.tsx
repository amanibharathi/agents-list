import AppText from '@/app/components/elements/AppText'
import EmailatIcon from '@/app/icons/emailatIcon'
import PhoneIcon from '@/app/icons/phoneIcon'
import {
  formatToUSPhone,
  truncateString,
} from '@/app/utils/functions/otherFunctions'
import { Avatar } from '@chakra-ui/react'
import React from 'react'
import { FaCircleCheck } from 'react-icons/fa6'
import { Skeleton, SkeletonCircle } from '@chakra-ui/react'

type SearchResult = {
  label: string
  phone_number: string
  email: string
  image: string
  license: string
}

type SearchResultsProps = {
  results: SearchResult[]
  setSelectedAgentFrom1: any
  selectedIndex: any
  setSelectedIndex: any
  isLoading: boolean
}

const SearchResultsSkeleton = () => {
  return (
    <div className="w-[691px] h-auto flex-col justify-start items-start gap-5 inline-flex mt-[40px]">
      <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
        <div className="text-[#444444] text-base font-semibold">
          <Skeleton height="20px" width="150px" />
        </div>
      </div>
      <div className="self-stretch flex-col justify-start items-start flex">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="self-stretch p-5 border-b border-neutral-300 justify-between items-center gap-5 inline-flex"
          >
            <div className="grow shrink basis-0 h-[50px] justify-start items-center gap-2.5 flex">
              <div className="w-12 h-12 justify-center items-center flex">
                <SkeletonCircle size="12" />
              </div>
              <div className="grow shrink basis-0 h-[50px] justify-start items-center gap-[20px] flex">
                <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                  <Skeleton height="18px" width="120px" />
                  <Skeleton height="14px" width="100px" />
                </div>
                <div className="flex-col justify-start items-start gap-[12px] inline-flex">
                  <Skeleton height="14px" width="150px" />
                  <Skeleton height="14px" width="180px" />
                </div>
              </div>
            </div>
            <SkeletonCircle size="6" />
          </div>
        ))}
      </div>
    </div>
  )
}

const SearchResults: React.FC<SearchResultsProps> = ({
  results,
  setSelectedAgentFrom1,
  selectedIndex,
  setSelectedIndex,
  isLoading,
}) => {
  return (
    <>
      {isLoading ? (
        <SearchResultsSkeleton />
      ) : (
        <div className="w-[691px] h-auto flex-col justify-start items-start gap-5 inline-flex mt-[40px]">
          <div className="self-stretch justify-start items-center gap-2.5 inline-flex">
            <div className="text-[#444444] text-base font-semibold">
              Search Results ({results?.length ?? '0'})
            </div>
          </div>
          <div className="self-stretch flex-col justify-start items-start flex  max-h-[300px] overflow-scroll no-scrollbar">
            {results?.map((result: any, index: any) => (
              <div
                key={index}
                onClick={() => {
                  !result?.team && setSelectedIndex(index)
                  !result?.team && setSelectedAgentFrom1(result)
                }}
                className={`self-stretch p-5 ${selectedIndex === index ? 'bg-[#edf3ff]' : ''} border-b cursor-pointer border-neutral-300 justify-between items-center gap-5 inline-flex`}
              >
                <div className="grow shrink basis-0 h-[50px] justify-start items-center gap-2.5 flex">
                  <div className="w-12 h-12 justify-center items-center flex">
                    <Avatar
                      className="rounded-full max-h-[48px] max-w-[48px]"
                      src={result?.profile_picture?.file}
                      width={48}
                      height={48}
                    />
                  </div>
                  <div className="grow shrink basis-0 h-[50px] justify-start items-center gap-[20px] flex">
                    <div className="flex-col justify-start items-start gap-2.5 inline-flex">
                      <AppText
                        text={result?.full_name}
                        className="!text-[#10295a] text-lg font-semibold leading-[18px]"
                      />
                      <AppText
                        text={`License: ${result?.license ?? '-'}`}
                        className="!text-[#717171] text-sm font-medium leading-[21px]"
                      />
                    </div>
                    <div className="flex-col justify-start items-start gap-[12px] inline-flex">
                      <div className="flex gap-[10px] items-center">
                        <PhoneIcon fill="#010101" />
                        <AppText
                          className="text-[14px] !text-[#010101]"
                          type="span"
                        >
                          {result?.phone_number
                            ? formatToUSPhone(result?.phone_number?.slice(2))
                            : 'N/A'}
                        </AppText>
                      </div>
                      <div className="flex gap-[10px] items-center">
                        <EmailatIcon />
                        <AppText
                          className="text-[14px] !text-[#010101]"
                          type="span"
                        >
                          {result?.email ?? 'N/A'}
                        </AppText>
                      </div>
                    </div>
                  </div>
                </div>
                {result?.team ? (
                  <div className="flex justify-start items-start gap-2.5">
                    <AppText
                      text={`Team Name: ${truncateString(result?.team?.identity, 20) ?? '-'}`}
                      className="!text-[#000000] text-[14px] font-normal leading-[18px]"
                    />
                  </div>
                ) : selectedIndex === index ? (
                  <FaCircleCheck size={26} color="#1A9175" />
                ) : (
                  <div className="border border-[rgba(205, 205, 205, 0.50)] h-[26px] w-[26px] rounded-[30px]"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default SearchResults
