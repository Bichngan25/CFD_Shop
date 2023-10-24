import React from "react";
import ProductToolbox from "./ProductToolbox";
import ProductList from "./ProductList";
import ProductFilter from "./ProductFilter";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import Breadcrumb from "../../components/Breadcrumb";
import useProductPage from "./useProductPage";
import Pagination from "../../components/Pagination";

const ProductPage = () => {
  const { productListProps, pagiProps} = useProductPage();
  return (
    <div>

      <main className="main">
        <div
          className="page-header text-center"
          style={{
            backgroundImage: 'url("/assets/images/page-header-bg.jpg")',
          }}
        >
          <div className="container">
            <h1 className="page-title">Product</h1>
          </div>
        </div>

        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to={PATHS.HOME}>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item isActive>Product</Breadcrumb.Item>
        </Breadcrumb>

        <div className="page-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-9">
                <ProductToolbox />
                <ProductList {...productListProps}/>
                {/* chuyen trang */}
                <Pagination {...pagiProps}/>
              </div>
              <ProductFilter />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
