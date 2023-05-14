import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../Main";
import { GETAPI, API_URL } from "../../common";
import profile from "../../static/imgs/profileDefault.png";

import styles from "./styles.module.css";
import { useParams } from "react-router-dom";

export const PublicProfile = () => {
  const [user, setUser] = useState();

  const id = useParams();
  useEffect(() => {
    const post = GETAPI(`${API_URL}users/user/${id.id}`).then((res) =>
      setUser(res)
    );
  }, []);

  return (
    <>
      <div className={styles.profile}>
        {user ? (
          <>
            <Header pageTitle={`Profile of ${user.username}`} />
            <div className="flex gap-5">
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
                  </div>
                </div>

                <div className={styles.profile__card__info}>
                  <h2>
                    <b>Location:</b>{" "}
                    <p className="mx-auto text-xl">{user.location}</p>
                  </h2>
                  <h2>
                    <b>Bio:</b>
                    <p className="text-base">{user.bio}</p>
                  </h2>
                  <h2>
                    <b>Hobbies:</b> {user.hobbies}
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

                <div className="flex flex-col">
                  <h2 className="mx-auto mt-10 text-4xl font-bold">
                    My Library
                  </h2>
                </div>
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
};
