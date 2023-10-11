import React, { useState } from "react";
import { useAuthContext } from "../../context/AuthContextProvider";
import Input from "../Input";
import useForm from "../../hooks/useForm";
import { regrexRule, requireRule } from "../../utils/validate";
import ComponentLoading from "../ComponentLoading";
import Button from "../Button";

const SiginForm = () => {
  const { handleLogin } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const { form, register, validate } = useForm(
    {
      email: "",
      password: "",
    },
    {
      email: [
        requireRule("Please enter your email"),
        regrexRule("Please enter email with format abc@dè.com")
      ],
      password:[
        requireRule("Please enter your password")
      ]
    }
  );
 
  const _onSubmit = (data) => {
    // preventDefault: k reload lai trang
    data.preventDefault()
    const errorObject = validate()
    if (Object.keys(errorObject).length > 0){
      console.log("Submit Error", errorObject)
    } else{
      setLoading(true);
      console.log("Submit success", form)
      handleLogin?.(data, () => {
        setTimeout(() => {
          setLoading(false);
        }, 300);
      });
    }
  };
  
  return (
    <div>
      <form
        onSubmit={_onSubmit}
        style={{ position: "relative"}}
         action="#"
      >
        {loading && <ComponentLoading/>}
        <Input
          label="Username or email address"
          required
          placeholder="Username or email address"
          {...register("email")}
        />
         <Input
          label="Password"
          required
          placeholder="Password"
          type="Password"
          {...register("password")}
        />
          <Button type="submit" className="btn btn-outline-primary-2">
            <span>LOG IN</span>
            <i className="icon-long-arrow-right" />
          </Button>
      </form>
    </div>
  );
};

export default SiginForm;
