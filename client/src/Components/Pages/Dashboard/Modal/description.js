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
import upArrow from "../../../static/imgs/upArrow.png"
import downArrow from '../../../static/imgs/downArrow.png'
import styles from "./styles.module.css";
import { Link } from "react-router-dom";

export const Description = ({ bookInfo, isModalOpen, closeModal }) => {
  const { register, handleSubmit } = useForm();

  const addToLibrary = async (data) => {
    console.log(data)
    data.user_id = window.sessionStorage.getItem("id");

    const res = await CallAPI(`${API_URL}library/add`, "POST", data);
    
    if (res.message) {
      toast.success(res.message, Toast);
      closeModal();
    }
    else{
        toast.error("Sorry there was a problem on the server", Toast)
        closeModal()
    }
  }; 
  
  let ranking = "---"
  if(bookInfo){
 
  if(bookInfo.rank > bookInfo.rank_last_week && bookInfo.rank_last_week > 0){
    ranking = <img className="flex h-10" src={downArrow}/>
  }
  if(bookInfo.rank < bookInfo.rank_last_week){
    ranking = <img className="flex h-14" src={upArrow} />
  }
}
  
  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="1000px">
      <div className={styles.description}>
        {bookInfo ? (
          <>
            <h3>About {bookInfo.title}</h3>
            <h3>By: {bookInfo.author}</h3>
            <div className="flex w-fit mx-auto">
            <h3 className="flex w-fit">Rank: {bookInfo.rank} </h3>
            {ranking}
            
            </div>
            <h3>Rank Last Week: {bookInfo.rank_last_week}</h3>
            <img className=" h-1/4 w-1/4 mx-auto" src={bookInfo.book_image}/>
            <p>{bookInfo.description}</p> 
            <button onClick={() => addToLibrary(bookInfo)}>Add to library</button>
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
