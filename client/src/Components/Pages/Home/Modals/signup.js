import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import bycrypt from "bcryptjs";
import {
  Modal,
  TextInput,
  CheckBox,
  Toast,
  CallAPI,
  API_URL,
} from "../../../common";
import styles from "./styles.module.css";

export const SignupModal = ({ user, isModalOpen, closeModal }) => {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    if (data.password === data.password2 && data.password.length >= 8) {
      const salt = bycrypt.genSaltSync(10);
      const hash = bycrypt.hashSync(data.password, salt);
      data.password = hash;
      if (data.email === "") {
        delete data.email;
      }
      const res = await CallAPI(`${API_URL}users/signup`, "POST", data);
      if (res.token) {
        toast.success(res.message, Toast);
        closeModal();
        sessionStorage.setItem("token", res.token);
        sessionStorage.setItem("username", res.user_name);
        sessionStorage.setItem("id", res.user_id);
        nav("/dashboard");
      } else if (res.error) {
        toast.error(
          `Sorry that ${res.error[0]} already exists or theres a problem with it, Please try a different one.`,
          Toast
        );
      } else {
        toast.error(
          "Sorry there was a issue with the server please try again later.",
          Toast
        );
      }
    } else {
      if (data.password !== data.password2) {
        toast.error(
          "Sorry your passwords don't match, please try again",
          Toast
        );
      } else if (data.password.length !== 10) {
        toast.error("Passwords must be at least characters long");
      }
    }
  };

  return (
    <>
      <Modal isModalOpen={isModalOpen} maxWidth="800px" closeModal={closeModal}>
        <div className={styles.signup}>
          <div className={styles.signup__header}>
            <h3>
              <b>
                Sign up for <u>free</u> today!
              </b>
            </h3>
          </div>
          <div className={styles.signup__form}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextInput
                register={register}
                name="username"
                label="Create A Username *"
                required
                placeholder="johndoe89"
              />
              <TextInput
                register={register}
                name="password"
                type="Password"
                label="Create A Password *"
                required
                placeholder="************"
              />
              <TextInput
                register={register}
                name="password2"
                type="password"
                label="Type password again *"
                required
                placeholder="**************"
              />
              <TextInput
                register={register}
                name="email"
                type="email"
                label="Valid Email Address* (required for account recovery)"
                placeholder="john_doe_3@emaildomain.com"
                required
              />
              <CheckBox
                label="Opt in for email updates"
                name="opt_in"
                value={true}
                register={register}
              />
              <button className={styles.signup__button} type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
};
