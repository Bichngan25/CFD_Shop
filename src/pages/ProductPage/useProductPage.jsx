import { useLocation, useSearchParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productService";
import { useEffect, useMemo } from "react";
import queryString from "query-string";
import { SORT_OPTIONS } from "../../constants/general";
import useMutation from "../../hooks/useMutation";

//  show 9 product on page
const PRODUCT_LIMITS = 9;

const useProductPage = () => {
  const { search } = useLocation();
  console.log("search", search);
  // convert string to object (parse)
  // **** convert object to string (stringify)
  const queryObject = queryString.parse(search);
  console.log("queryObject", queryObject);
  const [_, setSearchParams] = useSearchParams();

  // fetching API
  // pruducts
  //   const {
  //     data: productsData,
  //     loading: productsLoading,
  //     error: productsError,
  //     refetch: refetchProducts,
  //   } = useQuery(
  //     (query) => productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`),
  //     [search],
  //     {
  //       preventInitialCall: true,
  //     }
  //   );

  const {
    data: productsData,
    loading: productsLoading,
    error: productsError,
    execute: fetchProducts,
  } = useMutation((query) =>
    productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`)
  );

  const products = productsData?.products || [];
  const productsPagi = productsData?.pagination || {};
  console.log("products", products);

  // categories
  const {
    data: categoriesData,
    loading: categoriesLoading,
    error: categoriesError,
  } = useQuery(productService.getCategories);
  const categories = categoriesData?.products || [];

  useEffect(() => {
    fetchProducts(search);
  }, [search]);

  // UPDATE QUERYSTRING
  const updateQueryString = (queryObject) => {
    const newQueryString = queryString.stringify({
      ...queryObject,
      limit: PRODUCT_LIMITS,
    });
    setSearchParams(new URLSearchParams(newQueryString));
  };

   // TOOLBOXPROPS
   const activeSort = useMemo(() => {
    return (
      Object.values(SORT_OPTIONS).find(
        (options) =>
          options.queryObject.orderBy === queryObject.orderBy &&
          options.queryObject.order === queryObject.order
      )?.value || SORT_OPTIONS.popularity.value
    );
  }, [queryObject]);

  const onSortChange = (sortType) => {
    const sortQueryObject = SORT_OPTIONS[sortType].queryObject;
    if (sortQueryObject) {
      updateQueryString({
        ...queryObject,
        ...sortQueryObject,
        page: 1,
      });
    }
  };

  const tooboxProps = {
    showNumb: products?.length || 0,
    totalNumb: productsPagi.total || 0,
    activeSort,
    onSortChange,
  };

  // PRODUCT LIST
  const productListProps = {
    isLoading: productsLoading,
    isError: !!productsError,
    products,
  };

  // PAGINATION
  const onPagiChange = (page) => {
    updateQueryString({ ...queryObject, page: page });
  };

  const pagiProps = {
    page: Number(productsPagi.page || queryObject.page || 1),
    limit: Number(productsPagi.limit || 0),
    total: Number(productsPagi.total || 0),
    onPagiChange,
  };

 

  // FILTER
  const onCateFilterChange = (cateId, isChecked) => {
    console.log("isChecked",isChecked)
    let newCategoryFilter = Array.isArray(queryObject.category)
    ? [...queryObject.category, cateId]
    : [queryObject.category, cateId]
    console.log("queryObject",queryObject)

    // if (!isChecked){
    //   newCategoryFilter = newCategoryFilter.filter((category) => category !== cateId)
    // }
    // console.log("newCategoryFilter",newCategoryFilter)

    // if (cateId === ""){
    //   newCategoryFilter = []
    // }
    updateQueryString({ ...queryObject, category: newCategoryFilter, page: 1 });
  };

  const handlePriceFilterChange = (value) =>{
    if (value?.length === 2) {
      updateQueryString({...queryObject, minPrice: value[0], maxPrice: value[1], page: 1})
    }
  }

  const filterProps = {
    categories: categories || [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    // check array
    activeCategory: Array.isArray(queryObject.category) ? queryObject.category : [queryObject.category] , currentPriceRange: [queryObject.minPrice || 0, queryObject.maxPrice || 1000],
    onCateFilterChange,
    handlePriceFilterChange
  }
  return {
    productListProps,
    pagiProps,
    tooboxProps,
    filterProps,
  };
};

export default useProductPage;
