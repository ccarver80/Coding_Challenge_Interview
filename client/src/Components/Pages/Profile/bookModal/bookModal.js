import { useEffect, useState } from "react";
import { set, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  Modal,
  TextInput,
  CallAPI,
  API_URL,
  Toast,
  TextArea,
  GETAPI,
} from "../../../common";
import styles from "./styles.module.css";


export const BookModal = ({ bookInfo, isModalOpen, closeModal, setUpdate}) => {
  const { register, handleSubmit } = useForm();
  const [book, setBook] = useState()

  if(bookInfo){
    
    const book= GETAPI(`${API_URL}library/book/${bookInfo.rec_id}`).then((res) => setBook(res))
  
  }
  
  
  const onSubmit = async (data) => {
    data.user_id = window.sessionStorage.getItem("id");
    data.book_id = bookInfo.rec_id;
    const res = await CallAPI(`${API_URL}library/update`, "PUT", data);
    if (res.status === 201) {
      toast.success(res.message, Toast);
      closeModal();
      setUpdate(data)
    } else if (res.status === 400) {
      toast.error(res.message, Toast);
    } else {
      toast.error("Sorry there was a problem on the server", Toast);
      closeModal();
    }
  };
  console.log(book)
  return (
    
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="1000px">
      <div className={styles.description}>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <img className="mx-auto" src={bookInfo ? bookInfo.image : ''} alt="Photo of book" /> */}
          <div className="w-1/4 mx-auto">
          <TextInput
            type="number"
            max="10"
            register={register}
            label="Rating out of 10"
            name="rating"
            defaultValue={bookInfo ? bookInfo.rating : ''}
          />
          <TextArea
            register={register}
            label="Write a review"
            rows="5"
            name="review"
            // placeholder={bookInfo ? bookInfo.review : ''}
          />
          <button>Submit</button></div>
        </form>
      </div>
    </Modal>
  );
};
