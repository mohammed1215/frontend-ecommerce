import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../../context/CartProvider'
import { useAuth } from '../../context/AuthProvider'
import toast from 'react-hot-toast'
const Product = ({ product }) => {

  //Context
  const { cart, setCart } = useContext(CartContext)
  const { user } = useAuth()
  const [activeColor, setActiveColor] = useState(null)
  const [activeSize, setActiveSize] = useState(null)

  const [quantity, setQuantity] = useState(1)


  function handleActive(e, color) {
    setActiveColor(prev => prev !== color ? color : null)
  }

  function handleActiveSize(size) {
    setActiveSize(prev => prev !== size ? size : null)
  }

  function handleQuantity(e) {
    if (e.target.value > 0) {
      setQuantity(e.target.value)
    }
  }

  function handleUpDown(upDownMode) {
    upDownMode === "up" ? setQuantity(prev => prev + 1) : setQuantity(prev => prev !== 0 ? prev - 1 : 0)
  }

  function handleAddProduct() {
    if (!user) {
      toast('you have to log in', {
        style: {
          color: "red"
        }
      })
      return
    }

    if (!activeColor) {
      toast('you have to choose a COLOR', {
        style: {
          color: "red"
        }
      })
      return
    }

    if (!activeSize) {
      toast('you have to choose a SIZE', {
        style: {
          color: "red"
        }
      })
      return
    }
    let cartItems = [...cart]
    const productIndex = cartItems.findIndex(item => item._id === product._id);

    if (productIndex === -1) {

      const productItem = { ...product, quantity, selectedSize: activeSize, selectedColor: activeColor }

      cartItems.push(productItem)

    } else {
      const oldItem = cartItems[productIndex]
      const newItem = { ...oldItem, quantity, selectedSize: activeSize, selectedColor: activeColor }
      cartItems.splice(productIndex, 1, newItem)
    }
    setCart(prev => cartItems)
    toast('item has been added to cart', {
      style: {
        color: "green"
      }
    })

  }

  useEffect(() => {
    console.log(cart)
  }, [cart])

  return (
    <div className='flex container mx-auto gap-10 justify-center flex-col md:flex-row px-5'>
      <div className=' justify-center md:justify-normal grid md:grid-cols-[1fr_2fr] grid-cols-1 grid-rows-2 gap-5 md:w-[200px]  flex-1'>

        <div className='grid md:grid-rows-3 md:gap-5 md:grid-cols-1 gap-2 md:row-span-2 grid-cols-3 grid-row-1 md:min-h-100'>
          <div className='bg-gray-200 w-full rounded-xl'>
            <img src={product?.imgPath} alt="" />
          </div>
        </div>
        <div className='bg-[#F3F1F4] rounded-xl mx-auto row-span-3 -order-1 content-center md:order-1 min-h-100 w-80 md:w-[100%]'>
          <img src={product?.imgPath} className='h-[50%] mx-auto object-cover' alt={product?.title} />
        </div>
      </div>
      {/* The Details */}
      <div className='font-semibold flex flex-col gap-1 mt-4 md:max-w-[50%]'>
        <h2 className='text-lg second-font'>{product?.title}</h2>
        <span className='text-xl'>${product?.price}</span>
        <p className='text-sm font-light'>{product?.description}</p>
        <hr className={`border-gray-300 my-2`} />
        {/* Select Color */}
        <div className=''>
          <span>Select Colors</span>
          <div className='flex gap-3'>
            {product?.colors?.map(color => (
              <span style={{ backgroundColor: color?.hex }} key={color._id} onClick={(e) => handleActive(e, color)}
                className={`cursor-pointer rounded-full w-10 h-10 overflow-hidden block relative ${activeColor === color ? "border-2" : ""}`}>
                {
                  activeColor === color && (
                    <span className='absolute text-white w-full h-full select-none bg-[#00000073] flex items-center justify-center'>
                      <i className='fas fa-check '></i>
                    </span>
                  )
                }
              </span>
            ))}
          </div>
        </div>
        <hr className={`border-gray-300 my-2`} />
        {/* Select Size */}
        <div>
          <span>Choose Size</span>
          <div className='flex gap-2'>
            {product?.sizes?.map(size => (
              <span onClick={() => handleActiveSize(size)} key={size._id} className={`w-[80px] h-[40px] select-none rounded-full cursor-pointer text-center content-center transition duration-350 ${activeSize === size ? "bg-black text-white" : "bg-gray-200 text-black"}  py-2`}>{size.size}</span>
            ))}
          </div>
        </div>
        <hr className={`border-gray-300 my-2`} />
        {/* Add to Cart Button And Quantity*/}
        <div className='flex gap-2'>
          <div className='relative flex-1 rounded-full border-gray-600 border-2'>
            <input onChange={handleQuantity} type="number" name='quantity' id='quantity' value={quantity} className='h-full outline-0 text-center appearance-none [-moz-appearance:_textfield] [-webkit-appearance:none] ' />
            <span onClick={() => handleUpDown('up')} className='absolute select-none cursor-pointer right-5 top-[50%] -translate-y-1/2 active:bg-slate-400 rounded-full size-8 content-center text-center transition hover:bg-slate-300 duration-100'><i className='fas fa-plus'></i></span>
            <span onClick={() => handleUpDown('down')} className='absolute select-none cursor-pointer left-5 top-[50%] -translate-y-1/2 active:bg-slate-400 rounded-full size-8 content-center text-center transition hover:bg-slate-300 duration-100'><i className='fas fa-minus'></i></span>
          </div>

          <button onClick={handleAddProduct} className='flex-2 bg-black cursor-pointer text-white rounded-full py-3'>Add To Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Product