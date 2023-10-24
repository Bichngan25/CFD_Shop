import React from "react";
import SiginForm from "./SiginForm";
import RegisterForm from "./RegisterForm";
import { useAuthContext } from "../../context/AuthContextProvider";
import { ModalFadeContainer } from "../StyledComponents";
import cn from "../../utils/cn";
import { MODAL_TYPE } from "../../constants/general";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseModal, handleShowModal } from "../../store/reducer/authReducer";
import classNames from "classnames";

const ModalFade = () => {
  // const { showedModal, handleShowModal, handleCloseModal } = useAuthContext();
  const dispatch = useDispatch()
  const {showedModal} = useSelector((state) => state.auth)
  console.log("showedModal",showedModal)
  const _onTabChange = (e, tab) => {
    // the a
    e?.stopPropagation();
    e?.preventDefault();
    dispatch(handleShowModal(tab))
    // handleShowModal?.(tab);
  };
  const _onCloseModal = (e) =>{
    e?.stopPropagation()
    e?.preventDefault()
    dispatch(handleCloseModal())
  }
  return (
    <>
      {/* Sign in / Register Modal */}
      <ModalFadeContainer
        className={cn("modal", { "fade show": !!showedModal })}
        isShow={!!showedModal}
        // id="signin-modal"
        // tabIndex={-1}
        // role="dialog"
        // aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered"  role="document"
        >
          <div className="modal-content"
          >
            <div className="modal-body" >
              <button
                type="button"
                className="close"
                onClick={_onCloseModal}
                // data-dismiss="modal"
                // aria-label="Close"
              >
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul
                    className="nav nav-pills nav-fill nav-border-anim"
                    // role="tablist"
                  >
                    <li className="nav-item">
                      <a
                        className={cn("nav-link", {
                          active: showedModal === MODAL_TYPE.login,
                        })}
                        // id="signin-tab"
                        // data-toggle="tab"
                        href="#signin"
                        onClick={(e) => _onTabChange(e, MODAL_TYPE.login)}
                        // role="tab"
                        // aria-controls="signin"
                        // aria-selected="true"
                      >
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={cn("nav-link", {
                          active: showedModal === MODAL_TYPE.register,
                        })}
                        href="#register"
                        onClick={(e) => _onTabChange(e, MODAL_TYPE.register)}
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    <div className="tab-pane fade show active">
                      {showedModal === MODAL_TYPE.login && <SiginForm />}
                      {showedModal === MODAL_TYPE.register && <RegisterForm />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ModalFadeContainer>
      {!!showedModal && (
        <div
        classNames="modal-backdrop fade show"
        onClick={_onCloseModal}
        ></div>
      )}
    </>
  );
};

export default ModalFade;
