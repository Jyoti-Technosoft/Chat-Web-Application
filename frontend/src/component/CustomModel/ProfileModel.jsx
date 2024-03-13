import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import apiClient from "../Util/axios";
import CapitalizeFirstLetter from "../CustomFunctions/CapatilizeFirstLetter";

import "./ProfileModel.scss";

function ProfileModel(props) {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [gender, setGender] = useState();

  useEffect(() => {
    const token = Cookies.get("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.id;

    apiClient
      .get(`/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((data) => {
        setFirstName(data.data.user.firstName);
        setLastName(data.data.user.lastName);
        setEmail(data.data.user.email);
        const d = new Date(data.data.user.createdAt);
        const date = `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()} ${d.getDate()}:${d.getMonth()}:${d.getFullYear()}`;
        setCreatedTime(date);
        setGender(data.data.user.gender);
      })
      .catch((error) => {});
  }, []);

  return (
    <>
      <Modal
        {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body className="profile-model-div p-0">
          <div className="profile-modal-header">
            <p className="text-center text-white py-2">Profile</p>
            <div className="user-icon-div d-flex justify-content-center">
              <div className="user-img position-relative d-flex justify-content-center align-items-center">
                <h3 className="text-white m-0">{`${CapitalizeFirstLetter(
                  firstName
                )}${CapitalizeFirstLetter(lastName)}`}</h3>
                <div className="online-circle"></div>
              </div>
            </div>
            <p className="text-center text-white py-2">
              {firstName} {lastName}
            </p>
          </div>
          <div className="profile-modal-body">
            <ul className="px-3">
              <li className="my-user-list label">First Name</li>
              <li className="my-user-list">{firstName}</li>
              <hr className="my-2" />
              <li className="my-user-list label">Last Name</li>
              <li className="my-user-list">{lastName}</li>
              <hr className="my-2" />
              <li className="my-user-list label">Email</li>
              <li className="my-user-list">{email}</li>
              <hr className="my-2" />
              <li className="my-user-list label">Gender</li>
              <li className="my-user-list">{gender}</li>
            </ul>
            <p
              role="button"
              className="text-center mt-2"
              onClick={props.onHide}
            >
              <span className="close-txt">Close</span>
            </p>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ProfileModel;
