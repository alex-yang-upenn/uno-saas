'use client'

import * as LR from '@uploadcare/blocks'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef } from 'react'

type Props = {
    onUpload: (e:string) => any
}

LR.registerBlocks(LR)

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter()
  const ctxProviderRef = useRef<typeof LR.UploadCtxProvider.prototype & LR.UploadCtxProvider>(null)

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl)
      if (file) {
        router.refresh()
      }
    }
    ctxProviderRef.current!.addEventListener("file-upload-success", handleUpload)
  }, [])

  return (
    <div>
      <lr-config ctx-name="my-uploader" pubkey="54e5a7380ce6e5730118"/>
      <lr-file-uploader-regular ctx-name="my-uploader" css-src={`${process.env.NEXT_PUBLIC_UPLOAD_CARE_CSS_SRC}0.39.0${process.env.NEXT_PUBLIC_UPLOAD_CARE_SRC_PACKAGE}`}/>
      <lr-upload-ctx-provider ctx-name="my-uploader" ref={ctxProviderRef}/>
    </div>
  )
}

export default UploadCareButton