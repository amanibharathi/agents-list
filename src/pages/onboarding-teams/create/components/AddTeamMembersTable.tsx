import AdminFormWrapper from '@/app/admin/_AdminComponent/AdminFormWrapper'
// import CkInput from '@/app/components/chakraOverwrites/CkInput'
// import AppButton from '@/app/components/elements/AppButton'
import ListingTable from '@/app/components/table/ListingTable'
// import { isEmailValid } from '@/app/utils/functions/otherFunctions'
import { Box } from '@chakra-ui/react'
import React from 'react'
// import toast from 'react-hot-toast'
// import { IoIosAddCircleOutline, IoIosRemoveCircleOutline } from 'react-icons/io'

const tableMeta = {
  data: {
    columns: {
      first_name: 'First Name',
      last_name: 'Last Name',
      full_name: 'Full Name',
      phone_number: 'Phone Number',
      email: 'Email',
    },
  },
}

const AddTeamMembersTable = ({ tableData }: { tableData: any }) => {
  const selectedData = {
    data: {
      results: [...tableData],
    },
  }

  return (
    <AdminFormWrapper
      titleClassName="mb-[39px] mt-[-4px]"
      title={'Added Team Members'}
    >
      {/* <Flex gap={'10px'} alignItems={'center'} mb={'39px'}>
        <CkInput
          //@ts-ignore
          value={mail}
          onChange={(e: any) => setMail(e?.target?.value)}
          placeholder="Enter Email Id"
          formControlClassName="w-[100%] !max-w-[400px]"
          className=" !text-[#444444]"
          text="Search agent*"
        />
        <AppButton
          disabled={mail == ''}
          onClick={() => handleAddToList()}
          icon={<IoIosAddCircleOutline />}
        >
          Add
        </AppButton>
      </Flex> */}
      <Box>
        {/* @ts-ignore */}
        <ListingTable
          // customActions={customActions()}
          tableMeta={tableMeta}
          tableData={selectedData}
        />
      </Box>
    </AdminFormWrapper>
  )
}

export default AddTeamMembersTable
