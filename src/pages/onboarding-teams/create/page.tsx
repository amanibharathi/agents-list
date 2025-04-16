'use client'
import AdminBreadcrumbs from '@/app/admin/_AdminComponent/AdminBreadcrumbs/AdminBreadcrumbs'
import AdminContainer from '@/app/admin/_AdminComponent/AdminContainer'
import PageHeader from '@/app/admin/_AdminComponent/PageHeader'
import React from 'react'
// import CreateTeamFormContainerAndProvider from './components/CreateTeamFormContainerAndProvider'
import { useForm } from 'react-hook-form'
import CreateTeamNewForm from './components/CreateTeamNewForm'

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
