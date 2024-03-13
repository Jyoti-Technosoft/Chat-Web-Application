import { useContext } from "react";
import { useParams } from "react-router-dom";
import { ShowContext } from "../Context/Context";
import UsersList from "../UsersList/UsersList";
import SideBar from "../Sidebar/SideBar";

function NoChatSelected() {
  const { userId } = useParams();

  const { toggleTheme } = useContext(ShowContext);

  return (
    <>
      <div className="web-box row">
        <div className={`sidebar ${userId ? "hide-sidebar" : "show-sidebar"}`}>
          <SideBar />
        </div>
        <div
          className={`user-list custom-background-user list-on ${
            userId ? "list-off" : "list-on"
          }`}
        >
          <UsersList />
        </div>
        <div className={`container scrollbar chat-on user-chat`}>
          <div className="d-flex justify-content-center align-items-center h-100 chatbox-container container">
            {toggleTheme ? null : (
              <img src="src/assets/images/NoChatSelectedGif.gif" alt="Logo" />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default NoChatSelected;