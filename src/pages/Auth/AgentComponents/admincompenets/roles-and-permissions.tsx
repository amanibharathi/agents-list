import NotAuthComp from './NotAuthComp'
import { ReactNode } from 'react'

export const ADMIN_LOGIN_PAGE = '/admin/login'

export const generateRegex = (segments: string[]): RegExp => {
  const regexPattern = segments
    .map((segment) => {
      if (segment === 'dyn_val') return '\\d+' // Matches any number
      if (segment === 'wild_val') return '.*' // Matches anything
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // Escape special characters
    })
    .join('\\/') // Join with "/"

  return new RegExp(`^\\/${regexPattern}$`)
}

export const flatPermissionsArray = (arr: any[]) =>
  arr?.reduce((acc, item) => {
    item.policies.forEach((policy: any) => {
      acc[policy?.identity] = {
        permissions: policy?.permissions,
      }
    })
    return acc
  }, {})

export const isPermitted = (
  _pathname: string,
  children: ReactNode,
  roleAndPermissions: any,
  protectedRoutes: any[]
) => {
  const isAvailableObj = protectedRoutes?.find((route: any) => {
    console.log('MAP', route?.path?.test(_pathname))
    return route?.path?.test(_pathname)
  })

  const permissionsObj =
    roleAndPermissions?.[isAvailableObj?.module]?.permissions

  //@ts-ignore
  if (!!permissionsObj) {
    const isTrue = isAvailableObj?.actions?.some(
      (permission: any) => permissionsObj[permission] == true
    )

    if (isTrue) return children
    else return <NotAuthComp />
  }

  return children
}

export const agentProtectedRoutes = [
  {
    // actual path -->  admin/agents/onboarding-agents/300/ica
    path: generateRegex([
      'admin',
      'agents',
      'onboarding-agents',
      'dyn_val',
      'ica',
    ]),
    module: 'ESign Management Policy',
    actions: ['is_creatable'],
  },
  {
    path: generateRegex(['admin', 'revshare', 'network']),
    module: 'Rev Share Management Policy',
    actions: ['is_creatable', 'is_viewable'],
  },
  {
    path: generateRegex(['admin', 'revshare', 'network', 'wild_val']),
    module: 'Rev Share Management Policy',
    actions: ['is_creatable', 'is_viewable'],
  },
]
