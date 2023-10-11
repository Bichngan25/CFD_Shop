import React from "react";
import { useAuthContext } from "../../context/AuthContextProvider";
import { MODAL_TYPE } from "../../constants/general";
import tokenMethod from "../../utils/token";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/paths";

const HeaderTop = () => {
  const { handleShowModal, handleLogout, profile } = useAuthContext();
  console.log("profile", profile);
  const { firstName, email } = profile || {};

  const _onShowAuthModal = (e) => {
    // the a
    e?.preventDefault();
    e?.stopPropagation(true);
    handleShowModal?.(MODAL_TYPE.login);
  };

  const _onSignOut = (e) => {
    e.preventDefault();
    handleLogout();
  };
  return (
    <div>
      <div className="header-top">
        <div className="container">
          <div className="header-left">
            <a href="tel:0989596912">
              <i className="icon-phone" /> Hotline: 098 9596 912{" "}
            </a>
          </div>
          <div className="header-right">
            {!!!tokenMethod.get() ? (
              <>
                {/* Not LogIn */}
                <ul className="top-menu top-link-menu">
                  <li>
                    <a
                      href="#signin-modal"
                      //  data-toggle="modal"
                      className="top-menu-login"
                      onClick={_onShowAuthModal}
                    >
                      <i className="icon-user" />
                      Login | Resgister{" "}
                    </a>
                  </li>
                </ul>
              </>
            ) : (
              <>
                {/* Logged In */}
                <ul class="top-menu">
                  <li>
                    <a href="#" class="top-link-menu">
                      <i class="icon-user"></i>{firstName || email || "Guest"}{" "}
                    </a>
                    <ul>
                      <li>
                        <ul>
                          <li>
                            <Link to={PATHS.DASHBOARD}>Account Details</Link>
                          </li>
                          <li>
                            <Link to={PATHS.DASHBOARD}>Your Orders</Link>
                          </li>
                          <li>
                            <Link to={PATHS.DASHBOARD}>
                              Wishlist <span>(3)</span>
                            </Link>
                          </li>
                          <li>
                            <a href="#" onClick={_onSignOut}>Sign Out</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
