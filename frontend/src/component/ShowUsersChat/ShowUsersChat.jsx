import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ShowContext } from "../Context/Context";
import socket from "../Util/webSocketHelper";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import OtherConversationBox from "../ConversationBox/OtherConversationBox";
import MyConversationBox from "../ConversationBox/MyConversationBox";
import EmojiPicker from "emoji-picker-react";
import * as constants from "../Util/constant";
import apiClient from "../Util/axios";
import CapitalizeFirstLetter from "../CustomFunctions/CapatilizeFirstLetter";
import sendBtn from "../../assets/icons/send-btn.svg";
import backBtn from "../../assets/icons/back-btn.svg";
import backBtnLight from "../../assets/icons/back-btn-light.svg";
import ScrollToBottom from "react-scroll-to-bottom";

import "./ShowUsersChat.scss";

const ShowUsersChat = () => {
  const navigate = useNavigate();
  const [userMessgaes, setUserMessages] = useState([]);
  const {
    userArr,
    loggedUserId,
    token,
    currentUserObj,
    setCurrentUserObj,
    loggedUserList,
    toggleTheme,
  } = useContext(ShowContext);
  const { userId } = useParams();

  const headerRef = useRef();

  useEffect(() => {
    if (userId) {
      const currentUser = userArr?.find((val) => {
        return val._id === userId;
      });
      setCurrentUserObj(currentUser);
    }
  });

  useEffect(() => {
    if (userId) {
      socket.emit(constants.SET_CURRENT_CHAT, userId);
      getAllMessage();
    }
  }, [userId]);

  const setEmojiInChat = (value) => {
    userMsgInputFormik.setValues({
      message: userMsgInputFormik.values.message + value.emoji,
    });
  };

  const popover = (
    <Popover placement="top" id="popover-basic" className="emoji-popover">
      <EmojiPicker onEmojiClick={setEmojiInChat} emojiVersion="5.0" />
    </Popover>
  );

  const getAllMessage = () => {
    const params = {
      sender: loggedUserId,
      reciver: userId,
    };
    apiClient
      .get("./message", {
        params,
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserMessages(response.data.data);
      })
      .catch((error) => {});

    socket.on(constants.LISTEN_FOR_MESSAGE, (data) => {
      if (data.users.includes(userId) && data.users.includes(loggedUserId)) {
        setUserMessages((value) => [...(value || []), data]);
      }
    });
  };

  useEffect(() => {
    document
      .querySelector("#message")
      .addEventListener("keyup", function (event) {
        if (event.keyCode === 13) {
          sendUserMsg();
        }
      });
  }, []);

  const sendUserMsg = () => {
    const inputElement = document.getElementById("message");
    const msg = inputElement.value.trim();

    if (msg.length === 0) {
      return;
    }

    const data = {
      sender: loggedUserId,
      reciver: userId,
      message: msg,
    };
    socket.emit(constants.SEND_MESSAGE, data);

    clearForm();

    inputElement.focus();
  };

  function clearForm() {
    document.getElementById("message").value = "";
  }

  const showUserlist = () => {
    navigate("/chat");
  };

  return (
    <>
      <div className="chat-box-container">
        <div className="chat-box-header">
          <div className="header-chat-box" ref={headerRef}>
            <div className="user-details">
              <div className="other-user-div">
                <div className="other-user-icon d-flex justify-content-center align-items-center">
                  <h5 className="first-char-text mb-0">
                    {currentUserObj?.firstName && currentUserObj?.lastName
                      ? `${CapitalizeFirstLetter(
                          currentUserObj?.firstName
                        )}${CapitalizeFirstLetter(currentUserObj?.lastName)}`
                      : null}
                  </h5>
                </div>
                <p className={`other-user-name`}>
                  {currentUserObj?.firstName} {currentUserObj?.lastName}
                </p>
                <p
                  className={`${
                    loggedUserList.includes(userId)
                      ? "other-user-status-online"
                      : "other-user-status"
                  }`}
                >
                  {loggedUserList.includes(userId) ? `Online` : "Offline"}
                </p>
                {loggedUserList.includes(userId) ? (
                  <div className="status-circle"></div>
                ) : null}
              </div>
              <div className="back-btn" onClick={showUserlist}>
                <img
                  src={toggleTheme ? backBtnLight : backBtn}
                  alt=""
                  className="back-btn-img"
                />
              </div>
              <hr className="hr-line" />
            </div>
          </div>
        </div>
        <div className="chat-box-content">
          <ScrollToBottom
            initialScrollBehavior="smooth"
            className="message-chat-box"
            mode="bottom"
            followButtonClassName="invisible"
          >
            {userMessgaes?.map((val, index) => {
              if (val?.sender == loggedUserId) {
                return <MyConversationBox message={val?.message} key={index} />;
              } else {
                return (
                  <OtherConversationBox message={val?.message} key={index} />
                );
              }
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-box-footer">
          <div className="input-chat-box">
            <div className="message-div position-relative">
              <input
                type="text"
                name="message"
                id="message"
                className={`message-input border-0`}
                placeholder="Type your message..."
                autoComplete="off"
                autoFocus
                inputMode="text"
              />
              <button
                className="send-btn position-absolute border-0"
                type="button"
                onClick={sendUserMsg}
              >
                <img src={sendBtn} alt="" className="send-btn-img" />
              </button>
              <div className={`attach-btn position-absolute border-0`}>
                <OverlayTrigger
                  trigger="click"
                  placement="top"
                  rootClose
                  overlay={popover}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    className="bi bi-emoji-smile"
                    viewBox="0 0 16 16"
                    style={{ fill: `${toggleTheme ? "#ffffff" : "#000000"}` }}
                  >
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                    <path d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
                  </svg>
                </OverlayTrigger>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShowUsersChat;
