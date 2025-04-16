
// import CreateTeamFormContainerAndProvider from './components/CreateTeamFormContainerAndProvider'
import { useForm } from 'react-hook-form'
import CreateTeamNewForm from './components/CreateTeamNewForm'
import AdminContainer from '../../../login/adminlogin/AdminContainer'
import AdminBreadcrumbs from '../../Auth/AgentComponents/admincompenets/AdminBreadcrumbs'
import PageHeader from '../../onboarding-agents/[id]/documents/PageHeader'

const breadcrumbs = [
  {
    text: 'Agents',
    link: '/admin/agents/agents-list',
  },
  {
    text: 'Create new team',
  },
]

const Page = () => {
  const newTeamForm = useForm()
  return (
    <AdminContainer className="bg-[#ffffff]">
      <AdminBreadcrumbs route={breadcrumbs} />
      <PageHeader title={`Create New Team`} />
      <CreateTeamNewForm newTeamForm={newTeamForm} />
    </AdminContainer>
  )
}

export default Page
