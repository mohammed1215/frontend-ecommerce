import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthProvider"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { useTitle } from "../customHooks"

const AccountDetails = ({ children, setAvatar, preview }) => {
  useTitle('Profile')
  const { user, logout } = useAuth()




  return (
    <div className='flex h-screen'>
      <aside className='flex-1 bg-[#0194F1] flex flex-col rounded-r-2xl'>
        <div >
          <label className="rounded-full block cursor-pointer relative size-32 mx-auto mt-10 bg-white">
            <img src={preview} alt="" className="rounded-full  object-cover size-full" />
            <span className="cursor-pointer absolute right-2 bottom-2 rounded-full size-6 flex justify-center items-center bg-white">
              <i className="fa-solid fa-plus"></i>
            </span>
            <input type="file" onChange={(e) => setAvatar(e.target.files[0])} hidden name="image" />
          </label>
          <cite className="text-center text-xl mt-2 block text-white">Welcome, <span className="font-bold">{user?.fullname}</span></cite>
        </div>
        <div className="flex flex-col px-10 text-white">
          <Link className="py-2 hover:bg-[#028ade] pl-2 rounded-xl transition" to={'/account/profile'}>Profile</Link>
          {user.role === "MERCHANT" &&
            <>
              <Link className="py-2 hover:bg-[#028ade] pl-2 rounded-xl transition" to={'/account/dashboard'}>Dashboard</Link>
              <Link className="py-2 hover:bg-[#028ade] pl-2 rounded-xl transition" to={'/account/products'}>Products</Link>
            </>
          }
          <Link className="py-2 hover:bg-[#028ade] pl-2 rounded-xl transition" to={'/account/orders'}>My Orders</Link>
        </div>
        <div className="px-10 mt-auto">
          <button onClick={() => logout()} className="text-start w-full hover:bg-[#028ade] p-2 mb-2 cursor-pointer rounded-xl transition block pl-2  text-white">
            <i className="fas fa-sign-out-alt mr-5"></i>
            Log Out
          </button>
        </div>
      </aside>
      {children}
    </div>
  )
}

export default AccountDetails