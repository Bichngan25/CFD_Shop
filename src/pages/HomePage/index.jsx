import React from "react";
import IntroSection from "./IntroSection";
import FeaturedSection from "./FeaturedSection";
import DealSection from "./DealSection";
import BrandSection from "./BrandSection";
import FeaturedProductSection from "./FeaturedProductSection";
import ServiceSection from "./ServiceSection";
import GetDealSection from "./GetDealSection";
import useHomePage from "./useHomePage";

const HomePage = () => {
  const {introProps, featuredProps, dealProps, brandProps, featuredProductProps, serviceProps, getDealProps} = useHomePage()
  return (
    <div>
      <div>
        <div className="page-wrapper">
          <main className="main">
            <IntroSection {...introProps}/>
           <FeaturedSection {...featuredProps}/>
            <div className="mb-7 mb-lg-11" />
            <DealSection {...dealProps}/>
            <BrandSection {...brandProps}/>
            <div className="container">
              <hr className="mt-3 mb-6" />
            </div>
            <div className="container">
              <hr className="mt-5 mb-6" />
            </div>
            <FeaturedProductSection {...featuredProductProps}/>
            <div className="container">
              <hr className="mt-5 mb-0" />
            </div>
            <ServiceSection {...serviceProps}/>
            <GetDealSection {...getDealProps}/>
          </main>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
