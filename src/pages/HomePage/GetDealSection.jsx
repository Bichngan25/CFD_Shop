import React, { useState } from "react";
import Input from "../../components/Input";
import { regrexRule, requireRule } from "../../utils/validate";
import Button from "../../components/Button";
import { useAuthContext } from "../../context/AuthContextProvider";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";

const GetDealSection = ({ handleSubscribeDeal }) => {
  const { handleShowModal, handleCloseModal, handleRegister } =
    useAuthContext();
  const [loading, setLoading] = useState(false);
  const { form, register, validate } = useForm(
    {
      email: "",
    },
    {
      email: [
        requireRule("Please fill in this field"),
        regrexRule("Please enter email with format abc@def.com", "email"),
      ],
    }
  );
  const _onSubmit = (e) => {
    handleSubscribeDeal();
    e.preventDefault();
    const errorObject = validate();
    if (Object.keys(errorObject).length > 0) {
      console.log("Submit Error", errorObject);
    } else {
      setLoading(true);
      console.log("Submit Success", form);
      // check ham neu ton tai duoi dang function k
      if (typeof handleSubscribeDeal === "function") {
        handleSubscribeDeal?.(form, () => {
          setTimeout(() => {
            setLoading(false);
          }, 300);
        });
      } else {
        setLoading(false);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div
          className="cta cta-separator cta-border-image cta-half mb-0"
          style={{
            backgroundImage: "url(/assets/images/demos/demo-3/bg-2.jpg)",
          }}
        >
          <div className="cta-border-wrapper bg-white">
            <div className="row">
              <div className="col-lg-6">
                <div className="cta-wrapper cta-text text-center">
                  <h3 className="cta-title">Shop Social</h3>
                  <p className="cta-desc">
                    Donec nec justo eget felis facilisis fermentum. Aliquam
                    porttitor mauris sit amet orci.{" "}
                  </p>
                  <div className="social-icons social-icons-colored justify-content-center">
                    <Link
                      to="https://www.facebook.com/"
                      className="social-icon social-facebook"
                      title="Facebook"
                      target="_blank"
                    >
                      <i className="icon-facebook-f" />
                    </Link>
                    <Link
                      to="https://twitter.com/?lang=vi"
                      className="social-icon social-twitter"
                      title="Twitter"
                      target="_blank"
                    >
                      <i className="icon-twitter" />
                    </Link>
                    <Link
                      to="https://www.instagram.com/"
                      className="social-icon social-instagram"
                      title="Instagram"
                      target="_blank"
                    >
                      <i className="icon-instagram" />
                    </Link>
                    <Link
                      to="https://www.youtube.com/"
                      className="social-icon social-youtube"
                      title="Youtube"
                      target="_blank"
                    >
                      <i className="icon-youtube" />
                    </Link>
                    <Link
                      to="https://www.pinterest.com/"
                      className="social-icon social-pinterest"
                      title="Pinterest"
                      target="_blank"
                    >
                      <i className="icon-pinterest" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="cta-wrapper text-center">
                  <h3 className="cta-title">Get the Latest Deals</h3>
                  <p className="cta-desc">
                    and <br />
                    receive <span className="text-primary">$20 coupon</span> for
                    first shopping{" "}
                  </p>
                  {/* **** submit***** */}
                  <form onClick={_onSubmit}>
                    <div className="input-group">
                      <Input
                        lable="Email"
                        type="text"
                        className="form-control"
                        placeholder="Enter your Email Address"
                        // aria-label="Email Adress"
                        {...register("email")}
                        style={{ display: "initial" }}
                      />
                      <div className="input-group-append">
                        <Button
                          className="btn btn-primary btn-rounded"
                          type="submit"
                        >
                          <i className="icon-long-arrow-right" />
                        </Button>
                      </div>
                    </div>
                  </form>
                  <p
                    className="form-error"
                    style={{
                      textAlign: "left",
                      minHeight: 23,
                    }}
                  >
                    {/* {errors?.email?.message || ""} */}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetDealSection;
