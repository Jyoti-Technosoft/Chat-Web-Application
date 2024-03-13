import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";
import socket from "../Util/webSocketHelper";

import * as constants from "../Util/constant";

export const ShowContext = createContext();

export const ContextProvider = (props) => {
  const [userArr, setUserArr] = useState([]);
  const [currentUserObj, setCurrentUserObj] = useState({});
  const [showUserAccount, setShowUserAccount] = useState(false);
  const [showToast, setShowToast] = useState({});
  const [loggedUserList, setLoggedUserList] = useState([]);
  const [toggleTheme, setToggleTheme] = useState(false);
  const token = Cookies.get("token");
  let loggedUserId;
  let decodeToken;
  if (token) {
    decodeToken = jwtDecode(token);
    loggedUserId = decodeToken.id;
  }

  useEffect(() => {
    const body = document.querySelector("body");

    let theme = localStorage.getItem("chat-app-theme");

    if (!theme) {
      localStorage.setItem("chat-app-theme", "light");
    } else if (theme != "light" && theme != "dark") {
      localStorage.setItem("chat-app-theme", "light");
    }

    if (theme == "dark") {
      body.classList.add("dark-theme");
      setToggleTheme(true);
    } else if (theme == "light") {
      body.classList.remove("dark-theme");
      setToggleTheme(false);
    } else {
      body.classList.remove("dark-theme");
    }
  }, []);

  useEffect(() => {
    if (loggedUserId) {
      socket.emit(constants.SET_USER_STATUS_ACTIVE, loggedUserId);

      socket.on(constants.EMIT_ONLINE_USER_LIST, (data) => {
        setLoggedUserList(data);
      });
    }
  }, [loggedUserId]);

  return (
    <>
      <ShowContext.Provider
        value={{
          userArr,
          setUserArr,
          currentUserObj,
          setCurrentUserObj,
          showUserAccount,
          setShowUserAccount,
          showToast,
          setShowToast,
          token,
          decodeToken,
          loggedUserId,
          loggedUserList,
          setLoggedUserList,
          toggleTheme,
          setToggleTheme,
        }}
      >
        {props.children}
      </ShowContext.Provider>
    </>
  );
};
