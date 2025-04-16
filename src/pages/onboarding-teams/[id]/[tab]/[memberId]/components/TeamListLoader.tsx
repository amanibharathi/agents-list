import { Skeleton, SkeletonCircle } from '@chakra-ui/react'

const TeamListLoader = () => {
  return (
    <div className="flex justify-between w-full items-center px-[22px] py-[11px] border-b border-[#E2E8F0]">
      <div className="flex gap-[13px] items-center flex-1">
        <SkeletonCircle className="!h-[56px] !w-[56px]" />

        <div className="flex flex-col justify-center gap-1 flex-1">
          <Skeleton className="!w-[30%] !h-[15px]" />
          <Skeleton className="!w-[10%] !h-[8px]" />
        </div>
      </div>
    </div>
  )
}

export default TeamListLoader
