import { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import scrollTop from "../utils/scrollTop";

const MainContext = createContext({});
const MainContextProvider = ({ children }) => {
  const { pathname } = useLocation();
  console.log("pathname", pathname);
  const [isShowMobileMenu, setIsShowMobileMenu] = useState(false);

  // SD useeffect de moi lan chay se dong menu
  useEffect(() => {
    handleCloseMobileMenuShow();
    const myTimeout = setTimeout(() => {
      scrollTop();
    }, 100);
    return () => {
      clearTimeout(myTimeout);
    };
  }, [pathname]);

  // HANDLE SHOW
  const handleShowMobileMenuShow = (e) => {
    setIsShowMobileMenu(true);
    e?.stopPropagation();
    e?.preventDefault();
    $("body").addClass("mmenu-active");
  };
  // // HANDLE CLOSE
  const handleCloseMobileMenuShow = (e) => {
    e?.stopPropagation();
    e?.preventDefault();
    $("body").removeClass("mmenu-active");
  };

  return (
    <MainContext.Provider
      value={{
        isShowMobileMenu,
        handleShowMobileMenuShow,
        handleCloseMobileMenuShow,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};

export default MainContextProvider;

// cac gia tri( state, function, data) deu se nhan duoc . vif vay khi sd chir can goi useContext
export const useMainContext = () => useContext(MainContext);
