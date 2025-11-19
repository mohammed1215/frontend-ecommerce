import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductsProvider'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import Product from '../components/ProductDetails/Product'
import axios from 'axios'
import Reviews from '../components/ProductDetails/Reviews'
import { useTitle } from '../customHooks'
const ProductDetails = () => {
  useTitle('Product Details')
  const { products } = useContext(ProductContext)
  // const [product, setProduct] = useState({})
  const [comments, setComments] = useState([])
  const { productId } = useParams()
  const [loadingReviews, setLoadingReviews] = useState(true)
  const product = products.data?.find(p => p._id === productId)

  useEffect(() => {

    async function getReviews() {
      try {

        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${productId}`);
        setComments(data.data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoadingReviews(false)
      }
    }
    if (productId) getReviews()
  }, [productId])

  if (!product.data) {
    return <div className="text-center mt-10">Loading product...</div>
  }

  return (
    <div>
      {product ? (
        <>
          <Product product={product} />
          <Reviews product={product} comments={comments} setComments={setComments} />
        </>
      )
        :
        <div>404 not found</div>
      }
    </div>
  )
}

export default ProductDetails