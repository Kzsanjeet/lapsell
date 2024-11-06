import React from 'react'
import AdminNav from '../pcomponents/AdminNav'
import AdminSidebar from '../pcomponents/AdminSidebar'

const page = () => {
  return (
    <div className='w-full h-full flex'>
        <AdminSidebar/>
        <AdminNav/>
    </div>
  )
}

export default page
