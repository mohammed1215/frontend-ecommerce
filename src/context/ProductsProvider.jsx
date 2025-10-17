import { createContext, useState } from "react"

export const ProductContext = createContext()

const ProductsProvider = ({ children }) => {

  const [products, setProducts] = useState([]);

  return (
    <ProductContext.Provider value={{ products, setProducts }}>
      {children}
    </ProductContext.Provider>
  )
}

export default ProductsProvider