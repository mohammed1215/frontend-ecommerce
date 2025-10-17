import casualImg from '../images/image 11.png'
import PartyImg from '../images/image 12.png'
import formalImg from '../images/image 13.png'
import GymImg from '../images/image 14.png'

const DressStyle = () => {
  return (
    <div className='container mx-auto px-10 bg-gray-200 rounded-3xl py-12'>
      <h2 className="text-center">BROWSE BY DRESS STYLE</h2>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <div className='relative h-68 bg-white rounded-2xl w-full'>
          <img className='object-cover h-full ml-auto' src={casualImg} alt="" />
          <span className="absolute top-3 left-3 font-semibold text-lg">Casual</span>
        </div>
        <div className='relative h-68 bg-white rounded-2xl w-full md:col-span-2'>
          <img className='object-cover h-full ml-auto' src={formalImg} alt="" />
          <span className="absolute top-3 left-3 font-semibold text-lg">Formal</span>
        </div>
        <div className='relative h-68 bg-white rounded-2xl w-full md:col-span-2'>
          <img className='object-cover h-full ml-auto' src={PartyImg} alt="" />
          <span className="absolute top-3 left-3 font-semibold text-lg">Party</span>
        </div>
        <div className='relative h-68 bg-white rounded-2xl w-full'>
          <img className='object-cover h-full ml-auto' src={GymImg} alt="" />
          <span className="absolute top-3 left-3 font-semibold text-lg">Gym</span>
        </div>

      </div>

    </div>
  )
}

export default DressStyle