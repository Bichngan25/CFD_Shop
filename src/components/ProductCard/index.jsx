import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import { formatCurrency } from "../../utils/format";
import { Empty } from "antd";
import { styled } from "styled-components";

const ImageWrapper = styled.div`
  width: 100%;
  height: 315px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c1c1c1;
`;


const ProductCard = ({ product }) => {
  const { id, slug, title, price, rating, images, discount } = product || {};
  const _onAddToCart = (e) => {
    e?.preventDefault();
    // Xử lý sau
  };
  return (
    <div>
      <div className="product product-2">
        <figure className="product-media">
          {/* **** */}
        {discount > 0 && (
          <span className="product-label label-circle label-sale">Sale</span>
        )}
          <Link to={PATHS.PRODUCT_DETAIL}>
            {images?.length > 0 ?
            (
            <img
              src={images[0]}
              alt="Product image"
              className="product-image"
            />
            ) : ( 
              <ImageWrapper>
            <Empty
              description="không có nội dung hiển thị"
              style={{ margin: "0 auto" }}
            />
            </ImageWrapper>
            ) }
          </Link>
          <div className="product-action-vertical">
            <a
              href="#"
              className="btn-product-icon btn-wishlist btn-expandable"
            >
              <span>add to wishlist</span>
            </a>
          </div>
          <div className="product-action product-action-dark">
            <a
              href="#"
              className="btn-product btn-cart"
              title="Add to cart"
              onClick={_onAddToCart}
            >
              <span>add to cart</span>
            </a>
          </div>
        </figure>
        <div className="product-body">
          <h3 className="product-title">
            <Link to={PATHS.PRODUCT_DETAIL}>{title || ""}</Link>
          </h3>
          <div className="product-price">
          {discount ? (
            <>
              {" "}
              <span className="new-price">
                ${formatCurrency(price - discount)}
              </span>
              <span className="old-price">
                Was ${formatCurrency(price)}
              </span>{" "}
            </>
          ) : (
            <>${formatCurrency(price || 0)}</>
          )}
        </div>
          <div className="ratings-container">
            <div className="ratings">
              <div
                className="ratings-val"
                style={{ width: `${(rating || 0) * 20}%` }}
              />
            </div>
            <span className="ratings-text">( {rating} Reviews )</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
