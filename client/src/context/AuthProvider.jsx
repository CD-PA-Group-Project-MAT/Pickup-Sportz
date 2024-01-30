import { useState} from "react";
import AuthContext from "./AuthContext";

const AuthProvider = (props) => {
  const [auth, setAuth] = useState({});

  return (
    <AuthContext.Provider value= {{ auth, setAuth}}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthProvider;