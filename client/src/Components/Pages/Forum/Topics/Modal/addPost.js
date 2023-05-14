import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
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

export const AddPost = ({ cat_id, isModalOpen, closeModal, setPost }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    data.authorid = window.sessionStorage.getItem("id");
    data.catagory_id = cat_id.id;

    const res = await CallAPI(`${API_URL}forum/post`, "POST", data);

    if (res.rec_id) {
      setPost(data);
      toast.success("Post created", Toast);
      closeModal();
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="800px">
      <div className={styles.login}>
        <div className={styles.login__header}>
          <h3>Make A Post: </h3>
        </div>
        <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
          <TextInput register={register} name="title" label="Title" required />
          <TextArea
            register={register}
            name="content"
            label="Content"
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
