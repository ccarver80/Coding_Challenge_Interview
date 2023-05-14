import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { GETAPI, API_URL, Table } from "../../../common";
import { Header } from "../../../Main";
import { AddComment } from "./Modal/addComment";
import styles from "./styles.module.css";

export const Posts = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [comment, setComment] = useState();
  const [isModalOpen, setModalOpen] = useState();
  const cat_id = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const post = GETAPI(`${API_URL}forum/post/${cat_id.id}`).then((res) =>
      setPost(res)
    );
    const comments = GETAPI(`${API_URL}forum/post/comments/${cat_id.id}`).then(
      (res) => setComments(res)
    );
  }, [comment]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Comment",
        accessor: "comment",
      },

      {
        Header: "Posted By",
        Cell: ({ row }) => (
          <Link
            className="text-blue-500 underline"
            to={`/profile/${row.original.author.rec_id}`}
          >
            {row.original.author.username}
          </Link>
        ),
      },
      {
        Header: "At",
        accessor: "createdAt",
      },
    ],
    []
  );

  return (
    <>
      <Header pageTitle={"Forum"} />
      <div className="h-screen">
        <div className={styles.post}>
          {post ? (
            <>
              <h1>{post.title}</h1>
              <p>{post.content}</p>
            </>
          ) : (
            ""
          )}
        </div>
        <div className={styles.post__buttonComment}>
          <button onClick={() => nav(`/forum/catagory/${post.catagory_Id}`)}>
            Go Back
          </button>
          <button onClick={() => setModalOpen(true)}>Add A Comment</button>
        </div>
        <div className={styles.post__comments}>
          <h2 className="mb-5 text-2xl font-bold">Comments:</h2>

          {comments ? <Table columns={columns} data={comments} /> : ""}
        </div>

        <AddComment
          cat_id={cat_id}
          isModalOpen={isModalOpen}
          setComment={setComment}
          closeModal={() => setModalOpen(false)}
        />
      </div>
    </>
  );
};
