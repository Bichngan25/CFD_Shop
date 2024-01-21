import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { cartServices } from "../../services/cartServices"
import thunk from "redux-thunk"
import { message } from "antd"
import { sumArrayNumber } from "../../utils/calculate"

const initialState = {
    // chuaws thoong tin
    cartInfo : {},
    // chua tinh trang
    cartLoading: false
}

export const cartSlice = createSlice({
    initialState,
    name: "cart",
    reducers: {
        updateCacheCart: (state, action) =>{
            state.cartInfo = action.payload || state.cartInfo
        },
        clearCart: (state) => {
            state.cartInfo= {}
        }
    },
    extraReducers: (builder) =>{
        // get cart
        builder.addCase(handleGetCart.pending, (state) =>{
            state.cartLoading = true;
        })
        builder.addCase(handleGetCart.fulfilled, (state, action) =>{
            state.cartLoading = false;
            state.cartInfo = action.payload
        })
        builder.addCase(handleGetCart.rejected, (state) =>{
            state.cartLoading = false;
            state.cartInfo = {}
        })

        // add cart 
        builder.addCase(handleAddCart.pending, (state) =>{
            state.cartLoading = true;
        })
        builder.addCase(handleAddCart.fulfilled, (state) =>{
            state.cartLoading = false
        })
        builder.addCase(handleAddCart.rejected, (state) => {
            state.cartLoading = false
        })
        // remove cart
        builder.addCase(handleRemoveFromCart.pending, (state) =>{
            state.cartLoading = true
        })
        builder.addCase(handleRemoveFromCart.fulfilled, (state) =>{
            state.cartLoading = false
        })
        builder.addCase(handleRemoveFromCart.rejected, (state) =>{
            state.cartLoading = false
        })
        // update cart
        builder.addCase(handleUpdateCart.pending, (state) =>{
            state.cartLoading = true
        })
        builder.addCase(handleUpdateCart.fulfilled, (state) =>{
            state.cartLoading = false
        })
        builder.addCase(handleUpdateCart.rejected, (state) =>{
            state.cartLoading
        })
    }
})

//  extract the action creators object and the reducer
const {actions, reducer: cartReducer} = cartSlice
// extract and export each action creator by name
export const {updateCacheCart, clearCart} = actions
// export the reducer, either as a default or named export
export default cartReducer

export const handleGetCart = createAsyncThunk(
    "cart/get",
    async(_, thunkApi) => {
        try {
            const cartRes = await cartServices.getCart()

            return cartRes.data?.data
        } catch (error) {
            thunkApi.rejectWithValue(error)
        }
    }
)

export const handleAddCart = createAsyncThunk(
    "cart/add",
    async(actionPayLoad, thunkApi) =>{
        try {
            const {addedId, addedColor, addedQuantity, addedPrice} = actionPayLoad
            console.log("thunkApi.getState()",thunkApi.getState())
            const {cartInfo} = thunkApi.getState()?.cart || {}

            let addPayLoad = {}
            // check xem  hiện tại maxindex co bang hay k
            if (cartInfo.id) {
                // neu co bang thif se co product
                const matchIndex = cartInfo.product?.findIndex (
                    (product) => product.id === addedId
                )
                // taoj 1 mang sp moi. (lay sp cu map lai de lai ID)
                const newProduct = cartInfo.product?.map((product) =>{
                    return product.id 
                })
                const newQuantity = [...(cartInfo.quantity ?? [])]
                const newVariant = [...(cartInfo.variant ?? [])]
                const newTotalProduct = [...(cartInfo.totalProduct ?? [])]
                //  nếu maxindex >-1 tức là có sanr phẩm đó trong mảng
                if (matchIndex > -1 && newVariant[matchIndex] === addedColor) {
                    newQuantity[matchIndex] =
                    // nếu điều kiện là có sản phamả đó và giống với variant
                    Number(newQuantity[matchIndex]) + Number(addedQuantity)
                    newVariant[matchIndex] = addedColor
                    newTotalProduct[matchIndex]=
                    Number(newTotalProduct[matchIndex]) + addedPrice * addedQuantity
                } else {
                    // trong truong hop neu khcng maxindex hoac maxindex nhung khong max voi variant thi
                    newProduct.push(addedId)
                    newQuantity.push(addedQuantity)
                    newVariant.push(addedColor);
                    newTotalProduct.push(addedPrice * addedQuantity)
                }

                const newSubTotal = newTotalProduct.reduce(
                    // next là cái đầu tiên trong mãng chạy trước.
                    (curr, next) => Number(curr) + Number(next),0
                ) || 0

                const newTotal = newSubTotal - cartInfo.discount

                addPayLoad = {
                    ...cartInfo,
                    product: newProduct,
                    quantity: newQuantity,
                    subTotal: newSubTotal,
                    total: newTotal,
                    totalProduct: newTotalProduct
                }
            } else {
                addPayLoad = {
                    product: [addedId],
                    quantity: [addedQuantity],
                    variant: [addedColor],
                    totalProduct: [addedPrice * addedQuantity],
                    subTotal: addedPrice * addedQuantity,
                    total: addedPrice * addedQuantity,
                    discount: 0,
                    paymentMethod: ""
                }
            }
            console.log("addPayLoad",addPayLoad)

            const cartRes = await cartServices.updateCart(addPayLoad)
            thunkApi.dispatch(handleGetCart())
            message.success("Add to cart successfully")
            return cartRes?.data?.data
        } catch (error) {
            thunkApi.rejectWithValue(error)
            message.error("Add to cart failed")
        }
    }
)

export const handleRemoveFromCart = createAsyncThunk(
    "cart/removeProduct",
    async (actionPayLoad, thunkApi) => {
        const {removeIndex} = actionPayLoad || {}
        const {getState, dispatch, rejectWithValue} = thunkApi
        const {cartInfo} = getState()?.cart || {}

        if (removeIndex < 0) return false
        try {
            const newProduct = cartInfo.product
            // loc bo di product muon xoa
            ?.filter((_, index) => index !== removeIndex)
            // lay ID de cap nhap
            .map((item) => item.id)
            // loc bo cac thong tin
            const newQuantity = cartInfo.quantity?.filter(
                (_, index) => index !== removeIndex
            )
            const newVariant = cartInfo.variant?.filter(
                (_, index) => index !== removeIndex
            )
            const newTotalProduct = cartInfo.totalProduct?.filter(
                (_, index) => index != removeIndex
            )
            // tinh de tra lai gia tri product moi
            const newSubTotal = sumArrayNumber(newTotalProduct)
            // tinh 
            const newTotal = newSubTotal - (cartInfo.discount ?? 0) + (cartInfo.shipping?.price ?? 0)
            //  lay lai het thong tin cua cart info
            const updatePayload = {
                ...cartInfo,
                product: newProduct,
                quantity: newQuantity,
                variant: newVariant,
                totalProduct: newTotalProduct,
                subTotal: newSubTotal,
                total: newTotal,
                shipping: newProduct?.length > 0 ? cartInfo.shipping : {},
                discount: newProduct?.length > 0 ? cartInfo.discount : 0
            }
            // sau khi co payload roi co the call api update
            const cartRes = await cartServices.updateCart(updatePayload)
            dispatch(handleGetCart())
            message.success("Remove from cart successfully")
            return cartRes?.data?.data
        } catch (error) {
            rejectWithValue(error)
            message.error("Remove from cart failed")
            console.log("error", error)
        }
    }
)