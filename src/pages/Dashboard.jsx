import React from 'react'
import Hero from '../components/dashboard/Hero'
import Section from '../components/dashboard/Section'
import DressStyle from '../components/DressStyle'
import Action from '../components/dashboard/Action'

const Dashboard = () => {


  return (
    <>
      <div className='bg-gray-200'>
        <Hero />
        <div className='bg-black h-20'></div>
      </div>
      <Section title={'New Arrival'} />
      <div className='container px-5 mx-auto'>
        <hr className='border-gray-300 ' />
      </div>
      <Section title={'top selling'} />
      <div className='px-5 md:px-0 py-5'>
        <DressStyle />
      </div>

    </>
  )
}

export default Dashboard