// import { authService } from "@/services/authServices";
// import tokenMethod from "@/utils/token";
// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { message } from "antd";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import tokenMethod from "../../utils/token";
import { message } from "antd";
import { authService } from "../../services/AuthService";
import thunk from "redux-thunk";
import { handleGetCart } from "./cartReducer";

const initialState = {
  showedModal: "",
  profile: null,
  loading: {
    login: false,
    register: false,
    getProfile: false,
  },
};

export const authSlice = createSlice({
  initialState,
  name: "auth",
  reducers: {
    handleShowModal: (state, action) => {
      state.showedModal = action.payload;
    },
    handleCloseModal: (state) => {
      state.showedModal = "";
    },
    handleLogout: (state) => {
      tokenMethod.remove();
      state.profile = null;
      state.showedModal = "";
      message.success("Đăng xuất thành công");
    },
  },

  extraReducers: (builder) =>{

    builder.addCase(handleRegister.fulfilled, (state) =>{
      state.loading.register = false
    }),
    builder.addCase(handleRegister.pending, (state) =>{
      state.loading.register = true
    }),
    builder.addCase(handleRegister.rejected, (state) =>{
      state.loading.register = false
    })

    builder.addCase(handleGetProfile.fulfilled, (state, action) =>{
      state.profile = action.payload
      state.loading.getProfile = false
    }),
    builder.addCase(handleGetProfile.pending, (state) =>{
      state.loading.getProfile = true
    }),
    builder.addCase(handleGetProfile.rejected, (state) =>{
      state.loading.getProfile = false
    })


    builder.addCase(handleLogin.fulfilled, (state) =>{
      state.loading.login = false
      // setTimeout(() =>{
        state.showedModal = "";
      // }, 300)
    }),
    builder.addCase(handleLogin.pending, (state) =>{
      state.loading.login = true
    }),
    builder.addCase(handleLogin.rejected, (state) =>{
      state.loading.login = false
    })


   
  }
});

// Extract the action creators object and the reducer
const { actions, reducer: authReducer } = authSlice;
// Extract and export each action creator by name
export const { handleLogout, handleShowModal, handleCloseModal } = actions;
// Export the reducer, either as a default or named export
export default authReducer;

export const handleRegister = createAsyncThunk(
  "auth/handleRegister",
  async (payload, thunkApi) => {
    try {
      const registerRes = await authService.register(payload);
      if (registerRes?.data?.data?.id) {
        message.success("Đăng ký thành công");
        thunkApi.dispatch(
          handleLogin({
            email: payload.email,
            password: payload.password,
          })
        );
        return true;
      } else {
        throw false;
      }
    } catch (error) {
      console.log("error", error)
      const errorInfo = error?.response?.data;
      if (errorInfo.error === "Forbidden") {
        message.error("Email đã được đăng ký");
      }
      return thunkApi.rejectWithValue(errorInfo);
    }
  }
);

export const handleLogin = createAsyncThunk(
    "auth/handleLogin", 
    async(payload, {dispatch,getState, rejectWithValue}) =>{
        // call API
     try{
      const res = await authService.login(payload)
      const {token: accessToken, refreshToken} = res?.data?.data || {}
      // luu vao storage
      tokenMethod.set({
        accessToken,
        refreshToken
      })
      dispatch(handleGetProfile());
      // dispatch(handleGetCart())
        message.success("Đăng nhập thành công")
        // dispatch(handleCloseModal())
      return true
     } catch (error) {
      console.log("error", error)
      const errorInfo = error?.response?.data;
      if (errorInfo.error === "Not Found") {
        message.error("Username hoặc password không đúng");
      }
      return rejectWithValue(errorInfo);
     } 
        
    }
)

export const handleGetProfile = createAsyncThunk(
  // taoj ra 2 action 1: peding, fulfiled, rejected
  "auth/getProfile",
  // goi pending
  async (_, thunkApi) => {
    if (tokenMethod.get()) {
      try {
        // goi fulfiled,
        const profileRes = await authService.getProfile();
        // tu dong chay vao update action
        return profileRes?.data?.data;
      } catch (error) {
        // goi rejected
        return thunkApi.rejectWithValue(error?.response?.data);
      }
    }
  }
);