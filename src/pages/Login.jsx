import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import toast from 'react-hot-toast'

const Login = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const { user, login } = useAuth()
  const navigate = useNavigate()
  async function handleLogin(e) {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password
      }, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      login(data.user)
      if (data?.user.role === "MERCHANT") {
        return navigate('/dashboard')
      } else {
        navigate('/')
      }
    } catch (error) {
      const errors = error.response.data.errors

      setErrors(errors)
    }
  }

  return (
    <div className='h-screen content-center'>
      <form onSubmit={handleLogin} className='max-w-[500px] flex flex-col mx-auto gap-3 bg-fuchsia-300 rounded-lg p-5'>
        <h1 className='text-3xl font-bold'>Login</h1>
        <div className='flex flex-col gap-2'>
          <label htmlFor="" className='font-semibold text-lg'>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' placeholder='Enter Your Email' />
          <p className='text-red-500'>{errors.email}</p>
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="" className='font-semibold text-lg'>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='p-4 border-2 border-slate-500 focus:ring-4 transition duration-300 ring-slate-700 rounded-xl ' placeholder='Enter Your Password' />
          <p className='text-red-500'>{errors?.password}</p>
        </div>
        <p>Don't have an account? <Link to={'/signup'} className='text-blue-500 underline'>SignUp</Link></p>
        <button className='bg-black rounded-lg text-white cursor-pointer py-2'>Login</button>
      </form>
    </div>
  )
}

export default Login