
// import AppText from './elements/AppText'

import AppText from "../../../../../AppComponents/AppText-agent";

export default function AppNoData({ text = 'NO DATA AVAILABLE' }) {
  return (
    <div className="w-full h-full grid place-content-center">
      <AppText>{text}</AppText>
    </div>
  )
}
