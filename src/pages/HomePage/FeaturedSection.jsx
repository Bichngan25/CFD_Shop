import React, { useEffect, useState } from "react";
import { TABS } from "../../constants/tabs";
import owlCarousels from "../../utils/owlCarousels";
import cn from "../../utils/cn";
import ProductCard from "../../components/ProductCard";

// Tạo constant object TABS chứa thông tin các tabs

// Nhận props data truyền vào: featuredProducts | onSaleProducts | topRatedProducts
const FeaturedSection = ({
  featuredProducts,
  onSaleProducts,
  topRatedProducts,
}) => {
  // console.log("featuredProducts", featuredProducts)
  // Tạo state selectedTab chứa active Tab user đang chọn, mặc định là tab featured
  const [selectedTab, setSelectedTab] = useState(TABS.featured);

  // Dùng useEffect để chạy owlCarousels function mỗi khi selectedTab hoặc props data thay đổi
  useEffect(() => {
    owlCarousels();
  }, [selectedTab, featuredProducts, onSaleProducts, topRatedProducts]);

  // Tạo function _onTabChange: xử lý mỗi khi user thay đổi tab:
  const _onTabChange = (e, tab) => {
    // thẻ a
    e.preventDefault();
    setSelectedTab("");
    setTimeout(() => {
      setSelectedTab(tab);
    }, 200);
  };


//   Tạo function _getSelectedProducts: xử lý trả về danh sách products tương ứng với tab nhận vào
// Nhận vào (tab)
// Dùng switch/case kiểm tra tab hiện tại và gắn products list tương ứng từ props: featuredProducts | onSaleProducts | topRatedProducts
// trả về danh sách products
  const _getSelectedProducts = (tab) => {
    switch (tab) {
      case TABS.featured:
        return featuredProducts;

      case TABS.on_sale:
        return onSaleProducts;

      case TABS.top_rated:
        return topRatedProducts;

      default:
        return [];
    }
  };

  // Tạo renderProducts: mỗi lần rerender sẽ gọi _getSelectedProducts(selectedTab) để có danh sách render products
  const renderProducts = _getSelectedProducts(selectedTab);

  return (
    <div>
      {/* Gán style height cố định để khi chuyển đổi tab không bị co giãn container */}
      <div className="container featured" style={{ height: 550 }}>
        <ul
          className="nav nav-pills nav-border-anim nav-big justify-content-center mb-3"
          role="tablist"
        >
          <li className="nav-item">
            <a
            // active (cn)
              className={cn("nav-link", {
                active: selectedTab === TABS.featured
              } )}
              // id="products-featured-link"
              // data-toggle="tab"
              href="#products-featured-tab"
              // role="tab"
              // aria-controls="products-featured-tab"
              // aria-selected="true"
              onClick={(e) => _onTabChange(e, TABS.featured)}
            >
              Featured
            </a>
          </li>
          <li className="nav-item">
            <a
              className={cn("nav-link",{
                active: selectedTab === TABS.on_sale
              })}
              // id="products-sale-link"
              // data-toggle="tab"
              href="#products-sale-tab"
              // role="tab"
              // aria-controls="products-sale-tab"
              // aria-selected="false"
              onClick={(e) => _onTabChange(e, TABS.on_sale)}
            >
              On Sale
            </a>
          </li>
          <li className="nav-item">
            <a
              className={cn("nav-link",{
                active: selectedTab === TABS.top_rated
              })}
              // id="products-top-link"
              // data-toggle="tab"
              href="#products-top-tab"
              // role="tab"
              // aria-controls="products-top-tab"
              // aria-selected="false"
              onClick={(e) =>_onTabChange(e, TABS.top_rated)}
            >
              Top Rated
            </a>
          </li>
        </ul>
        <div className="tab-content tab-content-carousel">
          {/* kiem tra dieu kien de active. neu  */}
          <div
            className={cn("tab-pane p-0 fade", {
              "show active" : renderProducts?.length > 0,
            } )}
            // id="products-featured-tab"
            role="tabpanel"
            // aria-labelledby="products-featured-link"
          >
             {/* Đảm bảo khi list length > 0 mới render owl carousel, nếu không sẽ lỗi không detect được owl */}
             {renderProducts?.length > 0 && (
                 <div
                 className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
                 data-toggle="owl"
                 data-owl-options='{
                                                         "nav": true, 
                                                         "dots": true,
                                                         "margin": 20,
                                                         "loop": false,
                                                         "responsive": {
                                                             "0": {
                                                                 "items":2
                                                             },
                                                             "600": {
                                                                 "items":2
                                                             },
                                                             "992": {
                                                                 "items":3
                                                             },
                                                             "1200": {
                                                                 "items":4
                                                             }
                                                         }
                                                     }'
               >
                 {renderProducts.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                 })}
               </div>
             )
             }
         
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
