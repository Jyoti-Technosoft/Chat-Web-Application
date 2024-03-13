import { useEffect, useState } from "react";

import "./ConversationBox.scss";

function OtherConversationBox(props) {
  const [isEmoji, setIsEmoji] = useState(false);

  useEffect(() => {
    const regex = /^\p{Extended_Pictographic}{1,2}$/gu;
    const userMsg = props?.message;

    const typeOfMsg = regex.test(userMsg);

    if (typeOfMsg) {
      setIsEmoji(true);
    }
  }, []);

  return (
    <>
      <div className="other-message">
        <div
          className={`${
            isEmoji
              ? "card emoji-other-msg-box"
              : `card other-message-box other-message-box-bg-light`
          }`}
        >
          <div
            className={`${
              isEmoji ? "emoji-other-message" : "card-body message"
            } `}
          >
            <p
              className={`${
                isEmoji ? "emoji-other-message-text" : `card-text`
              }`}
            >
              {props?.message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default OtherConversationBox;