"use client"

import Description from '@/app/pcomponents/Description'
import Nabbar from '@/app/pcomponents/Nabbar'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {
  const prodId = useParams()
  const id = prodId.id as string
  return (

    <>
    <Nabbar/>
      <Description productId={id} />
    </>
  )
}

export default page
