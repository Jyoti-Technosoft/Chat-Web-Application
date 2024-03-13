import { useContext } from "react";
import { ShowContext } from "../Context/Context";
import { useNavigate, useParams } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import socket from "../Util/webSocketHelper";
import Cookies from "js-cookie";
import * as constants from "../Util/constant";
import { SUCCESS } from "../Util/constant";

import "./LogoutModel.scss";

function CustomModel(props) {
  const { setShowToast, loggedUserId } = useContext(ShowContext);
  const navigate = useNavigate();

  const openUserDetails = () => {
    socket.emit(constants.SET_USER_STATUS_DEACTIVE, loggedUserId);
    setShowToast({ show: true, msg: "Logout Successfully", type: SUCCESS });
    Cookies.remove("token");
    navigate("/login");
  };

  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <div className="text-center custom-model-container py-2">
            <p>Are you sure you want to Logout?</p>
            <span className="logout-btn" onClick={openUserDetails}>
              Yes, logout
            </span>
            <span className="cancel-btn" onClick={props.onHide}>
              Cancel
            </span>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default CustomModel;
