import React from "react";
import CountDown from "../../components/CountDown";
import moment from "moment";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import ProductCard from "../../components/ProductCard";

// Nhận props data truyền vào: dealProducts
// Tạo targetTime: dùng momentjs để set thời gian countdown là 17:00:00 tommorow tính từ today
// Tạo CountDown component để xử lý render countdown UI (tham khảo code mẫu)
// Lấy 3 products đầu tiên trong dealProducts để render lần lượt 3 sản phẩm
// Deal có countdown, không thể tái sử dụng ProductCard => gán thẳng dữ liệu trực tiếp
// Deal KHÔNG có countdown, tái sử dụng ProductCard, nhưng cần nâng cấp để render discount data
// Gán link cần thiết

// Nhận props data truyền vào: dealProducts
const DealSection = ({ dealProducts }) => {
  // Tạo targetTime: dùng momentjs để set thời gian countdown là 17:00:00 tommorow tính từ today
  const targetTime = moment()
    .add(1, "day")
    .set({ hour: 17, minute: 0, second: 0, millisecond: 0 }); // 5pm tomorrow
  const dealOfTheDayProduct = dealProducts?.[0] || {};
  // console.log("dealOfTheDayProduct", dealOfTheDayProduct);
  return (
    <div>
      <div className="bg-light deal-container pt-7 pb-7 mb-5">
        <div className="container">
          <div className="heading text-center mb-4">
            <h2 className="title">Deals &amp; Outlet</h2>
            <p className="title-desc">Today’s deal and more</p>
          </div>
          <div className="row">
            <div className="col-lg-6 deal-col">
              <div
                className="deal"
                style={{
                  backgroundImage:
                    'url("/assets/images/demos/demo-3/deal/bg-1.jpg")',
                }}
              >
                <div className="deal-top">
                  <h2>Deal of the Day.</h2>
                  <h4>Limited quantities. </h4>
                </div>
                <div className="deal-content">
                  <h3 className="product-title">
                    <Link to={PATHS.PRODUCTS + `/${dealOfTheDayProduct.slug}`}>
                      {dealOfTheDayProduct.name}
                      {/* Home Smart Speaker with Google Assistant */}
                    </Link>
                  </h3>
                  <div className="product-price">
                    <span className="new-price">
                      $
                      {dealOfTheDayProduct.price - dealOfTheDayProduct.discount}
                    </span>
                    <span className="old-price">
                      Was ${dealOfTheDayProduct.price}
                    </span>
                  </div>
                  <Link
                    to={PATHS.PRODUCTS + `/${dealOfTheDayProduct.slug}`}
                    className="btn btn-link"
                  >
                    <span>Shop Now</span>
                    <i className="icon-long-arrow-right" />
                  </Link>
                </div>
                <div className="deal-bottom">
                  {/* ======= countdown======= */}
                  <CountDown targetTime={targetTime} />
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="products">
                <div className="row">
                  <div className="col-6">
                    <div className="product">
                      {/* Deal có countdown, không thể tái sử dụng ProductCard => gán thẳng dữ liệu trực tiếp */}
                      {dealProducts?.[1] && (
                        <ProductCard product={dealProducts[1]} />
                      )}
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="product">
                    {dealProducts?.[2] && (
                        <ProductCard product={dealProducts[2]} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="more-container text-center mt-3 mb-0">
            <Link to={PATHS.PRODUCTS} className="btn btn-outline-dark-2 btn-round btn-more">
              <span>Shop more</span>
              <i className="icon-long-arrow-right" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealSection;
