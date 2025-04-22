import { createContext } from "react";
const AuthContext = createContext();
const AuthContextProvider = ({ children }) => {
  let user = {
    name: "Hein Naing Aung",
  };
  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
export { AuthContext, AuthContextProvider };
