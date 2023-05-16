import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../Main";
import { GETAPI, API_URL } from "../../common";
import profile from "../../static/imgs/profileDefault.png";
import styles from "./styles.module.css";
import { EditProfile } from "./modal";
import { BookModal } from "./bookModal/bookModal";

export const Profile = () => {
  const [user, setUser] = useState();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isBookModalOpen, setBookModalOpen] =useState(false)

  const [bookInfo, setBookInfo] = useState()
  const [formInput, setFormInput] = useState();
  const [placeholder, setPlaceHolder] = useState();
  const [update, setUpdate] = useState();
  const [library, setLibrary] = useState();

  const id = window.sessionStorage.getItem("id");
  useEffect(() => {
    const post = GETAPI(`${API_URL}users/user/${id}`).then((res) =>
      setUser(res)
    ); 
    const books = GETAPI(`${API_URL}library/books/${id}`).then((res) => setLibrary(res))
  }, [update]);

  return (
    <>
      <Header pageTitle={"Profile"} />
      <div className={styles.profile}>
        {user ? (
          <>
            <div className={styles.profile__card}>
              <div className="flex flex-col">
                <h2 className="mt-5 mb-5 text-4xl font-bold">
                  {user.username}
                </h2>
                <div className="flex flex-col">
                  {user.profilePic ? (
                    <img src={user.profilePic} alt="Profile Picture" />
                  ) : (
                    <img src={profile} alt="Profile Picture" />
                  )}
                  <button onClick={() => setModalOpen(true)}>
                    Upload Profile Picture
                  </button>
                </div>
              </div>

              <div className={styles.profile__card__info}>
                <h2>
                  <b>Location:</b>
                  <p className="mx-auto text-xl">{user.location}</p>
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setFormInput("location");
                      setPlaceHolder(user.location);
                    }}
                  >
                    Edit Location
                  </button>
                </h2>

                <h2>
                  <b>Bio:</b>
                  <p className="text-base">{user.bio}</p>
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setFormInput("bio");
                      setPlaceHolder(user.bio);
                    }}
                  >
                    Edit bio
                  </button>
                </h2>

                <h2>
                  <b>Hobbies:</b> {user.hobbies}
                  <button
                    onClick={() => {
                      setModalOpen(true);
                      setFormInput("hobbies");
                      setPlaceHolder(user.hobbies);
                    }}
                  >
                    Edit hobbies
                  </button>
                </h2>
              </div>
            </div>
            <div className={styles.profile__activities}>
              <div className={styles.profile__activity}>
                <h2 className="text-4xl">Recent User Activity</h2>
                {user.posts[0] ? (
                  <>
                    <h3 className="mt-2 text-2xl">Latest Post:</h3>
                    <p>
                      <Link to={`/forum/post/${user.posts[0].rec_id}`}>
                        {user.posts[0].title}
                      </Link>
                    </p>
                  </>
                ) : (
                  <p>"No recent posts yet."</p>
                )}
                {user.comments[0] ? (
                  <>
                    <h3 className="mt-5 text-2xl">Latest Comment:</h3>
                    <p>
                      <Link to={`/forum/post/${user.comments[0].postid}`}>
                        {user.comments[0].comment}
                      </Link>
                    </p>
                  </>
                ) : (
                  <p>"No recent Comments yet."</p>
                )}
              </div>

              <div className="flex flex-col w-3/4 mx-auto h-3/4">
                <h2 className="mx-auto mt-10 text-4xl font-bold">
                  My Library
                </h2>
                <div className={styles.profile__books}>
                  {library
                    ? library.map((book) => {
                  return (
                    <div className={styles.profile__book}>
                      <img
                        className="border border-black rounded-xl"
                        onClick={() => {
                          setBookModalOpen(true);
                          setBookInfo(book);
                        }}
                        src={book.image}
                        alt="Image of book"
                      />
                      <h3>Rating: {book.rating}/10</h3>
                      <h3 className="mt-5">Review:</h3>
                      <p>{book.review}</p>
                    </div>
                  );
                })
              : ""}
          </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
        <EditProfile
          formInput={formInput}
          isModalOpen={isModalOpen}
          closeModal={() => setModalOpen(false)}
          placeholder={placeholder}
          setUpdate={setUpdate}
        />

        <BookModal isModalOpen={isBookModalOpen} closeModal={() => setBookModalOpen(false)} bookInfo={bookInfo} setUpdate={setUpdate} />
      </div>
    </>
  );
};
