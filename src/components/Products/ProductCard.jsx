import React from 'react'
import { useNavigate } from 'react-router-dom'
const ProductCard = ({ product }) => {
  const navigate = useNavigate()
  return (
    <div className='cursor-pointer' onClick={() => navigate(`/products/${product._id}`)}>
      <div className='bg-[#F3F1F4] rounded-lg h-80'>
        <img src={product?.imgPaths?.[0]} className='mx-auto rounded-xl object-cover h-full' alt={product?.title} />
      </div>
      <div className='py-2'>
        <h2>{product?.title}</h2>
        <span className='font-bold text-2xl'>${product?.price}</span>
      </div>
    </div>
  )
}

export default ProductCard