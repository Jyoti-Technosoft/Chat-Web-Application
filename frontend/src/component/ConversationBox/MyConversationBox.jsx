import { useEffect, useState } from "react";

import "./ConversationBox.scss";

function MyConversationBox(props) {
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
      <div className="my-box-container d-flex justify-content-end">
        <div
          className={`${
            isEmoji
              ? "card emoji-my-msg-box border-0"
              : "card my-message-box border-0"
          }`}
        >
          <div
            className={`${
              isEmoji ? "emoji-my-message" : "card-body my-message"
            } `}
          >
            <p className={`${isEmoji ? "emoji-my-message-text" : `card-text`}`}>
              {props?.message}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyConversationBox;