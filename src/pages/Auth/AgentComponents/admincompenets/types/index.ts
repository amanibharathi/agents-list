import { IImportedNextImage } from '@/app/components/elements/AppImage'
import { ReactNode } from 'react'

export interface ImageWithContentDataType {
  id: string
  title: string
  description: string
  image: string | IImportedNextImage
  Component?: ReactNode
}

export interface ResourceLinkType {
  id: string
  title: string
  link: string
  list: {
    label: string
    link: string
  }[]
}

export interface addressType {
  city: string
  state: string
  zip: string
  street: string
}

export interface PreviewCardDataType {
  xf_media: string
  xf_bathroomstotalinteger: number
  xf_bedroomstotal: number
  status: string
  lotSize: any
  badge?: {
    label: string
    color: string
  }
  listPrice: number
  beds: number
  baths: { total: number }
  size: number
  address: addressType
  images: string[]
  id: string
  image: string
  noLink?: boolean
}

export interface AccordionDataType {
  id: string
  summary: string | ReactNode
  content: string | ReactNode
}

export interface IPropertySmallCard {
  propertyImage: string | IImportedNextImage
  isActive: boolean
  address: string
  dimension: string
  date: string
  time: string
  pingData: string
}

export interface CoordinatesType {
  latitude: string
  longitude: string
}

export interface BuyPropertyFilterParamsType {
  listPrice?: string
}
