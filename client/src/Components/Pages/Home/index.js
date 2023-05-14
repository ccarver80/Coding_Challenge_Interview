import styles from "./styles.module.css";
import logo from "../../static/imgs/bookClub.png";
import fourm from "../../static/imgs/fourm.png";
import bestSeller from "../../static/imgs/bestSeller.png";
import bookCase from "../../static/imgs/bookCase.png";
import { SignupModal } from "./Modals/signup";
import { useState } from "react";
import { LoginModal } from "./Modals/login";
import { useNavigate } from "react-router-dom";

export const Home = ({ user }) => {
  const [isSignUpModalOpen, setSignUpModalOpen] = useState(false);
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const nav = useNavigate();
  const loginButton = () => {
    if (window.sessionStorage.getItem("token")) {
      nav("/dashboard");
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <>
     <img className={styles.home__logo} src={logo} alt="book club logo" />
      <div className={styles.home}>
        <button onClick={loginButton} className={styles.home__logInButton}>
          Log In
        </button>

        <div className={styles.home__header}>
          <div className={styles.home__title}>
            <h1>The Book Club Community</h1>
            <h2>
              Where <u>Social Media</u> and <u>Software</u> meets{" "}
              <u>Book Club</u>
            </h2>
          </div>
        </div>
        <button
          onClick={() => setSignUpModalOpen(true)}
          className={styles.home__signUpButton}
        >
          Sign up for free today
        </button>
        <div className={styles.home__panels}>
          <div className={styles.home__panel}>
            <h2>Social Media</h2>
            <p>
              Add members to your freinds list, Post to your wall, or browse an
              amazing forum.
            </p>
            <img
              className={styles.home__image}
              src={fourm}
              alt="Community form"
            />
          </div>
          <div className={styles.home__panel}>
            <h2>Search Best Sellers</h2>
            <p>Search for New York Times Best Sellers</p>
            <img
              className={styles.home__image}
              src={bestSeller}
              alt="Best Seller Logo"
            />
          </div>
          <div className={styles.home__panel}>
            <h2>Add to your library</h2>
            <p>
              Add a book you have read to your library and leave a comment and review for everyone to see!
            </p>
            <img
              className={styles.home__image}
              src={bookCase}
              alt="Image of book case"
            />
          </div>
        </div>
      </div>
      <LoginModal
        isModalOpen={isLoginModalOpen}
        closeModal={() => setLoginModalOpen(false)}
      />
      <SignupModal
        isModalOpen={isSignUpModalOpen}
        closeModal={() => setSignUpModalOpen(false)}
      />
    </>
  );
};
