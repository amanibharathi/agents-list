
// import CreateTeamFormContainerAndProvider from './components/CreateTeamFormContainerAndProvider'
import { useForm } from 'react-hook-form'
import EditTeamForm from '../../create/components/EditTeamForm'
import AdminContainer from '../../../Auth/AgentComponents/admincompenets/AdminContainer'
import AdminBreadcrumbs from '../../../Auth/AgentComponents/admincompenets/AdminBreadcrumbs'
import PageHeader from '../../../onboarding-agents/[id]/documents/PageHeader'

const breadcrumbs = [
  {
    text: 'Agents',
    link: '/admin/agents/agents-list',
  },
  {
    text: 'All Teams',
    link: '/admin/agents/teams-list',
  },
]

const Page = ({ params }: { params: { id: string } }) => {
  const newTeamForm = useForm()
  return (
    <AdminContainer className="bg-[#ffffff]">
      <AdminBreadcrumbs route={breadcrumbs} />
      <PageHeader title={`Edit Team`} />
      <EditTeamForm newTeamForm={newTeamForm} id={params?.id} />
    </AdminContainer>
  )
}

export default Page
