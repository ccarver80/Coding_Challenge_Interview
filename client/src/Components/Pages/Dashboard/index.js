import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { Header } from "../../Main";
import {
  CallAPI,
  API_URL,
  Toast,
  GETAPI,
  Select,
} from "../../common";
import styles from "./styles.module.css";
import { useEffect } from "react";
import { Description } from "./Modal/description";

export const Dashboard = () => {
  const { register, handleSubmit } = useForm();
  const [buttons, setButtons] = useState();
  const [books, setBooks] = useState();
  const [isModalOpen, setModalOpen] = useState(false)
  const [bookInfo, setBookInfo] = useState()

  let options = [];
  useEffect(() => {
    const res = GETAPI(`${API_URL}library/buttons`).then((res) =>
      setButtons(res.results)
    );
  }, []);

  const onSubmit = async (data) => {
    setBooks();
    const res = await CallAPI(`${API_URL}library/search`, "POST", data);
    if (res.results) {
      setBooks(res.results.books);
      toast.success(res.message, Toast);
    }
  };

  return (
    <>
      <div className={styles.dashboard}>
        <Header pageTitle={"Dashboard"} />

        <div className={styles.dashboard__main}>
          <div className="flex flex-col">
                <div className="mx-auto mb-5"><form onSubmit={handleSubmit(onSubmit)}>
              {buttons
                ? buttons.map((button) => {
                    options.push({
                      name: button.list_name,
                      value: button.list_name_encoded,
                    });
                  })
                : ""}
            
              <Select
                register={register}
                label="Pick A Catagory"
                name="button"
                options={options}
              />
              <button className="bg-blue-500 p-2 rounded-xl w-fit mt-2 text-white" type="submit">Seach NYT Best Sellers List</button>
            </form></div>
            <div className="grid grid-cols-5 gap-2">  
            
              {books
                ? books.map((book) => {
                    return (
                    
                      <div className="flex flex-col ">
                        <img className="border border-black rounded-xl" onClick={() => {setModalOpen(true); setBookInfo(book)}} src={book.book_image} alt="Image of book" />
                        
                      </div>
                    );
                  })
                : ""}
            </div>
          </div>
        </div>
        <Description isModalOpen={isModalOpen} closeModal={() => setModalOpen(false)} bookInfo={bookInfo}/>
      </div>
    </>
  );
};
