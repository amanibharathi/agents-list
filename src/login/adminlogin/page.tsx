import { useEffect, useState } from 'react'
import LoginWrapper from '../LoginWrapper'
import AdminLoginForm from './AdminLoginFormContainer'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import makePostRequest from '../../api/makePostRequest'
import { REFRESH_API } from '../../api-utils'
import { ADMIN_DASHBOARD, MAKE_ABSOLUTE_URL } from '../../pages/Auth/AgentComponents/navigation/urls'
import useManageCookies from '../../utils/hooks/useSetCookiesOnSuccess'

const AdminLoginPage = () => {
  const [comp, setComp] = useState('login')
  const navigate = useNavigate()
  const { handleSetCookiesOnSuccess } = useManageCookies()
  
  // Convert to the object syntax for useMutation
  const { mutate } = useMutation({
    mutationFn: (body: any) => makePostRequest(REFRESH_API, body),
    onSuccess: (res) => {
      handleSetCookiesOnSuccess(res)
      navigate(MAKE_ABSOLUTE_URL(ADMIN_DASHBOARD))
    },
    retry: 1,
  })

  useEffect(() => {
    // @ts-ignore
    mutate({ type: 'admin' })
  }, [])

  return (
    <LoginWrapper>
      <AdminLoginForm comp={comp} setComp={setComp} />
    </LoginWrapper>
  )
}

export default AdminLoginPage