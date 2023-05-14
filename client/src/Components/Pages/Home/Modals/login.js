import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Modal, TextInput, CallAPI, API_URL, Toast } from "../../../common";
import styles from "./styles.module.css";

export const LoginModal = ({ isModalOpen, closeModal }) => {
  const { register, handleSubmit } = useForm();
  const nav = useNavigate();

  const onSubmit = async (data) => {
    const encodedCreds = btoa(`${data.username}:${data.password}`);
    data = { username: data.username };
    const res = await CallAPI(
      `${API_URL}users/login`,
      "POST",
      data,
      encodedCreds
    );

    if (res.token) {
      closeModal();
      sessionStorage.setItem("token", res.token);
      sessionStorage.setItem("username", res.user_name);
      sessionStorage.setItem("id", res.user_id);
      nav("/dashboard");
    } else {
      toast.error(res.message, Toast);
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="800px">
      <div className={styles.login}>
        <div className={styles.login__header}>
          <h3>Log In</h3>
        </div>
        <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            register={register}
            name="username"
            label="Username"
            required
          />
          <TextInput
            register={register}
            name="password"
            type="password"
            label="Password"
            required
          />
          <button className={styles.login__button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};
