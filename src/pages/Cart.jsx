import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../context/CartProvider'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useTitle } from '../customHooks'
const Cart = () => {
  useTitle('Cart')
  const { cart, setCart } = useContext(CartContext)
  const [subtotal, setSubtotal] = useState(0)
  const [loading, setLoading] = useState(false)
  function deleteProduct(product) {
    const products = cart.filter(p => p._id !== product._id)
    setCart(products)
    toast('product deleted from cart successfully', {
      style: {
        color: 'green'
      }
    })
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

    try {
      if (cart.length === 0) {
        return toast("Cart must not be empty", {
          style: {
            color: "red"
          }
        })
      }
      setLoading(true);
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
    <div className='container px-5 mx-auto'>
      <h2 className='second-font text-3xl'>Your Cart</h2>

      {/* Cart Products */}
      <div className='flex gap-5 flex-col md:flex-row'>
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
              <img src={item?.imgPaths?.[0]} className='size-[150px] rounded-lg bg-gray-200' alt="" />
              {/* details */}
              <div className='flex-1 flex flex-col'>

                <h3 className='font-bold text-2xl'>{item?.title}</h3>
                <span className='block'>Size: {item?.selectedSize?.size}</span>
                <span className='block'>Color: {item?.selectedColor?.name}</span>
                <div className='flex justify-between md:items-center mt-4 flex-col sm:flex-row'>
                  <span className='font-bold text-2xl'>${item?.price}</span>
                  <div className='relative  rounded-full py-2 border-gray-600 border-2 max-w-52'>
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
        <div className={`flex-1 md:self-start rounded-xl flex flex-col gap-2 border-2 p-5`}>
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
            className='cursor-pointer flex justify-center gap-2 disabled:bg-gray-600 rounded-full py-3 bg-black text-white w-full'
          >
            Go to Checkout
            <span key={loading ? "spinner" : "arrow"}>

              {
                loading
                  ?
                  <div role="status">
                    <svg aria-hidden="true" className="w-5 text-gray-200 animate-spin dark:text-gray-600 fill-purple-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                      <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                  :
                  <i className={`fa fa-arrow-right `} aria-hidden="true"></i>

              }
            </span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cart