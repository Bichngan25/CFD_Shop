import { useLocation, useSearchParams} from "react-router-dom"
import useQuery from "../../hooks/useQuery"
import { productService } from "../../services/productService"
import { useEffect } from "react"
import queryString from "query-string"

//  xet che hien thi 9 sp tren page
const PRODUCT_LIMITS = 9

const useProductPage = () =>{

    const {seach} = useLocation()
    const queryObject = queryString.parse(seach)
    const [_, setSearchParams] = useSearchParams()

    // fetching API 
    // pruducts
    const {
        data: productsData,
        loading: productsLoading,
        error: productsError,
        refetch: refetchProducts,
    } = useQuery((query) => productService.getProducts(query || `?limit=${PRODUCT_LIMITS}`))

    const products = productsData?.products || [];
    const productsPagi = productsData?.pagination || {}

    // categories
    const {
        data: categoriesData,
        loading: categoriesLoading,
        error: categoriesError
    } = useQuery(productService.getCategories)

    const categories = categoriesData?.products || []

    useEffect(() =>{
        refetchProducts?.(seach)
    },[seach])

    // UPDATE QUERYSTRING
    const updateQueryString = (queryObject) =>{
        const newQueryString = queryString.stringify({
            ...queryObject,
            limit: PRODUCT_LIMITS
        })
        setSearchParams(new URLSearchParams(newQueryString))
    }


    // PRODUCT LIST 
    const productListProps = {
        isLoading: productsLoading,
        isError: !!productsError,
        products
    }

    // PAGINATION 
    const onPagiChange = (page) =>{
        updateQueryString({...queryObject, page: page})
        }

    const pagiProps = {
        page: Number(productsPagi.page || queryObject.page || 1),
        limit: Number(productsPagi.limit || 0),
        total: Number(productsPagi.total || 0),
        onPagiChange
    }

    return {
        productListProps,
        pagiProps,

      };
}

export default useProductPage