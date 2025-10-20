import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartProvider'
import axios from 'axios'
const Cart = () => {
  const { cart, setCart } = useContext(CartContext)
  const [subtotal, setSubtotal] = useState(0)
  const [loading, setLoading] = useState(false)
  function deleteProduct(product) {
    const products = cart.filter(p => p._id !== product._id)
    setCart(products)
  }

  function handleQuantity(e, product) {
    const quan = Number(e.target.value);

    const updatedCart = cart.map(item => item._id === product._id ? { ...product, quantity: quan } : item)
    setCart(updatedCart)
  }

  function handleUpDown(upDownMode, product) {
    if (upDownMode === "up") {
      const updatedCart = cart.map(item => item._id === product._id ? { ...item, quantity: (item.quantity + 1) || 1 } : item)
      setCart(updatedCart)
    } else {
      const updatedCart = cart.map(item => item._id === product._id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item)
      setCart(updatedCart)
    }
  }

  useEffect(() => {
    setSubtotal(cart.reduce((sum, item) => sum += (parseFloat(item.price) * parseInt(item.quantity)), 0))
  }, [cart])

  async function handleCheckout() {
    setLoading(true);
    try {

      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/orders/create-order`, {
        total: parseInt(subtotal) + 15,
        cart
      }, {
        withCredentials: true
      })

      window.location.href = data?.approveLink?.href
    } catch (error) {
      console.log(error)
    }
    setLoading(false)

  }

  return (
    <div className='container mx-auto'>
      <h2 className='second-font text-3xl'>Your Cart</h2>

      {/* Cart Products */}
      <div className='flex gap-5'>
        {/* Products */}
        <div className={`flex-2 p-7 rounded-xl border-2`}>
          {cart.length === 0 &&
            (
              <div className='text-2xl text-center font-bold'>No Products</div>
            )
          }
          {cart.map(item => (
            <div key={item._id} className='not-last:border-b not-first:mt-5 flex gap-5 not-last:pb-5 relative  border-gray-300'>

              <div onClick={() => deleteProduct(item)} className='absolute -right-1.5 -top-1.5 bg-red-300 rounded-full hover:-translate-y-2 transition   text-red-700 cursor-pointer size-10 content-center text-center '>
                <i className="fas fa-trash"></i>
              </div>
              {/* image */}
              <img src={item?.imgPath} className='size-[150px] rounded-lg bg-gray-200' alt="" />
              {/* details */}
              <div className='flex-1 flex flex-col'>

                <h3 className='font-bold text-2xl'>{item?.title}</h3>
                <span className='block'>Size: {item?.selectedSize?.size}</span>
                <span className='block'>Color: {item?.selectedColor?.name}</span>
                <div className='flex justify-between items-center mt-4'>
                  <span className='font-bold text-2xl'>${item?.price}</span>
                  <div className='relative  rounded-full py-2 border-gray-600 border-2 w-52'>
                    <input min={1} onChange={(e) => handleQuantity(e, item)} type="number" name='quantity' id='quantity' value={item?.quantity || 1} className='h-full w-full outline-0 text-center appearance-none [-moz-appearance:_textfield] [-webkit-appearance:none] ' />
                    <span onClick={() => handleUpDown('up', item)} className='absolute select-none cursor-pointer right-5 top-[50%] -translate-y-1/2 active:bg-slate-400 rounded-full size-8 content-center text-center transition hover:bg-slate-300 duration-100'><i className='fas fa-plus'></i></span>
                    <span onClick={() => handleUpDown('down', item)} className='absolute select-none cursor-pointer left-5 top-[50%] -translate-y-1/2 active:bg-slate-400 rounded-full size-8 content-center text-center transition hover:bg-slate-300 duration-100'><i className='fas fa-minus'></i></span>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
        {/* Summary */}
        <div className={`flex-1 self-start rounded-xl flex flex-col gap-2 border-2 p-5`}>
          {/* title */}
          <h2 className='font-bold text-xl'>Order Summery</h2>
          {/* totals */}
          <div className='flex flex-col border-b border-gray-200 pb-2'>
            <div className='flex justify-between'>
              <span className='font-semibold text-lg'>Subtotal</span>
              <span>${subtotal}</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold text-lg'>Discount</span>
              <span>0</span>
            </div>
            <div className='flex justify-between'>
              <span className='font-semibold text-lg'>Delivery Fee</span>
              <span>$15</span>
            </div>
          </div>
          <div className='flex justify-between'>
            <span className='font-semibold text-lg'>Total</span>
            <span>${subtotal + 15}</span>
          </div>
          <button
            disabled={loading}
            onClick={handleCheckout}
            className='cursor-pointer disabled:bg-gray-600 rounded-full py-3 bg-black text-white w-full'
          >
            Go to Checkout
            <i class="fa fa-arrow-right" aria-hidden="true"></i>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart