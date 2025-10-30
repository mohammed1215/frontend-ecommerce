import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'
import { useTitle } from '../customHooks'
import toast from 'react-hot-toast'


const Signup = () => {
  useTitle('Sign Up')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [errors, setErrors] = useState({})
  const [role, setRole] = useState('USER')
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth()
  const navigate = useNavigate()
  /**
   * 
   * @param {FormDataEvent} e 
   */
  async function handleSignup(e) {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullname', fullname)
    formData.append('email', email)
    formData.append('password', password)
    formData.append('image', selectedImage)
    formData.append('role', role)

    console.log(import.meta.env.VITE_API_URL)
    try {
      setLoading(true)
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData, {
        withCredentials: true
      });
      toast('Verify Your Email', {
        style: {
          color: "gray"
        }
      })
      setLoading(false)
      navigate('/')
    } catch (error) {
      const errors = error.response.data.errors
      if (error instanceof axios.AxiosError) {
        if (error.status === 409) {
          setErrors(error.response.data)
          setLoading(false)
          return
        }
      }
      setLoading(false)
      setErrors(errors)
    }
  }

  return (
    <div className='h-screen content-center' >
      <form encType='multipart/form-data' onSubmit={handleSignup} className='max-w-[500px] flex flex-col mx-auto gap-3 bg-fuchsia-300 rounded-lg p-5'>
        <h1 className='text-3xl font-bold'>Sign Up</h1>
        <div className='flex flex-col gap-2'>
          <label htmlFor="" className='font-semibold text-lg'>Fullname</label>
          <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' placeholder='Enter Your Fullname' />
          <p className='text-red-500'>{errors?.fullname?.msg}</p>

        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="" className='font-semibold text-lg'>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' placeholder='Enter Your Email' />
          <p className='text-red-500'>{errors?.email?.msg}</p>

        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="" className='font-semibold text-lg'>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' placeholder='Enter Your Password' />
          <p className='text-red-500'>{errors?.password?.msg}</p>

        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="" className='font-semibold text-lg'>role</label>
          <select value={role} onChange={(e) => setRole(e.target.value)} className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' >
            <option value="USER">User</option>
            <option value="MERCHANT">Merchant</option>
          </select>
          <p className='text-red-500'>{errors?.role?.msg}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="" className='font-semibold text-lg'>Avatar</label>
          <input accept='image/*' onChange={(e) => setSelectedImage(e.target.files[0])} name='image' type="file" className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' placeholder='welcome' />
          <p className='text-red-500'>{errors?.image?.msg}</p>
        </div>
        <p>Already have an account? <Link to={'/login'} className='text-blue-500 underline'>Login</Link></p>
        <button disabled={loading} className='disabled:bg-gray-500 disabled:flex disabled:justify-center disabled:gap-5 transition bg-black rounded-lg text-white cursor-pointer py-2' >Sign Up
          {loading && <div role="status">
            <svg aria-hidden="true" className="w-5 text-gray-200 animate-spin dark:text-gray-600 fill-purple-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
          }
        </button>
      </form>
    </div>
  )
}

export default Signup