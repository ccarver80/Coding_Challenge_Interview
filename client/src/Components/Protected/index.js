import { useNavigate, Navigate, Outlet } from "react-router-dom";
import { CallAPI, API_URL } from "../common";

export const Protected = ({ children }) => {
  const token = window.sessionStorage.getItem("token");
  const nav = useNavigate();

  // If there is a token
  if (token) {
    //If there is a token Verify its valid
    const data = { token: token };
    // api call to verify token is valid
    const verify = async () => {
      try {
        await CallAPI(`${API_URL}users/verify`, "POST", data);
      } catch (err) {
        window.sessionStorage.clear()
        nav("/");
      }
    };
    verify();
    return <Outlet />;
  }
};
