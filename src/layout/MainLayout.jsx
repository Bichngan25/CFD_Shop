import React from 'react'
import MainContextProvider from '../context/MainContextProvider'
import AuthContextProvider from '../context/AuthContextProvider'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ModalFade from '../components/ModalFade'
import MobileMenu from '../components/MobileMenu'
import { Outlet } from 'react-router-dom'
import ScrollTop from '../components/ScrollTop'

const MainLayout = () => {
  return (
    <>
    <MainContextProvider>
        {/* <AuthContextProvider> */}
            <div className='page-wrapper'>
                <Header/>
                <Outlet/>
                <Footer/>
            </div>
            <ScrollTop/>
            <MobileMenu/>
            <ModalFade/>
        {/* </AuthContextProvider> */}
    </MainContextProvider>
    </>
  )
}

export default MainLayout
