import React, { useState } from "react";
import Button from "../Button";
import { MESSAGE, REGEX } from "../../constants/validate";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContextProvider";
import { Input } from "../Input";
import ComponentLoading from "../ComponentLoading";
import { useDispatch } from "react-redux";
import { handleLogin } from "../../store/reducer/authReducer";
import { Result } from "antd";


const SiginForm = () => {
  // const {handleLogin} = useAuthContext()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
		if (data && !loading.login) {
			// setLoading(true);
				// handleLogin?.(data,() =>{
        //   setTimeout(() => {
        //     setLoading(false)
        //   }, 300);
        // })
       try {
        const res = await dispatch(handleLogin(data)).unwrap()
       } catch (error) {
        console.log("error", error)
       }
		}}
    // const renderLoading = useDebounce(loading.login, 300)
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ position: "relative"}}

      >

        {loading && <ComponentLoading/>}
        <Input
          label="Username or email address"
          required
          {...register("email",{
            required: MESSAGE.required,
            pattern:{
              value: REGEX.email,
              message: MESSAGE.email
            }
          })}
          error = {errors?.email?.message || ""}
          // ref={registerRef}
        />
         <Input
          label= "Password"
          required
          type="password"
          {...register("password",{
            required: MESSAGE.required
          })}
          error={errors?.password?.message || ""}
        />
        <div className="form-footer">
          <Button type="submit" className="btn btn-outline-primary-2">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </Button>
          </div>
      </form>
      </div>
  );
};

export default SiginForm;
