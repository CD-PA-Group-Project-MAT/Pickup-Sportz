import { useState} from "react";
import NotificationContext from "./NotificationContext";

const NotificationProvider = (props) => {
  const [notifications, setNotifications] = useState([]); 

  return (
    <NotificationContext.Provider value= {{ notifications, setNotifications}}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationProvider;