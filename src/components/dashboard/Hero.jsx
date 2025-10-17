import heroImg from '../../images/Rectangle 2.png'
const Hero = () => {
  return (
    <div className="container mx-auto  py-10 flex-col md:flex-row flex w-full min-h-[calc(100vh_-_80px)]">
      <div className="flex flex-col max-w-[700px] gap-6 mt-auto mb-auto md:gap-3">
        <h1 className="text-3xl md:text-6xl tracking-wide line font-bold second-font">FIND CLOTHES THAT MATCHES YOUR STYLE</h1>
        <p className="text-sm">Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style</p>
        <button className="bg-black w-full  hover:bg-gray-500 transition rounded-full text-white py-2 md:w-[200px] cursor-pointer">Shop Now</button>

        <div className="flex mt-10 justify-center md:justify-start flex-wrap md:flex-nowrap gap-y-5 md:gap-y-0">
          <div className="flex flex-col gap-3 px-5 md:px-5 border-r border-gray-400">
            <span className="font-bold text-3xl">200+</span>
            <span className="text-xs text-gray-500">
              International Brands
            </span>
          </div>
          <div className="flex flex-col gap-3 px-5 md:px-5 border-r border-gray-400">
            <span className="font-bold text-3xl">
              2,000+
            </span>
            <span className="text-xs text-gray-500">
              High-Quality Products
            </span>
          </div>
          <div className="flex flex-col gap-3 px-5 md:px-5 ">
            <span className="font-bold text-3xl">
              30,000+
            </span>
            <span className="text-xs text-gray-500">
              Happy Customers
            </span>
          </div>
        </div>

      </div>
      <div><img src={heroImg} className='h-full object-cover' alt="" /></div>
    </div>
  )
}

export default Hero