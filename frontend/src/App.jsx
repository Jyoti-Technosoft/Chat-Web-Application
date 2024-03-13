import { useParams } from "react-router-dom";
import ShowUsersChat from "./component/ShowUsersChat/ShowUsersChat";
import UsersList from "./component/UsersList/UsersList";
import SideBar from "./component/Sidebar/SideBar";

import "./App.scss";

function App() {
  let { userId } = useParams();

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
        <div className={`p-0 user-chat ${userId ? "chat-on" : "chat-off"}`}>
          {userId ? <ShowUsersChat /> : null}
        </div>
      </div>
    </>
  );
}

export default App;
