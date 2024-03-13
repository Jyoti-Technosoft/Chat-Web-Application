import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, OverlayTrigger, Popover } from "react-bootstrap";
import { ShowContext } from "../Context/Context";
import CustomModel from "../CustomModel/LogoutModel";
import ProfileModel from "../CustomModel/ProfileModel";
import chatIcon from "../../assets/icons/chat-icon.svg";
import chatIconSelected from "../../assets/icons/chat-icon-selected.svg";
import themeIcon from "../../assets/icons/moon-theme-icon.svg";
import profileIcon from "../../assets/icons/person-icon.svg";
import settingIcon from "../../assets/icons/setting-icon.svg";
import logoutIcon from "../../assets/icons/logout-icon.svg";
import sunThemIcon from "../../assets/icons/sun-icon.svg";

import "./SideBar.scss";

const SideBar = () => {
  const [logoutModal, setlogoutModal] = useState(false);
  const [profileModal, setProfileModel] = useState(false);
  const { toggleTheme, setToggleTheme } = useContext(ShowContext);

  const { userId } = useParams();

  const navigate = useNavigate();

  const popoverFocus = (
    <Popover id="popover-trigger-click-root-close" className="pop-over">
      <div role="button" onClick={() => setlogoutModal(true)}>
        <div className="d-flex align-items-center">
          <span>Logout</span>
          <img className="ms-2" src={logoutIcon} alt="" />
        </div>
      </div>
    </Popover>
  );

  const changeTheme = () => {
    const body = document.querySelector("body");
    let theme = localStorage.getItem("chat-app-theme");

    if (theme == "dark") {
      localStorage.setItem("chat-app-theme", "light");
      body.classList.remove("dark-theme");
    } else if (theme == "light") {
      localStorage.setItem("chat-app-theme", "dark");
      body.classList.add("dark-theme");
    }
    setToggleTheme(!toggleTheme);
  };

  const openNoChat = () => {
    navigate("/chat");
  };

  return (
    <>
      <div className="h-100 d-flex align-items-center flex-column justify-content-between sidebar-header">
        <ul className="sidebar-items text-center">
          <li className={`text-white sidebar-list`}>
            <img
              onClick={openNoChat}
              className="sidebar-icon"
              src={userId ? chatIconSelected : chatIcon}
              alt="chat-icon"
            />
          </li>
          <li className={`text-white sidebar-list`}>
            <img
              className="sidebar-icon"
              src={toggleTheme ? sunThemIcon : themeIcon}
              alt="chat"
              onClick={changeTheme}
            />
          </li>
          <li className={`text-white sidebar-list`}>
            <img
              className="sidebar-icon"
              onClick={() => setProfileModel(true)}
              src={profileIcon}
              alt="chat"
            />
          </li>
          <li className={`text-white sidebar-list d-none setting-icon2`}>
            <OverlayTrigger trigger="click" rootClose overlay={popoverFocus}>
              <Button className="bg-transparent border-0">
                <img className="sidebar-icon" src={settingIcon} alt="chat" />
              </Button>
            </OverlayTrigger>
          </li>
        </ul>
        <ul className="sidebar-items2">
          <li className={`text-white sidebar-list setting-icon`}>
            <OverlayTrigger trigger="click" rootClose overlay={popoverFocus}>
              <Button className="bg-transparent border-0">
                <img className="sidebar-icon" src={settingIcon} alt="chat" />
              </Button>
            </OverlayTrigger>
          </li>
        </ul>
      </div>

      {logoutModal ? (
        <CustomModel show={logoutModal} onHide={() => setlogoutModal(false)} />
      ) : null}

      {profileModal ? (
        <ProfileModel
          show={profileModal}
          onHide={() => setProfileModel(false)}
        />
      ) : null}
    </>
  );
};

export default SideBar;
