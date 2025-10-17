import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../context/ProductsProvider'
import { useParams } from 'react-router-dom'
import Card from '../components/Card'
import Product from '../components/ProductDetails/Product'
import axios from 'axios'
import Reviews from '../components/ProductDetails/Reviews'
const ProductDetails = () => {

  const { products } = useContext(ProductContext)
  const [product, setProduct] = useState({})
  const [comments, setComments] = useState([])
  const { productId } = useParams()

  useEffect(() => {

    async function getReviews() {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/reviews/${productId}`);
      setComments(data.data);
    }
    getReviews()
  }, [])

  useEffect(() => {
    const productFound = products.data?.find(p => p._id === productId)
    setProduct(productFound)
  }, [products])

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