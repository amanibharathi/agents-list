import { Flex, SimpleGrid, Skeleton } from '@chakra-ui/react'
import React, { memo } from 'react'

const startColor = '#f9f9f9'
// '#f6f6f6'
const endColor = '#d0d0d069'

const ListingTableSkeleton = ({
  rowsCount = 9,
  columnsCount = 5,
}: {
  rowsCount?: number
  columnsCount?: number
}) => {
  return (
    <Flex
      w={'100%'}
      flexFlow={'column'}
      //   background={'rgba(97, 104, 118, 0.16)'}
      gap={'14px'}
    >
      <Skeleton startColor={startColor} endColor={endColor} h={'64px'} />
      {new Array(rowsCount).fill(0).map((r, rInd: number) => (
        <SimpleGrid
          padding={'5px 30px'}
          justifyContent={'center'}
          key={r + rInd}
          columns={columnsCount}
          gap={'8%'}
        >
          {new Array(columnsCount).fill(0).map((c, ind) => (
            <Skeleton
              startColor={startColor}
              endColor={endColor}
              borderRadius={'20px'}
              key={c + ind}
              h={'30px'}
            />
          ))}
        </SimpleGrid>
      ))}
    </Flex>
  )
}

export default memo(ListingTableSkeleton)
