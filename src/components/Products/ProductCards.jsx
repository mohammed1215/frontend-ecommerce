import { useEffect } from "react"

const ProductCards = ({ children, currentPage, setCurrentPage, currentProducts, limit, numberOfProducts }) => {

  function handleNextPage() {
    setCurrentPage(prev => prev * limit / numberOfProducts >= 1 ? prev : prev + 1)
  }
  function handlePrevPage() {
    setCurrentPage(prev => prev > 1 ? prev - 1 : 1)

  }

  return (
    <div className="flex-2  flex flex-col">
      <div className="flex justify-between">
        <h2 className="font-bold text-2xl">Casual</h2>
        <p>{numberOfProducts}</p>
      </div>
      <div className='grid grid-cols-1 flex-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {children}
      </div>

      <div className="flex justify-between mt-auto">
        <button className={`rounded-lg disabled:opacity-50 px-2 py-1 border border-gray-600 not-disabled:hover:bg-gray-500 transition duration-300 ${currentPage === 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={currentPage === 1} onClick={handlePrevPage}>previous</button>
        <div className=""></div>
        <button className={`rounded-lg disabled:opacity-50 px-2 py-1 border border-gray-600 not-disabled:hover:bg-gray-500 transition duration-300 ${currentPage * limit / numberOfProducts >= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}`} disabled={currentPage * limit / numberOfProducts >= 1} onClick={handleNextPage}>next</button>
      </div>
    </div>
  )
}

export default ProductCards