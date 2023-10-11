import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContextProvider";
import useForm from "../../hooks/useForm";
import { regrexRule, requireRule } from "../../utils/validate";
import Button from "../Button";
import Input from "../Input";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import ComponentLoading from "../ComponentLoading";

const RegisterForm = () => {
  const {handleRegister} = useAuthContext()
  const [loading, setLoading] = useState(false);

  const {form, register, validate} = useForm (
    {   
        email:"",
        password:"",
     },
     {
        email: [
        requireRule("Please enter your email"),
        regrexRule("Please enter email with format abc@dè.com", "email")
      ],
      password: [requireRule("Please enter your password")],
    }
     )
    const _onSubmit = (data) => {
        data.preventDefault()
        const errorObject = validate();
        if (Object.keys(errorObject).length > 0 ) {
            console.log("Submit Error", errorObject)
          } else {
            setLoading(true);
            console.log("Submit Success", form)
            // check ham neu ton tai duoi dang function k
            if (typeof handleRegister === "function"){
              handleRegister?.(form, () =>{
                setTimeout(()=>{
                setLoading(false)
                alert("đăng nhâp thành công")
                // nho goi ham de close
                // handleCloseModal()
            },300)
            })
            } else{
              setLoading(false)
            }
          }
    }
  return (
    <div>
        <form
        onSubmit={_onSubmit}
        style={{ position: "relative"}}
         action="#">
          {loading && <ComponentLoading/>}
          <Input
             label="Your email address"
            required
            placeholder="Your email address"
            {...register("email")}
         />
        <Input
            label={"Password"}
            required
            placeholder="Password"
            type="Password"
            {...register("password")}
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
