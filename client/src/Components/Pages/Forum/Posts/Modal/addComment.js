import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Modal,
  TextInput,
  CallAPI,
  API_URL,
  Toast,
  TextArea,
} from "../../../../common";
import styles from "./styles.module.css";

export const AddComment = ({ cat_id, isModalOpen, closeModal, setComment }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    data.authorid = window.sessionStorage.getItem("id");
    data.postid = cat_id.id;

    const res = await CallAPI(`${API_URL}forum/post/comment`, "POST", data);

    if (res.rec_id) {
      setComment(data);
      toast.success("Post created", Toast);
      closeModal();
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="800px">
      <div className={styles.login}>
        <div className={styles.login__header}>
          <h3>Add A Comment: </h3>
        </div>
        <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
          <TextArea
            register={register}
            name="comment"
            label="Comment"
            rows={"10"}
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
