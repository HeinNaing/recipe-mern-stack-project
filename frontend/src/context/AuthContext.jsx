import { createContext, useEffect, useReducer } from "react";
import axios from "../helpers/axios";
const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  const AuthReducer = (state, action) => {
    switch (action.type) {
      case "LOGIN":
        // localStorage.setItem("user", JSON.stringify(action.payload));
        console.log(action.payload);
        return { user: action.payload };
      case "LOGOUT":
        return { user: null };
      default:
        return state;
    }
  };
  let [state, dispatch] = useReducer(AuthReducer, { user: null });
  useEffect(() => {
    axios
      .get("/api/user/me", { withCredentials: true })
      .then((res) => {
        const userData = res.data; // only the actual user object
        if (userData) {
          dispatch({ type: "LOGIN", payload: userData });
        } else {
          dispatch({ type: "LOGOUT" });
        }
      })
      .catch((e) => {
        dispatch({ type: "LOGOUT" });
      });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContext, AuthContextProvider };
