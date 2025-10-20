import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import axios from 'axios'

const Signup = () => {

  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedImage, setSelectedImage] = useState(null)
  const [role, setRole] = useState()
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
    const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/signup`, formData, {
      withCredentials: true
    });
    login(data.user)
    navigate('/')
  }

  return (
    <div className='h-screen content-center' >
      <form encType='multipart/form-data' onSubmit={handleSignup} className='max-w-[500px] flex flex-col mx-auto gap-3 bg-fuchsia-300 rounded-lg p-5'>
        <h1 className='text-3xl font-bold'>Sign Up</h1>
        <div className='flex flex-col gap-2'>
          <label htmlFor="" className='font-semibold text-lg'>Fullname</label>
          <input value={fullname} onChange={(e) => setFullname(e.target.value)} type="text" className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' placeholder='Enter Your Fullname' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="" className='font-semibold text-lg'>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' placeholder='Enter Your Email' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="" className='font-semibold text-lg'>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' placeholder='Enter Your Password' />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="" className='font-semibold text-lg'>role</label>
          <select defaultValue={'USER'} value={role} onChange={(e) => setRole(e.target.value)} className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' >
            <option value="USER">User</option>
            <option value="MERCHANT">Merchant</option>
          </select>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="" className='font-semibold text-lg'>Avatar</label>
          <input accept='image/*' onChange={(e) => setSelectedImage(e.target.files[0])} name='image' type="file" className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' placeholder='welcome' />
        </div>
        <p>Already have an account? <Link to={'/signup'} className='text-blue-500 underline'>Login</Link></p>
        <button className='bg-black rounded-lg text-white cursor-pointer py-2'>Sign Up</button>
      </form>
    </div>
  )
}

export default Signup