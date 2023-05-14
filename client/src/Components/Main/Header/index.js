import { useNavigate } from "react-router-dom";
import logo from "../../static/imgs/bookClub.png"
import styles from "./styles.module.css";
import { Navigation } from "../Navigation";

export const Header = ({pageTitle}) => {
  const w = window.sessionStorage
  const nav = useNavigate()
  const logout = () =>{
    window.sessionStorage.clear()
    nav('/')
  }

  return (
    <>
    <div className={styles.header}>
    <div className={styles.header__logo}>
      <img className="h-20" src={logo} alt="Book Club Logo" />
      <h1 className="my-auto ml-2 text-4xl">Book Club Community</h1>
    
    </div>
      <div className={styles.header__title}>
        <h1>{pageTitle}</h1>
      </div>
      <div className={styles.header__login}>
        <p>Welcome, {w.username}</p>
        <button onClick={logout} className="bg-blue-200 hover:bg-pink-200 p-2 rounded-xl mx-auto">Logout</button>
      </div>
    </div>
    <Navigation currentPage={pageTitle} /></>
  );
};
