import { useRef } from "react";
import { useParams } from "react-router-dom";
import useQuery from "../../hooks/useQuery";
import { productService } from "../../services/productService";
import { message } from "antd";
import { handleAddCart } from "../../store/reducer/cartReducer";
import { useDispatch } from "react-redux";

const useProductDetailPage = () =>{
    // Initial Hooks
    const dispatch = useDispatch()
    // lay slug ve de lay productdetail
    const {slug} = useParams();
    const colorRef = useRef();
    const quantityRef = useRef();
    // Fetching API 
    const {data: productDetailData} = useQuery (
        () => productService.getProductDetail(slug),[slug]
    )
    // co productdetail roi thi se lay duoc id
    const {id, name, description, shippingReturn, price, discount} = productDetailData || {};
    // co id ta se lay duoc productdetailpreview
    const {data: productDetailReviews} = useQuery(
        () => id && productService.getProductReview(id),[id]
    )
    const handleAddToCart = async () =>{
        const {value: color, reset: colorReset} = colorRef.current || {}
        const {value: quantity, reset: quantityReset} = quantityRef.current || {};

        // validate
        if (!color) {
            message.error("Please select color");
            return;
        } else if ( isNaN(quantity) && quantity < 1) {
            message.error("Quantity must be greater than 1");
            return
        }

        // add cart
        const addPayLoad = {
            addedId: id,
            addedColor: color,
            addedQuantity: quantity,
            addedPrice: price - discount
        }
        try {
            const res = dispatch(handleAddCart(addPayLoad)).unwrap();
            if(res) {
                console.log("color", color)
                console.log("quantity", quantity)
                        // call api sau do no se reset lai
                colorReset?.();
                quantityReset?.()
            }
        } catch (error) {
            console.log("error", error)
        }
    }
    const handleAddToWishlist = () =>{
        console.log("handleAddToWishlist")
    }
    const productDetailTopProps = {
        ...productDetailData,
        reviews: productDetailReviews,
        colorRef,
        quantityRef,
        handleAddToCart,
        handleAddToWishlist
    }
    const productDetailTabProps = {
        description,
        shippingReturn,
        reviews: productDetailReviews
    }
    return{
        productName: name,
        productDetailTopProps,
        productDetailTabProps
    }
}
export default useProductDetailPage

