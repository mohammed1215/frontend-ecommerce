
import Hero from '../components/dashboard/Hero'
import Section from '../components/dashboard/Section'
import DressStyle from '../components/DressStyle'

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
      <div className='px-5 mx-auto container py-5'>
        <DressStyle />
      </div>

    </>
  )
}

export default Dashboard