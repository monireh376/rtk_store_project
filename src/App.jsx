import { Navigate, Route, Routes } from "react-router-dom"
import ProductsPages from "./pages/ProductsPages"
import DetailsPage from "./pages/DetailsPage"
import CheckoutPage from "./pages/CheckoutPage"
import PageNotFound from "./pages/404"
// import ProductProvider from "./context/ProductContext"
// import CartProvider from "./context/CartContext"
import Layout from "./layout/Layout"

function App() {

  return (
    
    // <CartProvider>
      // <ProductProvider>
        <Layout>
          <Routes>
            <Route index element={<Navigate to="/products" replace />}/>
            <Route path="/products" element={<ProductsPages />}/>
            <Route path="/products/:id" element={<DetailsPage />}/>
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Layout>
      // </ProductProvider>
    // </CartProvider>
    
  )
}

export default App
