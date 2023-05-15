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
import { Link } from "react-router-dom";

export const Description = ({ bookInfo, isModalOpen, closeModal }) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const res = await CallAPI(`${API_URL}forum/post/comment`, "POST", data);

    if (res.rec_id) {
      toast.success("Post created", Toast);
      closeModal();
    }
  };
  console.log(bookInfo);
  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="1000px">
      <div className={styles.description}>
        {bookInfo ? (
          <>
            <h3>About {bookInfo.title}</h3>
            <h3>By: {bookInfo.author}</h3>
            <img className=" h-1/4 w-1/4 mx-auto" src={bookInfo.book_image}/>
            <p>{bookInfo.description}</p> 
            <button>Add to library</button>
            <h3>Buy here:</h3>
            {bookInfo.buy_links.map((link) => {
              return (
                <Link className="mx-auto text-blue-900 underline" to={link.url}>
                  {link.name}
                </Link>
              );
            })}
          </>
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
};
