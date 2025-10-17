import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Action from './dashboard/Action'

const MainLayout = () => {
  return (<>
    <Header />
    <Outlet />
    <div className='px-5 md:px-0 py-5 bg-gradient-to-b bg-[linear-gradient(to_bottom,_transparent_0%_50%,_#ebe6e7_50%_100%)]'>
      <Action />
    </div>
  </>
  )
}

export default MainLayout