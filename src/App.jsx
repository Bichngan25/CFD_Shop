import { useState } from 'react'
import reactLogo from './assets/react.svg'
import AboutPage from './pages/AboutPage'
import BlogPage from './pages/BlogPage'
import BlogSinglePage from './pages/BlogSinglePage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import CheckoutSuccessPage from './pages/CheckoutSuccessPage'
import ContactPage from './pages/ContactPage'
import DashBoardPage from './pages/DashBoardPage'
import FaqPage from './pages/FaqPage'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'
import PaymentMethodsPage from './pages/PaymentMethodsPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductPage from './pages/ProductPage'
import ReturnsPage from './pages/ReturnsPage'
import ShippingPage from './pages/ShippingPage'
import MainLayout from './layout/MainLayout'
import { PATHS } from './constants/paths'
import PrivateRoute from './components/PrivateRoute'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {
  // const [count, setCount] = useState(0)
  return (
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<MainLayout/>}>
          <Route index element={<HomePage/>} />
          <Route path={PATHS.PRODUCTS} element={<ProductPage/>}/>
          <Route path={PATHS.PRODUCT_DETAIL} element={<ProductDetailPage/>}/>
          <Route path={PATHS.DASHBOARD} element={<DashBoardPage/>}/>
          <Route path={PATHS.FAQ} element={<FaqPage/>}/>
          <Route path={PATHS.PAYMENT_METHOD} element={<PaymentMethodsPage/>}/>
          <Route path={PATHS.RETURN} element={<ReturnsPage/>}/>
          <Route path={PATHS.SHIPPING} element={<ShippingPage/>}/>
          <Route path={PATHS.BLOG} element={<BlogPage/>}/>
          <Route path={PATHS.CONTACT} element={<ContactPage/>}/>
          <Route path={PATHS.ABOUT} element={<AboutPage/>}/>
          <Route path={PATHS.PRIVATE_POLICY} element={<PrivacyPolicyPage/>}/>
          <Route element={<PrivateRoute redirectPath={PATHS.HOME}/>}>
            <Route path={PATHS.CART} element={<CartPage/>}/>
            <Route path={PATHS.CHECKOUT} element={<CheckoutPage/>}/>
            <Route path={PATHS.CHECKOUT_SUCCESS} element={<CheckoutSuccessPage/>}/>
            <Route path={PATHS.PROFILE.INDEX} element={<DashBoardPage/>}/>
          </Route>
          <Route path="*" element={<NotFoundPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App

