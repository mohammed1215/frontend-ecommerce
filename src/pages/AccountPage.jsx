import React, { useRef, useState } from 'react'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'
import toast from 'react-hot-toast'

const sizes = [{
  size: "S"
}, {
  size: "M"
}, {
  size: "L"
}, {
  size: "XL"
}]
const colors = [
  {
    hex: "#ff0000",
    color: "red"
  },
  {
    hex: "#0000ff",
    color: "blue"
  },
  {
    hex: "#ff00ff",
    color: "purple"
  },
  {
    hex: "#000",
    color: "black"
  },
  {
    hex: "#fff",
    color: "white"
  },
  {
    hex: "#ffff00",
    color: "yellow"
  },
  {
    hex: "",
  }
]
/**
  //title,
  //description,
  //price,
  //category,
  //colors,
  //stock,
  imgPath: result.secure_url,
 // sizes,
  userId: req.user._id
 */
const AccountPage = () => {
  const [openPanel, setOpenPanel] = useState(false)
  const [activeDiscount, setActiveDiscount] = useState(1)
  const [title, setTitle] = useState('')
  const [stock, setStock] = useState(0)
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState(0)
  const [selectedSizes, setSelectedSizes] = useState([])
  const [selectedColors, setSelectedColors] = useState([])
  const [images, setImages] = useState(null)
  const [category, setCategory] = useState('')
  const [preview, setPreview] = useState([])
  const { user, logout } = useAuth()
  const formRef = useRef()

  const handleAddingSize = (size) => {
    const sizes = [...selectedSizes]

    const index = sizes.findIndex(s => s?.size === size.size)
    if (index !== -1) {
      sizes.splice(index, 1)
      setSelectedSizes(sizes)
    } else {
      setSelectedSizes(prev => [...prev, size])
    }
  }

  const handleAddingColor = (color) => {
    const colors = [...selectedColors]
    const index = colors.findIndex(c => c.color === color.color)
    if (index !== -1) {
      colors.splice(index, 1)
      setSelectedColors(colors)
    } else {
      setSelectedColors(prev => [...prev, color])
    }
  }
  const handleFile = (e) => {
    const files = e.target.files;
    console.log(files)
    let previewURLs = []
    if (e.target?.files?.length > 0) {
      for (const file of files) {
        previewURLs.push(URL.createObjectURL(file));
      }

      setImages(e.target.files)
      console.log(previewURLs)
      setPreview(previewURLs)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    let formData = new FormData(formRef.current);
    formData.append('sizes', JSON.stringify(selectedSizes))
    formData.append('colors', JSON.stringify(selectedColors))
    formData.append('stock', stock)
    formData.append('images', images)
    const { status } = await axios.post(`${import.meta.env.VITE_API_URL}/products`,
      formData
      , {
        withCredentials: true
      })
    if (status === 201) {
      toast('product updated successfully', {
        style: {
          color: "green"
        }
      })
    }
  }
  return (
    <div className='flex min-h-screen'>
      <aside className={`  ${openPanel ? "translate-x-0" : "-translate-x-full"} w-full flex-1 flex  md:h-auto fixed h-full md:static md:-translate-x-0 left-0 top-0 transition md:flex p-3 bg-[#1A1C1E] flex-col text-[#969696] rounded-l-md`}>
        <div className='flex items-center mb-4  text-white justify-between'>
          <h2 className=' '>Logo  </h2>
          <button className='cursor-pointer md:hidden' onClick={() => setOpenPanel(false)}>
            <i className='fa-solid fa-x'></i>
          </button>
        </div>

        <ul className='flex flex-col'>
          <li className='p-2 text-sm cursor-pointer rounded-md transition hover:bg-[#2d3032]'> <i className="fa fa-tachometer"></i> Dashboard</li>
          <li className='p-2 text-sm cursor-pointer rounded-md transition hover:bg-[#2d3032]'> <i className="fa fa-cog" aria-hidden="true"></i> Settings</li>
          <li className='p-2 text-sm cursor-pointer rounded-md transition hover:bg-[#2d3032]'> <i className="fa-solid fa-circle-exclamation"></i> Help & Center</li>
        </ul>

        <div className='flex gap-2 mt-auto items-center  justify-self-end'>
          <div className='size-10 shrink-0  rounded-full overflow-hidden'>
            <img src={user?.imgPath} className='w-full h-full object-cover' alt="" />
          </div>
          <div className='text-sm'>
            <h4 className='font-semibold'>{user?.fullname}</h4>
            <p>{user?.email}</p>
          </div>
          <div className='cursor-pointer' onClick={() => logout()}>
            <i className="fas fa-sign-out-alt"></i>
          </div>
        </div>
      </aside>
      <div className='md:hidden p-4 cursor-pointer bg-gray-100 dark:text-gray-50 dark:bg-[#1d2024]' onClick={() => setOpenPanel(true)}>
        <i className='fa-solid fa-bars '></i>
      </div>

      <section className='flex-3 bg-gray-100 p-3 dark:text-white dark:bg-[#1A1C1E] text-[#1A1C1E] rounded-r-md'>
        <div className='justify-between p-3 items-center flex'>
          <h2 className='font-bold text-xl'>Create New Product</h2>
          <div className="icons flex gap-4">
            <button type="button" className="cursor-pointer flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-xs px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"> <i className='fa-solid fa-plus'></i> Create Product</button>
            <button type='button' className='cursor-pointer'><i className='fa-solid fa-search'></i></button>
            <button type='button' className='cursor-pointer'><i className='fa-solid fa-bell'></i></button>
          </div>
        </div>

        <section className='flex gap-4 flex-col lg:flex-row'>
          <section className='flex-1 dark:bg-[#242d36] bg-white p-5  rounded-lg'>
            <h3 className='font-bold text-lg'>General Information</h3>

            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="product-name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Product Name</label>
                  <input name='title' value={title} onChange={(e) => setTitle(e.target.value)} type="text" id="product-name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Jeans" required />
                </div>

                <div className="">
                  <label for="categories" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select an option</label>
                  <select name='category' id="categories" value={category} onChange={(e) => setCategory(e.target.value)} className="bg-gray-50 border   border-gray-300 !text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:!text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option selected>Choose a Category</option>
                    <option value="Jeans">Jeans</option>
                    <option value="Hoodies">Hoodies</option>
                    <option value="T-Shirts">T-Shirts</option>
                    <option value="Shirts">Shirts</option>
                  </select>
                </div>

              </div>
              <div className='mb-6'>
                <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                <textarea name='description' value={description} onChange={(e) => setDescription(e.target.value)} type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description Of Product" required />
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">

                <div >
                  <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                  <div className='bg-gray-50 border border-gray-300  text-gray-900 text-sm rounded-lg flex items-center focus:ring-blue-500 focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <i className='fa-solid fa-dollar text-gray-400'></i>
                    <input name='price' value={price} onChange={(e) => setPrice(e.target.value)} type="number" id="price" className="flex-1   outline-none  " placeholder="15" required />
                  </div>
                </div>
                <div >
                  <label htmlFor="discount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Discount</label>
                  <div className='bg-white border items-stretch border-gray-300  text-gray-900  text-sm rounded-lg flex  focus:ring-blue-500 focus:border-blue-500  w-full  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'>
                    <input type="number" name='discount' id="discount" className=" p-2.5 flex-1 outline-none " placeholder="15" required />
                    <div className='flex items-center gap-2 rounded-r-lg  bg-gray-100  px-2 py-1'>
                      <span onClick={() => setActiveDiscount(1)} type="button" className={`${activeDiscount === 1 ? '!bg-blue-500' : 'bg-white'}  text-gray-900  border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm cursor-pointer  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>
                        <i className='fa-solid fa-dollar text-gray-400'></i>
                      </span>
                      <span onClick={() => setActiveDiscount(2)} type="button" className={`${activeDiscount === 2 ? '!bg-blue-500' : 'bg-white'}  text-gray-900  border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm cursor-pointer  dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700`}>
                        <i className='fa-solid fa-percentage text-gray-400'></i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className='mb-6'>
                <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Size</label>
                <div type="text" id="sizes" className="flex justify-between  text-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full  dark:bg-gray-700 gap-2 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                  {sizes.map(size => (
                    <span key={size.size} onClick={() => handleAddingSize(size)} className={`${selectedSizes.includes(size) ? "border-2 border-blue-500 " : "border border-gray-300 dark:border-gray-600"} cursor-pointer bg-gray-50   text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-800  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}>{size.size}</span>
                  ))}
                </div>
              </div>
              <div className='mb-6'>
                <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Color</label>
                <div type="text" id="sizes" className="flex   text-center text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-fit  dark:bg-gray-700 gap-2 dark:border-gray-600 dark:placeholder-gray-400 flex-wrap dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" >
                  {colors.map(color => (
                    <span key={color.hex} style={{
                      backgroundColor: color.hex
                    }} onClick={() => handleAddingColor(color)} className={`${selectedColors.includes(color) ? "border-3 border-blue-500 dark:border-amber-400 " : "border border-gray-300 dark:border-gray-600"} cursor-pointer  size-8  text-gray-900 text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block p-2.5   dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}></span>
                  ))}
                </div>
              </div>

              <button type="submit" className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Public Product
              </button>
            </form>

          </section>
          <section className='lg:w-1/3 bg-white p-5 dark:bg-[#242d36] rounded-lg'>
            <span className='mb-4 block font-semibold'>Upload Images</span>
            <div className="flex mb-4 items-center justify-center w-full">
              <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 ">

                {
                  preview.length > 0 ?
                    <div className='grid grid-cols-3 gap-2'>
                      {
                        preview.map(image =>
                        (
                          <div className=''>
                            <img src={image} alt="" className='w-full object-cover' />
                          </div>
                        )
                        )
                      }
                    </div>
                    : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                      </div>
                    )
                }
                <input accept='image/*' multiple size={1024} onChange={handleFile} id="dropzone-file" type="file" className="hidden" />
              </label>
            </div>
            <div>
              <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
              <input type="number" value={stock} onChange={(e) => setStock(e.target.value)} min={0} id="stock" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="5" required />
            </div>
          </section>
        </section>
      </section>
    </div>
  )
}

export default AccountPage