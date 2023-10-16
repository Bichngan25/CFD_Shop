import { useState } from "react";
import useQuery from "../../hooks/useQuery";
import { pageService } from "../../services/pageService";
import { productService } from "../../services/productService";
import useMutation from "../../hooks/useMutation";
import { subscribeService } from "../../services/subscribeService";
import { message } from "antd";
import { GENERAL_MESSAGE, HOME_MESSAGE } from "../../constants/message";

const useHomePage = () => {
  // call  API lay danh sach products
  const { data: productsData } = useQuery(productService.getProducts);
  // console.log("productsData", productsData);
  const products = productsData?.products || [];
  // console.log("products", products);
  //   Tạo featuredProducts: filter những featured product
  const featuredProducts =
    products?.filter((product) => product.featured) || [];

    // Tạo onSaleProducts: filter những onSale products
    // ========= filter: Chỉ lấy ra những phần tử đạt điều kiện ===========//
  const onSaleProducts = products?.filter((product) => product.onSale) || [];
  // Tạo topRatedProducts: filter những topRated products
  const topRatedProducts =
    products?.filter((product) => product.topRated) || [];

  // Dùng useQuery gọi API getPageDataByName kèm theo name=home: để lấy thông tin trang Home, trong đó có thông tin
  const { data: homeData } = useQuery(() =>
    pageService.getPageDataByName("home")
  );
  // Tạo brands: chứa thông tin các brands
  const brands = homeData?.data?.brands || [];

  // Dùng useQuery gọi API getCategories để lấy thông tin categories trên hệ thống
  const {data: categoriesData} = useQuery(productService.getCategories) 
  // console.log("categoriesData",categoriesData)

  const categories = categoriesData?.products || []
  // console.log("categories",categories)

  const services = homeData?.data?.information || {};
  // console.log("services",services)

  // Dùng useMutation khởi tạo execute method để gọi subscribeService.subscribeDeal
  const { execute: dealExecute } = useMutation(subscribeService.subscribeDeal);


  // ===== INTROPRODUCTS SECTION =============
  //   Tạo introProducts: chỉ lấy 3 products từ featuredProducts
  const introProducts = featuredProducts.slice(0, 3);
  //   Tạo introProps: object chứa introProducts để truyền xuống component IntroSection
  // console.log(" introProducts", introProducts)
  const introProps = {
    
    introProducts,
  };
  // console.log("introProps",introProps)

   //  =========== FEATURED SECTION ===============/
   const featuredProps = {
    featuredProducts,
    onSaleProducts,
    topRatedProducts,
  };

  // ============== DEAL SECTION =====================//
  const dealProducts = onSaleProducts.filter((product) => product.discount > 0);
  const dealProps = {
    dealProducts,
  };

  // ==================BRANDS SECTION =================
  const brandProps = {
    brands,
  };
  // console.log("brandProps",brandProps)

// ======================= FEATURED PRODUCT SECTION ==============
// Tạo state selectedCateSlug: chứa thông tin category user đang chọn, mặc định là "all"
const [selectedCateSlug, setSelectedCateSlug] = useState("all");
// Tạo biến featureProducts: dựa vào selectedCateSlug và products filter ra những products thuộc selectedCateSlug tương ứng
const featureProducts =
    selectedCateSlug === "all"
      ? [...(products || [])]
      : products?.filter(
          (product) => product?.category?.slug === selectedCateSlug
        );
// Tạo featuredProps: chứa thông tin props truyền xuống component FeaturedSection
// categories: lấy danh sách categories trả về từ API, thêm vào object { name: "All", slug: "all" } để có option All
// featureProducts
// selectedCateSlug
// handleSelectCate: (slug) => setSelectedCateSlug(slug)
const featuredProductProps = {
  categories: [{ name: "All", slug: "all" }, ...categories],
  featureProducts,
  selectedCateSlug,
  handleSelectCate: (slug) => setSelectedCateSlug(slug),
}

// ================ SERVICES SECTION =====================
const serviceProps = {
  services,
};

// =================== GET DEAL SECTION ====================
// Tạo function handleSubscribeDeal, xử lý khi user subcribe deal:
// Nhận vào (email, callback)
// email: thông tin email của user nhập
// callback: gọi khi API hoàn thành, dùng với mục đích clear input sau khi call API thành công
// Function logic: check email user nhập có giá trị sẽ gọi dealExecute để call API kèm theo email payload, truyền vào onSuccess và onFail để xử lý thông báo
// Trong constants folder tạo file message.js, lưu các message thường dùng
const handleSubscribeDeal = (email, callback) =>{
  if (email) {
    dealExecute(email, {
      onSuccess: (data) => {
        message.success(HOME_MESSAGE.dealSuccess);
        callback?.();
      },
      onFail: (error) => {
        message.error(GENERAL_MESSAGE.error);
      },
    });
  }
}
const getDealProps ={
  handleSubscribeDeal
}

  return {
    introProps,
    featuredProps,
    dealProps,
    brandProps,
    featuredProductProps,
    serviceProps,
    getDealProps
  };
};
export default useHomePage;
