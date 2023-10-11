import React, { useState } from "react";
import { useMainContext } from "../../context/MainContextProvider";
import { NavLink } from "react-router-dom";
import { PATHS } from "../../constants/paths";
import classNames from "classnames";
import cn from "../../utils/cn";

const MENUS = {
  menu: "menu",
  cate: " categories",
};

const MobileMenu = () => {
  const { handleCloseMobileMenuShow } = useMainContext();
  const [selectedTab, setSelectedTab] = useState(MENUS.menu);
  const _onTabChange = (e, tab) => {
    e.preventDefault();
    setSelectedTab(tab);
  };
  return (
    <div>
      {/* Mobile Menu */}
      <div className="mobile-menu-overlay" 
                  onClick={handleCloseMobileMenuShow}

      />
      {/* End .mobil-menu-overlay */}
      <div className="mobile-menu-container">
        <div className="mobile-menu-wrapper">
          <span
            className="mobile-menu-close"
            onClick={handleCloseMobileMenuShow}
          >
            <i className="icon-close" />
          </span>
          <form action="#" method="get" className="mobile-search">
            <label htmlFor="mobile-search" className="sr-only">
              Search
            </label>
            <input
              type="search"
              className="form-control"
              name="mobile-search"
              id="mobile-search"
              placeholder="Search in..."
              required
            />
            <button className="btn btn-primary" type="submit">
              <i className="icon-search" />
            </button>
          </form>
          <ul className="nav nav-pills-mobile nav-border-anim" 
          // role="tablist"
          >
            <li className="nav-item">
              <a
                className={cn("nav-link", {
                  active: selectedTab === MENUS.menu,
                })}
                // id="mobile-menu-link"
                // data-toggle="tab"
                href="#mobile-menu-tab"
                // role="tab"
                // aria-controls="mobile-menu-tab"
                // aria-selected="true"
                onClick={(e) => _onTabChange(e, MENUS.menu)}
              >
                Menu
              </a>
            </li>
            <li className="nav-item">
              <a
                className={cn("nav-link", {
                  active: selectedTab === MENUS.cate,
                })}
                href="#mobile-cats-tab"
                onClick={(e) => _onTabChange(e, MENUS.cate)}
              >
                Categories
              </a>
            </li>
          </ul>
          <div className="tab-content">
            <div
              className={`tab-pane fade show active`}
              id="mobile-menu-tab"
              role="tabpanel"
              aria-labelledby="mobile-menu-link"
            >
              <nav className="mobile-nav">
                <ul className="mobile-menu">
                  <li>
                    <NavLink to={PATHS.HOME}>Home</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.ABOUT}>About Us</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.PRODUCTS}>Product</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.BLOG}>Blog</NavLink>
                  </li>
                  <li>
                    <NavLink to={PATHS.CONTACT}>Contact Us</NavLink>
                  </li>
                </ul>
              </nav>
              {/* End .mobile-nav */}
            </div>
            {/* .End .tab-pane */}
            <div
              // className={`tab-pane fade ${selectedTab === MENUS.cate ? "show active" : ""}`}  */}
              // {/* SU DUNG CLASSNAMES */
              className={classNames("tab-pane fade", {
                show: selectedTab === MENUS.cate,
                active: selectedTab === MENUS.cate,
              })}
              id="mobile-cats-tab"
              role="tabpanel"
              aria-labelledby="mobile-cats-link"
            >
              <nav className="mobile-cats-nav">
                <ul className="mobile-cats-menu">
                  <li>
                    <a className="mobile-cats-lead" href="#">
                      TV
                    </a>
                  </li>
                  <li>
                    <a href="#">Computers</a>
                  </li>
                  <li>
                    <a href="#">Tablets &amp; Cell Phones</a>
                  </li>
                  <li>
                    <a href="#">Smartwatches</a>
                  </li>
                  <li>
                    <a href="#">Accessories</a>
                  </li>
                </ul>
                {/* End .mobile-cats-menu */}
              </nav>
              {/* End .mobile-cats-nav */}
            </div>
            {/* .End .tab-pane */}
          </div>
          {/* End .tab-content */}
          <div className="social-icons">
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Facebook"
            >
              <i className="icon-facebook-f" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Twitter">
              <i className="icon-twitter" />
            </a>
            <a
              href="#"
              className="social-icon"
              target="_blank"
              title="Instagram"
            >
              <i className="icon-instagram" />
            </a>
            <a href="#" className="social-icon" target="_blank" title="Youtube">
              <i className="icon-youtube" />
            </a>
          </div>
          {/* End .social-icons */}
        </div>
        {/* End .mobile-menu-wrapper */}
      </div>
      {/* End .mobile-menu-container */}
    </div>
  );
};

export default MobileMenu;
