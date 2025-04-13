import Cookies from 'js-cookie'

const cookieAge = 2592000 // in seconds, which is 30 days

const setTokenAndUserData = ({
  token,
  userData,
  userType,
}: {
  token: string
  userData: any
  userType: any
}) => {
  const cookieOptions = {
    expires: cookieAge / 86400, // convert seconds to days
  }

  // @ts-ignore
  delete userData?.user_roles

  Cookies.set('token', token, cookieOptions)
  Cookies.set('user_data', JSON.stringify(userData), cookieOptions)
  Cookies.set('user_type', userType, cookieOptions)
}

const getUserToken = () => {
  return Cookies.get('token') || null
}

export const setUserTokenAndUserType = (token: string, userType: string) => {
  Cookies.set('token', token, { expires: cookieAge / 86400 })
  Cookies.set('user_type', userType, { expires: cookieAge / 86400 })
}

const getUserData = () => {
  const userData = Cookies.get('user_data')
  try {
    return userData ? JSON.parse(userData) : null
  } catch {
    return null
  }
}

const getUserType = () => {
  return Cookies.get('user_type') || null
}

const clearTokenAndUserData = () => {
  Cookies.remove('token')
  Cookies.remove('user_data')
  Cookies.remove('user_type')
}

export {
  setTokenAndUserData,
  clearTokenAndUserData,
  getUserToken,
  getUserData,
  getUserType,
}
