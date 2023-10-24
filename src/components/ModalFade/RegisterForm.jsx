import React, { useState } from "react";
// import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import ComponentLoading from "../ComponentLoading";
import { useForm } from "react-hook-form";
import { useAuthContext } from "../../context/AuthContextProvider";
import { MESSAGE, REGEX } from "../../constants/validate";
import Button from "../Button";
import { Input } from "../Input";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { handleRegister } from "../../store/reducer/authReducer";


const RegisterForm = () => {
  // const {handleRegister} = useAuthContext()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

    const onSubmit = async (data) => {
        if(data) {
          setLoading(true)
          const { name, email, password} = data
          const payload ={
            firstName: name || "",
            lastName: "",
            email,
            password
          }
          try {
            const res = await dispatch(handleRegister(payload)).unwrap()
          } catch (error) {
            console.log("error", error)
          } finally{
            setTimeout(() =>{
              setLoading(false)
            }, 300)
          }
        } 
    }
  return (
    <div>
        <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ position: "relative"}}
        //  action="#"
         >
          {loading && <ComponentLoading/>}
          <Input
             label="Your email address"
            required
            {...register("email",{
              required: MESSAGE.required,
              pattern:{
                value: REGEX.email,
                message: MESSAGE.email
              }
            })}
            error={errors?.email?.message || ""}
         />
        <Input
            label="Password"
            required
            type="password"
            {...register("password",{
              required: MESSAGE.required
            })}
            error={errors?.password?.message || ""}
        />
          <div className="form-footer">
            <Button type="submit" className="btn btn-outline-primary-2">
              <span>SIGN UP</span>
              <i className="/icon-long-arrow-right" />
            </Button>
            <div className="custom-control custom-checkbox">
              <input
                type="checkbox"
                className="custom-control-input"
                id="register-policy"
                required
              />
              <label className="custom-control-label" htmlFor="register-policy">
                I agree to the
                <Link to={PATHS.PRIVATE_POLICY}>privacy policy</Link> *
              </label>
            </div>
            </div>
        </form>
    </div>
  );
};

export default RegisterForm;
