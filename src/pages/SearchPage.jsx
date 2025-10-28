import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom"
import ProductCards from "../components/Products/ProductCards";
import ProductCard from "../components/Products/ProductCard";
import ProductLayout from "../components/Search/ProductLayout";
import { useTitle } from "../customHooks";

const SearchPage = () => {
  useTitle('Search')
  const [searchParams, setSearchParams] = useSearchParams()
  const title = searchParams.get('title');
  const [page, setPage] = useState(1)
  const [searchResult, setSearchResult] = useState([]);
  const [numberOfProducts, setNumberOfProducts] = useState(0)
  const limit = 2;
  useEffect(() => {

    const controller = new AbortController();

    axios.post(`${import.meta.env.VITE_API_URL}/products/search`, {
      title
    }, { signal: controller.signal }).then(res => {
      setSearchResult(res.data?.searchResult)
      setNumberOfProducts(res.data?.numberOfProducts)
    })
      .catch(err => console.log('error'))
    return () => {
      controller.abort()
    }
  }, [title])

  return (
    <div className="container mx-auto">
      <div className="flex justify-between">
        <h2 className="font-bold text-xl">Search Result</h2>
        <p>showing</p>
      </div>
      <ProductLayout>
        {Array.isArray(searchResult) && searchResult.length > 0 && searchResult.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </ProductLayout>
    </div>
  )
}

export default SearchPage