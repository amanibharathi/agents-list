
// import CreateTeamFormContainerAndProvider from './components/CreateTeamFormContainerAndProvider'
import { useForm } from 'react-hook-form'
import EditTeamForm from '../../create/components/EditTeamForm'
import AdminContainer from '../../../Auth/AgentComponents/admincompenets/AdminContainer'
import AdminBreadcrumbs from '../../../Auth/AgentComponents/admincompenets/AdminBreadcrumbs'
import PageHeader from '../../../onboarding-agents/[id]/documents/PageHeader'
import { useParams } from 'react-router-dom'

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

const EditPage = () => {
  const {id} = useParams()
  const newTeamForm = useForm()
  return (
    <AdminContainer className="bg-[#ffffff]">
      <AdminBreadcrumbs route={breadcrumbs} />
      <PageHeader title={`Edit Team`} />
      <EditTeamForm newTeamForm={newTeamForm} id={id} />
    </AdminContainer>
  )
}

export default EditPage
