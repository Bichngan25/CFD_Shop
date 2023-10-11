// import { message } from "antd";
import tokenMethod from "../utils/token";
import { PATHS } from "../constants/paths";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { authService } from "../services/authService";
import { message } from "antd";
import { authService } from "../services/AuthService";


const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {

  const navigate = useNavigate()
  const [showedModal, setShowedModal] = useState("");
  const [profile, setProfile] = useState({})
  console.log("profile",profile)
  useEffect (() =>{
    // neu accessToken co thi 
    // const accessToken = !!tokenMethod.get()?.accessToken
    if(tokenMethod.get()) {
      // lay:
      handleGetProfile()
    }
  },[])
//   ======= SHOWMODAL ===========
  const handleShowModal = (modalType) => {
    if (!!!tokenMethod.get()){
      setShowedModal(modalType || "");
    }
  };
  console.log("tokenMethod",tokenMethod)

// ============= CLOSE MODAL ============ 
  const handleCloseModal = (e) => {
    e?.stopPropagation();
    setShowedModal("");
  };

  // ======================== LOGIN ============================
  const handleLogin = async (loginData, callback) =>{
    // nho tao payload
    const payload = {...loginData}
    // xu ly API login
    // console.log("profile", profile)
    try {
      const res = await authService.login(payload)
      console.log("res", res)
      // check xem res co ton tai hay k va neu ton tai thi
      if (res?.data?.data){
        const {token: accessToken, refreshToken} = res.data.data || {}
        // luu vao local storage
        tokenMethod.set({
          accessToken,
          refreshToken,
        });

        // lay thong tin profile
        handleGetProfile()
        // dong modall va thong bao thanh cong
        handleCloseModal()

       // truyen vao loi nhan dang nhap thanh cong
      message.success("đang nhập thành công")
      } else {
        message.error("đăng nhập thất bại")
      }
    } catch (error) {
      console.log("error", error)
    } finally {
      callback?.()
    }

  }
  // =================== REGISTER ==================

  const handleRegister = async (registerData, callback) => {
    const {name, email, password} = registerData || {}
    // xu ly payload
    const payload ={
      // vao swagger de check
      firstName :"",
      lastName: "",
      email,
      password
    }
    console.log("payload", payload)
    // xu ly API 
    try {
      const res = await authService.register(payload)
      if (res?.data?.data?.id){
        // handleLogin (neu dk xong dang nhap luon account)
        handleLogin({
          email,
          password
        })
        //  thong bao
        handleCloseModal()
        message.success("đăng ký thành công")
      } else{
        message.error("đăng ký thất bại")
      }
    } catch (error) {
      console.log("error", error)
      message.error("đăng ký thất bại")
    } finally{
      callback?.()
    }
  }


  // =================== LOGOUT ====================
  const handleLogout = () =>{
    tokenMethod.remove();
    setProfile(undefined)
    // tao ham navigate de di den trang
    navigate(PATHS.HOME)
    message.success("tài khoản của bạn dã đăng xuất")
  }


  // ==================== GET PROFILE ==================
  // ========> vào network lỗi Unauthorized: là không có quyền lấy tt vì chưa được xác thực
  // =========> 
  //    b1: check headers -> request headers sẽ thấy k có token được gửi vao trong khi đó trong swagger yêu cầu cần có token nếu k có token sẽ bị lỗi
  //    b2: cần confit cái header vào getprofile trong authService( xem)

  const handleGetProfile = async () => {
    // call api get profile
    // vi sd nhieu lan nen tao usestate de tai sd
    // ====> profile se duoc goi khi login vi vay vao ham login de bo profile
    try {
      // xem trong authService
      const res = await authService.getProfile()
      // check neu co du lieu thi tra ve profile ?
      if (res?.data?.data) {
        setProfile(res.data.data)
      }
    } catch (error) {
      // neu loi thi login nhung k lay dc proflie thi (neu nhu vay vao profile se k co ys nghia vi se k lay duoc thong tin . vi vay neu loi thi cho logout de nguoi ta dang nhap lai)
      console.log("error", error)
      handleLogout()
    }
  }
  return (
    <AuthContext.Provider
      value={{ showedModal, profile, handleShowModal, handleCloseModal, handleLogin, handleLogout, handleRegister}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
