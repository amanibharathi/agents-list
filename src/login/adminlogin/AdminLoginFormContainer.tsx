import AdminLoginStep from './AdminLoginComp'
import AdminForgotPasswordStep from './AdminForgotPasswordStep'
import AdminSetPasswordBox from './AdminSetPasswordBox'
import { useSearchParams } from 'react-router-dom'

const AdminLoginFormContainer = ({
  comp,
  setComp,
}: {
  comp: unknown
  setComp: unknown
}) => {
  const [searchParams] = useSearchParams()
  const resetPassId = searchParams.get('id')
  const resetPassToken = searchParams.get('token')
  const action = searchParams.get('action')

  if (resetPassToken && resetPassId && action === 'set-password')
    return <AdminSetPasswordBox />
  if (comp === 'login') return <AdminLoginStep setComp={setComp} />
  if (comp === 'forgot-password') return <AdminForgotPasswordStep />

  return <div></div>
}

export default AdminLoginFormContainer
