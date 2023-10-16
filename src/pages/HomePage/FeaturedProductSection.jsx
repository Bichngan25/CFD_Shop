import React, { useEffect } from "react";
import owlCarousels from "../../utils/owlCarousels";
import cn from "../../utils/cn";
import ProductCard from "../../components/ProductCard";

// Nhận props data được truyền vào categories | featureProducts | selectedCateSlug | handleSelectCate
const FeaturedProductSection = ({
  categories,
  featureProducts,
  selectedCateSlug,
  handleSelectCate,
}) => {
  // console.log("categories", categories);
  // Dùng useEffect để chạy owlCarousels function mỗi lần props selectedCateSlug thay đổi giá trị
  useEffect(() => {
    owlCarousels();
  }, [selectedCateSlug]);
  //   Tạo function _onSelectCate: xử lý mỗi khi user thay đổi tab category:
  // Nhận vào (e, slug)
  // e: xử lý preventDefault + stopPropagation
  // slug: category slug mà user đang chọn
  // handleSelectCate("") trước
  // setTimeout (200ms) và handleSelectCate(slug) sau
  // LÝ DO: vì owl cần được reset mỗi khi thay đổi danh sách items trong slider => chúng ta cần clear data để tắt owl trước khi update list items mới (xem rõ hơn ở code mẫu)
  const _onSelectCate = (e, slug) => {
    e.preventDefault();
    e.stopPropagation();
    handleSelectCate("");
    setTimeout(() => {
      handleSelectCate(slug);
    }, 200);
  };
  return (
    <div>
      {/* // Cố định style height ở đây để mỗi khi thay đổi list item sẽ không co giãn UI */}
      <div className="container top" style={{ height: 505 }}>
        <div className="heading heading-flex mb-3">
          <div className="heading-left">
            <h2 className="title">Featured Products</h2>
          </div>
          <div className="heading-right">
            <ul
              className="nav nav-pills nav-border-anim justify-content-center"
              role="tablist"
            >
              {/* Dùng categories props để map ra list tabs */}
              {categories?.map((category) => {
                const { name, slug } = category || "";
                return (
                  <li className="nav-item">
                    <a
                      className={cn("nav-link", {
                        active: selectedCateSlug === slug,
                      })}
                      // id="top-all-link"
                      // data-toggle="tab"
                      href="#top-all-tab"
                      // role="tab"
                      // aria-controls="top-all-tab"
                      // aria-selected="true"
                      onClick={(e) => _onSelectCate(e, slug)}
                    >
                      {name}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className="tab-content tab-content-carousel just-action-icons-sm">
          <div
            className={cn("tab-pane p-0 fade", {
              "show active": featureProducts?.length > 0,
            })}
            // id="top-all-tab"
            // role="tabpanel"
            // aria-labelledby="top-all-link"
          >
            {/* ************ */}
            {featureProducts?.length > 0 && (
              <div
              className="owl-carousel owl-full carousel-equal-height carousel-with-shadow"
              data-toggle="owl"
              data-owl-options='{
                                                      "nav": true, 
                                                      "dots": false,
                                                      "margin": 20,
                                                      "loop": false,
                                                      "responsive": {
                                                          "0": {
                                                              "items":2
                                                          },
                                                          "480": {
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
              {featureProducts?.map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProductSection;
