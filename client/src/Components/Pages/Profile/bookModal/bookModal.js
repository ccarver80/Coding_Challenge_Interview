import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Modal,
  TextInput,
  CallAPI,
  API_URL,
  Toast,
  TextArea,
} from "../../../common";
import styles from "./styles.module.css";

export const BookModal = ({ bookInfo, isModalOpen, closeModal }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    data.user_id = window.sessionStorage.getItem("id");
    data.book_id = bookInfo.rec_id
    const res = await CallAPI(`${API_URL}library/update`, "PUT", data);

    if (res.message) {
      toast.success(res.message, Toast);
      closeModal();
    } else {
      toast.error("Sorry there was a problem on the server", Toast);
      closeModal();
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="1000px">
      <div className={styles.description}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            type="number"
            max="10"
            register={register}
            label="Rating out of 10"
            name="rating"
          />
          <TextArea
            register={register}
            label="Write a review"
            rows="5"
            name="review"
          />
          <button>Submit</button>
        </form>
      </div>
    </Modal>
  );
};
