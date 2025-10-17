
import { useContext } from 'react'
import Cards from './Cards'
import { ProductContext } from '../../context/ProductsProvider'

const Section = ({ title }) => {
  const { products } = useContext(ProductContext)

  return (
    <div className='py-10'>
      <div className='container px-5 mx-auto'>
        <h2 className='font-semibold text-center text-4xl second-font'>{title}</h2>
        <Cards data={products} />
        <button className='rounded-full mb-10 w-[100px] md:w-[200px] py-3 mx-auto block mt-10 hover:bg-black hover:text-white transition text-black cursor-pointer border border-gray-500'>View All</button>
      </div>
    </div>
  )
}

export default Section