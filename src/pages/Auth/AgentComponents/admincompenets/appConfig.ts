export const getHostAPIUrl = () => {
  if (process.env.NEXT_PUBLIC_NODE_ENV === 'production')
    return 'https://api-production.realtyofamerica.com'
  else if (process.env.NEXT_PUBLIC_NODE_ENV === 'staging')
    return 'https://roc-staging-api.cyces.co'

  return 'https://roc-staging-api.cyces.co'
  // return 'http://192.168.1.63:8000'
  // return 'http://192.168.1.46:8000'
}

export const checkIsDevelopment = () => {
  return process.env.NEXT_PUBLIC_IS_DEVELOPMENT
}

export const isProduction = process.env.NEXT_PUBLIC_NODE_ENV === 'production'

export const getHSignId = () => {
  return process.env.NEXT_PUBLIC_HELLO_SIGN_CLIENT_KEY
}
export const getStripKey = () => {
  return process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
}

export const getCannyBoard = () => {
  return process.env.NEXT_PUBLIC_CANNY_BOARD_ID
}

export const getCannyApp = () => {
  return process.env.NEXT_PUBLIC_CANNY_APP_ID
}

export const getGoogleMapApiKey = () => {
  return checkIsDevelopment() ? '' : process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY
}

export const CHICAGO_POLYGON_ID = '643446d3873e7c0361f2d5348bf66a51'
export const DEFAULT_LOCATION_META = {
  city: 'Chicago',
  state: 'IL',
  polygonId: CHICAGO_POLYGON_ID,
}

export const getRocOfficeId = () => process.env.NEXT_PUBLIC_ROC_OFFICE_ID

export const DEFAULT_DOMAIN = 'realtyofamerica.com'
