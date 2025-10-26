import { useEffect, useState } from "react"
import { Range } from 'react-range'
import PartFilter from "../components/Products/PartFilter"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck } from '@fortawesome/free-solid-svg-icons'
import axios from "axios"
import ProductCards from "../components/Products/ProductCards"
import ProductCard from "../components/Products/ProductCard"

const colors = [
  { name: 'green', hex: "#00C12B", border: "#00a524" },
  { name: 'red', hex: "#F50606", border: "#F50606" },
  { name: 'yellow', hex: "#F5DD06", border: "#cbb804" },
  { name: 'orange', hex: "#F57906", border: "#c46104" },
  { name: 'cyan', hex: "#06CAF5", border: "#059fc1" },
  { name: 'purple', hex: "#7D06F5", border: "#5b05b1" },
  { name: 'pink', hex: "#F506A4", border: "#a3086f" },
  { name: 'white', hex: "#FFFFFF", border: "#7e7d7d" },
  { name: 'black', hex: "#000000", border: "#878585" }
];

const sizes = ['S', 'M', 'L', 'XL']

const categories = ['T-Shirts', 'Shorts', 'Shirts', 'Hoodies', 'Jeans']

const Products = () => {

  const [priceOpen, setPriceOpen] = useState(false)
  const [values, setValues] = useState([20, 80])
  const MIN = 0;
  const MAX = 100;
  const [loading, setLoading] = useState(false)
  const [colorOpen, setColorOpen] = useState(false)
  const [activeColor, setActiveColor] = useState(null)

  const [sizeOpen, setSizeOpen] = useState(false);
  const [activeSize, setActiveSize] = useState(null)

  const [category, setCategory] = useState(null)

  const [data, setData] = useState([]);

  const [page, setPage] = useState(1)
  const limit = 10

  const [url, setUrl] = useState(`${import.meta.env.VITE_API_URL}/products?page=${page}&limit=${limit}`)

  async function getAllProducts() {
    setLoading(true)
    const { data } = await axios.get(url)
    setLoading(false)
    setData(data)
  }

  function buildQueryString(obj) {
    const entries = Object.entries(obj).filter(([, v]) => v != null && v !== '');
    return new URLSearchParams(entries).toString()
  }

  function handleFilters() {

    const params = buildQueryString({
      price_min: values[0],
      price_max: values[1],
      color: activeColor,
      size: activeSize,
      limit: limit,
      page: page,
      category
    })

    let updatedUrl = `${import.meta.env.VITE_API_URL}/products?${params}`;
    setUrl(updatedUrl)
  }

  useEffect(() => {
    getAllProducts()
  }, [page, limit, url])

  function handleActiveSize(size) {
    setActiveSize(prev => prev !== size ? size : null)
  }


  return (
    <div className="container mx-auto flex flex-col sm:flex-row gap-4 min-h-[calc(100vh_-_83.2px)] p-2">
      {/* filters */}
      <div className="rounded-lg p-3 flex-1 max-h-full border-gray-200 border-2 overflow-auto">
        <div className="flex justify-between border-b border-gray-200">
          <h3 className="font-semibold text-lg pb-2">Filter</h3>
          <span>
            <i className="fas fa-settings"></i>
          </span>
        </div>
        {/* filteres (jeans, t-shirt, ....) */}
        <div className="my-2 border-b border-gray-200 pb-3">
          <ul className="flex flex-col gap-2">
            {categories.map(cat => (
              <li key={cat} className={`text-gray-500 cursor-pointer ${cat === category ? 'font-bold' : ''}`} onClick={() => setCategory(prev => prev !== cat ? cat : null)}>{cat}</li>
            ))}
          </ul>
        </div>
        {/* Price */}
        <div className="border-b border-gray-200 pb-3">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold text-lg">Price</h2>
            <span onClick={() => setPriceOpen(!priceOpen)} className={`cursor-pointer transition-all duration-300 block w-fit ${priceOpen ? 'rotate-90' : ""}`}>
              <i className="fas fa-arrow-right"></i>
            </span>
          </div>
          <div className={`transition-all duration-300 ease-in-out overflow-hidden ${priceOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            <Range
              step={1}
              min={0}
              max={100}
              values={values}
              onChange={setValues}

              renderTrack={({ props, children }) => (
                <div
                  {...props}
                  style={{
                    background: `linear-gradient(
                to right,
                #d1d5db ${((values[0] - MIN) / (MAX - MIN)) * 100}%,
                black ${((values[0] - MIN) / (MAX - MIN)) * 100}%,
                black ${((values[1] - MIN) / (MAX - MIN)) * 100}%,
                #d1d5db ${((values[1] - MIN) / (MAX - MIN)) * 100}%
              )`,
                  }}
                  className="h-2 bg-gray-300 rounded-full cursor-pointer"
                >
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div
                  {...props}
                  className="w-4 h-4 bg-black rounded-full focus:outline-none"
                />
              )}
            />
            <div className="mt-3 text-center text-sm text-gray-700">
              {values[0]} - {values[1]}
            </div>
          </div>
        </div>
        {/* Colors */}
        <PartFilter open={colorOpen} setOpen={setColorOpen} title={'Color'}>
          <div className={`transition-all flex flex-wrap gap-2 duration-300 ease-in-out overflow-hidden ${colorOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            {colors.map(color => (
              <span
                key={color.hex}
                onClick={() => setActiveColor(prev => prev === color.name ? null : color.name)}
                className="text-center content-center size-8 cursor-pointer rounded-full border flex items-center justify-center"
                style={{
                  backgroundColor: color.hex,
                  borderColor: color.border,
                }}
              >
                {activeColor === color.name && (
                  <FontAwesomeIcon
                    icon={faCheck}
                    className={activeColor !== '#FFFFFF' ? 'text-white' : 'text-black'}
                  />
                )}
              </span>
            ))}

          </div>
        </PartFilter>
        {/* Sizes */}
        <PartFilter open={sizeOpen} setOpen={setSizeOpen} title={'Size'}>
          <div className={`transition-all flex flex-wrap gap-2 duration-300 ease-in-out overflow-hidden ${sizeOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
            {sizes.map(size => (
              <span onClick={() => handleActiveSize(size)} key={size} className={`w-[80px] h-[40px] select-none rounded-full cursor-pointer text-center content-center transition duration-350 ${activeSize === size ? "bg-black text-white" : "bg-gray-200 text-black"}  py-2`}>{size}</span>
            ))}
          </div>
        </PartFilter>
        {/* Dress Style */}
        <div></div>
        <button onClick={handleFilters} className="bg-black rounded-xl text-white w-full py-3 mt-4 cursor-pointer">Apply Filters</button>
      </div>
      {/* Products */}

      <ProductCards loading={loading} currentPage={page} setCurrentPage={setPage} currentProducts={data.data?.length} limit={limit} numberOfProducts={data.productCounts}>
        {data?.data?.length === 0 && (
          <p>No Clothes Found</p>
        )}
        {Array.isArray(data?.data) && data?.data.length > 0 && data.data.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ProductCards>
    </div>
  )
}

export default Products