// import AppText from '@/app/components/elements/AppText'
import { Box } from '@chakra-ui/react'
import SearchResults from './SearchResultsComp'
// import AdminSerachComponent from '@/app/admin/_AdminComponent/AdminSerachComponent'
import AppText from '../../../../../AppComponents/AppText-agent'
import AdminSerachComponent from '../../../../../login/adminlogin/AdminSerachComponent'

const AddATeamMemberModalStep1 = ({
  setSelectedAgentFrom1,
  selectedAgents,
  selectedIndex,
  setSelectedIndex,
  formUtil,
  isLoading = false,
}: {
  setSelectedAgentFrom1: any
  selectedAgents: any
  selectedIndex: any
  setSelectedIndex: any
  formUtil: any
  isLoading: boolean
}) => {
  return (
    <Box>
      <div className="flex flex-col gap-[10px]">
        <AppText className={`!text-[#444444] text-[16px] font-[600]`}>
          Search agents by Name (or) License #
        </AppText>
        <AdminSerachComponent
          maxW="100%"
          placeholder="Search by name or license"
          register={formUtil.register('search')}
          isShadowBox={false}
          isTeam
        />
      </div>
      <SearchResults
        isLoading={isLoading}
        results={selectedAgents}
        setSelectedAgentFrom1={setSelectedAgentFrom1}
        selectedIndex={selectedIndex}
        setSelectedIndex={setSelectedIndex}
      />
    </Box>
  )
}

export default AddATeamMemberModalStep1
