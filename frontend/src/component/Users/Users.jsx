import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShowContext } from "../Context/Context";
import CapitalizeFirstLetter from "../CustomFunctions/CapatilizeFirstLetter";

import "./Users.scss";

function Users({ firstName, lastName, userid }) {
  const { userId } = useParams();

  const { loggedUserList } = useContext(ShowContext);

  return (
    <>
      <div
        className={`card single-user-details ${
          userId === userid ? "active-user" : "no"
        }`}
      >
        <div className="card-body ps-3 p-0 my-2">
          <div className="user-details-card d-flex align-items-center">
            <div className="user-img">
              <p className="first-char-text">{`${CapitalizeFirstLetter(
                firstName
              )}${CapitalizeFirstLetter(lastName)}`}</p>

              {loggedUserList.includes(userid) ? (
                <div className="online-circle w-5 h-5 bg-success"></div>
              ) : null}
            </div>
            <div className="user-div">
              <p className="user-name m-0 ms-3">
                {firstName} {lastName}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
