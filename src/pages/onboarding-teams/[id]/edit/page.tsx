'use client'
import AdminBreadcrumbs from '@/app/admin/_AdminComponent/AdminBreadcrumbs/AdminBreadcrumbs'
import AdminContainer from '@/app/admin/_AdminComponent/AdminContainer'
import PageHeader from '@/app/admin/_AdminComponent/PageHeader'
import React from 'react'
// import CreateTeamFormContainerAndProvider from './components/CreateTeamFormContainerAndProvider'
import { useForm } from 'react-hook-form'
import EditTeamForm from '../../create/components/EditTeamForm'

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
