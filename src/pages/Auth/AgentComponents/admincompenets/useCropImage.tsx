import React, { useRef, useState } from 'react'
import {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'


import 'react-image-crop/dist/ReactCrop.css'
import { useDebounceEffectForImageCrop } from '../../../../utils/hooks/useDebounceEffectForImageCrop'
import { canvasPreview } from './CanvasPreview'

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  )
}

const useCropImage = ({
  onSave,
  dimension = 402 / 444,
}: {
  onSave: (file: Blob) => void
  dimension?: number
}) => {
  const defaultAspectRatio = dimension
  const [imgSrc, setImgSrc] = useState('')
  const previewCanvasRef = useRef<HTMLCanvasElement>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const hiddenAnchorRef = useRef<HTMLAnchorElement>(null)
  //   const blobUrlRef = useRef('')

  const [crop, setCrop] = useState<Crop>()
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>()
  const [scale, setScale] = useState(1)
  const [rotate, setRotate] = useState(0)
  const [aspect, setAspect] = useState<number | undefined>(defaultAspectRatio)

  function onSelectFile(file: any) {
    if (file) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || '')
      )
      reader.readAsDataURL(file)
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current
    if (!image || !previewCanvas || !completedCrop) {
      throw new Error('Crop canvas does not exist')
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context')
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height
    )
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/jpeg',
    })

    const file = new File([blob], `${Date().toString()}.jpg`, {
      type: 'image/jpeg',
    })

    onSave(file)

    // if (blobUrlRef.current) {
    //   URL.revokeObjectURL(blobUrlRef.current)
    // }
    // blobUrlRef.current = URL.createObjectURL(blob)

    // if (hiddenAnchorRef.current) {
    //   hiddenAnchorRef.current.href = blobUrlRef.current
    //   hiddenAnchorRef.current.click()
    // }
  }

  useDebounceEffectForImageCrop(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        )
      }
    },
    100,
    [completedCrop, scale, rotate]
  )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else {
      setAspect(defaultAspectRatio)

      if (imgRef.current) {
        const { width, height } = imgRef.current
        const newCrop = centerAspectCrop(width, height, 16 / 9)
        setCrop(newCrop)
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
      }
    }
  }

  const downloadAnchorTag = (
    <a
      href="#hidden"
      ref={hiddenAnchorRef}
      download
      style={{
        position: 'absolute',
        top: '-200vh',
        visibility: 'hidden',
      }}
    >
      Hidden download
    </a>
  )

  return {
    handleToggleAspectClick,
    onDownloadCropClick,
    onImageLoad,
    onSelectFile,
    imgSrc,
    imgRef,
    crop,
    setCrop,
    setCompletedCrop,
    aspect,
    setScale,
    setRotate,
    previewCanvasRef,
    completedCrop,
    downloadAnchorTag,
  }
}

export default useCropImage
