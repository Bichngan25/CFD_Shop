import React from "react";
import { MESSAGE, REGEX } from "../../constants/validate";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Input, InputM } from "../../components/Input";
import Button from "../../components/Button";


const GetDealSection = ({ handleSubscribeDeal }) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({

    email: "",

  });

  const _onSubmit = (value) => {
    handleSubscribeDeal?.(value, reset);
  };

  return (
    <div>
      <div className="container">
        <div
          className="cta cta-separator cta-border-image cta-half mb-0"
          style={{
            // nhớ thêm / vào image
            backgroundImage: "url(/assets/images/demos/demo-3/bg-2.jpg)",
          }}
        >
          <div className="cta-border-wrapper bg-white">
            <div className="row">
              <div className="col-lg-6">
                {/* Social media các bạn xử lý tuỳ ý */}
                <div class="cta-wrapper cta-text text-center">
                  <h3 class="cta-title">Shop Social</h3>
                  <p class="cta-desc">
                    Donec nec justo eget felis facilisis fermentum. Aliquam
                    porttitor mauris sit amet orci.{" "}
                  </p>
                  <div class="social-icons social-icons-colored justify-content-center">
                    <Link
                      to="https://www.facebook.com/?locale=vi_VN"
                      class="social-icon social-facebook"
                      title="Facebook"
                      target="_blank"
                    >
                      <i class="icon-facebook-f"></i>
                    </Link>
                    <Link
                      to="https://twitter.com/?lang=vi"
                      class="social-icon social-twitter"
                      title="Twitter"
                      target="_blank"
                    >
                      <i class="icon-twitter"></i>
                    </Link>
                    <Link
                      to="https://www.instagram.com/"
                      class="social-icon social-instagram"
                      title="Instagram"
                      target="_blank"
                    >
                      <i class="icon-instagram"></i>
                    </Link>
                    <Link
                      to="https://www.youtube.com/"
                      class="social-icon social-youtube"
                      title="Youtube"
                      target="_blank"
                    >
                      <i class="icon-youtube"></i>
                    </Link>
                    <Link
                      to="https://www.pinterest.com/"
                      class="social-icon social-pinterest"
                      title="Pinterest"
                      target="_blank"
                    >
                      <i class="icon-pinterest"></i>
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
                  <form onSubmit={handleSubmit(_onSubmit)}>
                    <div className="input-group">
                      {/* <div className="form-group"> */}
                      <Input
                      // label="Email Adress"
                        type="text"
                        className="form-control"
                        placeholder="Enter your Email Address"
                        {...register("email", {
                          required: MESSAGE.required,
                          pattern: {
                            value: REGEX.email,
                            message: MESSAGE.email,
                          },
                        })}
                        // style={{margin_top : "-26px"}}
                      />
                      {/* </div> */}
                      <div className="input-group-append">
                        <Button
                        style={{top : "26px"}}
                          className="btn btn-primary btn-rounded"
                          type="submit"
                        >
                          <i className="icon-long-arrow-right" />
                        </Button>
                      </div>
                    </div>

                    <p 
                      className="form-error"
                      style={{
                        textAlign: "left",
                        minHeight: 23,
                      }}
                    >
                      {errors?.email?.message || ""}
                    </p>
                  </form>
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
