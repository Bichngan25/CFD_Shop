import React, { useEffect } from "react";
import ProductImageZoom from "../../components/ProductImageZoom";
import { formatCurrency, transformNumberToPercent } from "../../utils/format";
import { PATHS } from "../../constants/paths";
import { Link } from "react-router-dom";
import ShareLink from "../../components/ShareLink/ShareLink";
import ProductColor from "../../components/ProductColor";
import QuantityInput from "../../components/QuantityInput";

const ProductDetailsTop = ({
  images,
  name,
  rating,
  reviews,
  price,
  description,
  color,
  category,
  stock,
  colorRef,
  quantityRef,
  handleAddToCart,
  handleAddtoWishlist,
}) => {
  // lay duocj link sp
  const pathUrl = window.location.href;
  const categoryPath =
    category?.id && PATHS.PRODUCTS + `?category=${category?.id}`;
  const _onAddToCart = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleAddToCart?.();
  };
  const _onAddToWishlist = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    handleAddtoWishlist?.();
  };

  return (
    <div className="product-details-top">
      <div className="row">
        <div className="col-md-6">
          <ProductImageZoom images={images} />
        </div>
        <div className="col-md-6">
          <div className="product-details">
            <h1 className="product-title">{name}</h1>
            <div className="ratings-container">
              <div className="ratings">
                <div
                  className="ratings-val"
                  style={{
                    width: `${transformNumberToPercent(rating)}%`,
                  }}
                />
              </div>
              <a
                className="ratings-text"
                href="#product-review-link"
                id="review-link"
              >
                ( {reviews?.length} Reviews )
              </a>
            </div>
            <div className="product-price"> ${formatCurrency(price)} </div>
            <div
              className="product-content"
              // khi no la 1 chuoi string thi chuyen thanhf html
              dangerouslySetInnerHTML={{ __html: description }}
            >
              {/* {description} */}
              {/* <p>Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing. Sed lectus. </p> */}
            </div>
            <div className="details-filter-row details-row-size">
              <label>Color:</label>
              <ProductColor
               ref={colorRef} 
               colors={color} />
            </div>
            <div className="details-filter-row details-row-size">
              <label htmlFor="qty">Qty:</label>
              <div className="product-details-quantity">
                <QuantityInput
                max={stock}
                ref={quantityRef}/>
              </div>
            </div>
            <div className="product-details-action">
              <a
                href="#"
                className="btn-product btn-cart"
                onClick={_onAddToCart}
              >
                <span>add to cart</span>
              </a>
              <div className="details-action-wrapper">
                <a
                  href="#"
                  className="btn-product btn-wishlist"
                  title="Wishlist"
                  onClick={_onAddToWishlist}
                >
                  <span>Add to Wishlist</span>
                </a>
              </div>
            </div>
            <div className="product-details-footer">
              <div className="product-cat">
                <span>Category:</span>
                <Link to={categoryPath}>{category?.name}</Link>,
                {/* <a href="#">Dresses</a>,{" "} */}
                {/* <a href="#">Yellow</a> */}
              </div>
              <div className="social-icons social-icons-sm">
                <span className="social-label">Share:</span>
                <ShareLink
                  // href="#"
                  // className="social-icon"
                  title="Facebook"
                  path={pathUrl}
                  // target="_blank"
                >
                  <i className="icon-facebook-f" />
                </ShareLink>
                <ShareLink type="twitter" title={"Twitter"} path={pathUrl}>
                  <i className="icon-twitter" />
                </ShareLink>
                <ShareLink type="instagram" title={"Instagram"} path={pathUrl}>
                  <i className="icon-instagram" />
                </ShareLink>
                <ShareLink type="pinterest" title={"Pinterest"} path={pathUrl}>
                  <i className="icon-pinterest" />
                </ShareLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsTop;
