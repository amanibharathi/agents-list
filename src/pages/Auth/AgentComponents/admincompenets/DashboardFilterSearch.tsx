//@ts-nocheck
'use client'
import React from 'react'

const DashboardFilterSearch = (props) => {
  return (
    <>
      {/* <Controller
        {...props}
        render={(field) => (
          <CkInput
            placeholder="Search"
            className="border-none rounded-[8px]  !w-[300px] "
            wrapperClassName={'!w-[300px]'}
            {...props}
            {...field}
          />
        )}
      /> */}
      <input
        placeholder="Search"
        className="px-4 outline-none rounded-md"
        {...props.register('name_search')}
      />
    </>
  )
}

export default DashboardFilterSearch
