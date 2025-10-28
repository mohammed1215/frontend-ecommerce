import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthProvider'
import { useState } from 'react'
import toast from 'react-hot-toast'
const Header = () => {

  const { user, logout } = useAuth()
  const [search, setSearch] = useState()
  const [openSearch, setOpenSearch] = useState(false)
  const [openSideBar, setOpenSideBar] = useState(false)
  const navigate = useNavigate()
  function handleSearchSumbit(e) {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/search?title=${search}`)
    } else {
      toast('search input must not be empty')
    }
  }
  return (
    <header className=' relative py-5'>
      <div className="container flex items-center justify-between px-5 mx-auto gap-3">
        {/* logo */}
        <h2 className="logo font-bold text-2xl">
          SHOP.CO
        </h2>


        {/* navbar */}
        <nav className={`absolute left-0 h-[calc(100vh_-_82.91px)] md:h-auto z-30 top-full transition duration-300 ${openSideBar ? "-translate-x-0" : "-translate-x-full"} md:translate-0 md:bg-transparent md:text-black w-full md:w-auto bg-black text-white md:static`}>
          <ul className={`flex flex-col md:flex-row items-center gap-3 text-sm`}>
            <li className='cursor-pointer  w-full'>
              <Link onClick={() => setOpenSideBar(false)} className='w-full text-center block  hover:text-black hover:bg-white p-2 md:p-0 ' to={'/'}>Shop</Link>
              <div onClick={() => setOpenSideBar(false)} className={`hover:bg-white cursor-pointer p-2 md:p-0 md:hidden absolute top-0 right-0 text-red-500`}>
                <i className='fa-solid fa-x '></i>
              </div>
            </li>
            <li className='cursor-pointer  w-full'><Link onClick={() => setOpenSideBar(false)} className='w-full text-center block hover:text-black hover:bg-white p-2 md:p-0 ' to={'/products'}>On Sale</Link></li>
            <li className='cursor-pointer  w-full'><Link onClick={() => setOpenSideBar(false)} className='w-full text-center block hover:text-black hover:bg-white p-2 md:p-0 ' to={'/'}>New Arrivals</Link></li>
            {user?.role === 'MERCHANT' && <li className='cursor-pointer  w-full'><Link onClick={() => setOpenSideBar(false)} className='w-full text-center block hover:text-black hover:bg-white p-2 md:p-0 ' to={'/dashboard'}>Admin</Link></li>}
            <li className='cursor-pointer  w-full'><Link onClick={() => setOpenSideBar(false)} className='w-full text-center block hover:text-black hover:bg-white p-2 md:p-0 ' to={'/'}>Brands</Link></li>
          </ul>
        </nav>
        {/* search */}
        <form onSubmit={handleSearchSumbit} className={`${openSearch ? "translate-y-0" : "-translate-y-[128px]"} rounded-full px-3 focus:ring-1 top-full absolute md:static md:translate-x-0 md:translate-y-0 left-1/2 transition bg-black -translate-x-1/2 flex-1 py-2 text-white md:text-gray-500 md:bg-gray-200 flex items-center`}>
          <i className='fas fa-search'></i>
          <input onChange={(e) => setSearch(e.target.value)} type="text" className='outline-none flex-1' placeholder='Search for products...'
          />
        </form>
        {/* icons */}
        <div className='flex gap-2 items-center'>
          <div className='md:hidden' onClick={() => {
            setOpenSearch(!openSearch)
            setOpenSideBar(false)
          }}><i className='fa-solid fa-search cursor-pointer'></i></div>
          {/* bars */}
          <div className={`md:hidden cursor-pointer`} onClick={() => {
            setOpenSideBar(!openSideBar)
            setSearch(false)
          }}>
            <i className='fa-solid fa-bars'></i>
          </div>
          {
            user ? <>
              <div onClick={() => navigate('/cart')} className='cursor-pointer'>
                <i className="fa-solid fa-cart-shopping "></i>
              </div>
              <div onClick={() => navigate('/account/profile')}>
                {user?.imgPath ? <img src={user?.imgPath} className='size-14 cursor-pointer rounded-full bg-[#919191]' alt="" /> : <i className="fa-regular fa-user cursor-pointer"></i>}
              </div>

              <button onClick={logout} className="cursor-pointer select-none px-3 py-2 border-2 rounded-lg before:scale-0 relative overflow-hidden before:absolute hover:before:inset-full  hover:before:scale-100 before:content-[''] before:origin-center before:inset-0 before:bg-blue-200 z-10 transition duration-300">
                <span className='relative z-20'>Logout</span>
              </button>
            </> :
              <Link to={'/login'}
                className=" cursor-pointer px-3 py-2 border-2 select-none rounded-lg before:scale-0 relative overflow-hidden before:absolute hover:before:inset-full  hover:before:scale-100 before:content-[''] before:origin-center before:inset-0 before:bg-blue-200 z-10 transition duration-300">
                <span className='relative z-20'>Login</span>
              </Link>
          }
        </div>
      </div>
    </header >
  )
}

export default Header