const PRODUCTS = "/products";
const PROFILE = "profile";
const PROFILE_ORDER = "/profile/order"
const PROFILE_ADDRESS = "/profile/address"
const PROFILE_WISHLIST = "/profile/wishlist"

export const PATHS ={
    HOME : "/",
    PRODUCTS: PRODUCTS,
    PRODUCT_DETAIL: PRODUCTS + "/:slug",
    CART: "/cart",
    CHECKOUT: "/checkout",
    CHECKOUT_SUCCESS: "/checkout_success",
    DASHBOARD: "/dashboard",
    FAQ: "FAQ",
    PAYMENT_METHOD: "/payment_method",
    PRIVATE_POLICY: "/private_policy",
    RETURN: "/return",
    SHIPPING:"/shipping",
    PROFILE:{
        INDEX: PROFILE,
        PROFILE_ORDER: PROFILE_ORDER,
        PROFILE_WISHLIST: PROFILE_WISHLIST,
        PROFILE_ADDRESS: PROFILE_ADDRESS,
    },
    BLOG: "/blog",
    CONTACT: "/contact",
    ABOUT: "/about"
}