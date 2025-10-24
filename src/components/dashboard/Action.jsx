
const Action = () => {
  return (
    <div className='container flex-col md:flex-row gap-10 mx-auto rounded-2xl bg-black p-8 flex justify-between items-center'>
      <h2 className='second-font text-center md:text-start text-lg md:text-3xl md:w-[500px] text-white'>STAY UPTO DATE ABOUT OUR LATEST OFFERS</h2>
      <form className='text-gray-500 flex flex-col gap-3 flex-1 w-full md:max-w-[350px]'>
        <div className='bg-white px-4 py-2 rounded-full flex gap-2 items-center'>
          <i className="fa fa-envelope"></i>
          <input type="email" className=' outline-none' placeholder='enter your email' />
        </div>
        <button type='submit' className='text-black bg-white rounded-full py-2 cursor-pointer border-3 border-transparent  hover:border-white hover:bg-gray-500 hover:text-white transition duration-500'>
          Subscribe to Newsletter
        </button>
      </form>
    </div>
  )
}

export default Action