import { Header } from "../../../Main/Header";
import { useParams, useNavigate, Link } from "react-router-dom";
import { CallAPI, GETAPI, API_URL, Toast, Table } from "../../../common";
import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import { toast } from "react-toastify";
import { AddPost } from "./Modal/addPost";

export const Topics = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [topics, setTopics] = useState();
  const [post, setPost] = useState();
  const [catagory, setCatagory] = useState();
  const cat_id = useParams();
  const nav = useNavigate();

  useEffect(() => {
    const topics = GETAPI(`${API_URL}forum/topics/${cat_id.id}`).then((res) =>
      setTopics(res)
    );
    const name = GETAPI(`${API_URL}forum/catagory/${cat_id.id}`).then((res) => {
      setCatagory(res);
    });
  }, [post]);

  const onSubmit = async (data) => {
    data.authorid = window.sessionStorage.getItem("id");
    data.catagory_id = cat_id.id;

    const res = await CallAPI(`${API_URL}forum/post`, "POST", data);

    if (res.rec_id) {
      setPost("Post Made");
      toast.success("Post created", Toast);
    }
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "#",
        accessor: "rec_id",
      },
      {
        Header: "Post",
        accessor: "title",
        Cell: ({ row }) => (
          <>
            <Link
              className="text-blue-500 underline"
              to={`/forum/post/${row.values.rec_id}`}
            >
              {row.values.title}
            </Link>

            <p>
              {row.original.content.slice(0, 100)}
              {row.original.content.length >= 100 ? "....." : ""}
            </p>
          </>
        ),
      },
      {
        Header: "Author",
        accessor: "author.username",
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
        Header: "Date Posted",
        accessor: "createdAt",
      },
    ],
    []
  );

  return (
    <>
      <Header pageTitle="Forum" />
      <div className={styles.topics}>
        <div className={styles.topics__header}>
          {catagory ? (
            <>
              <h1>{catagory.name}</h1>
              <p className="mx-auto text-xl text-center">
                {catagory.description}
              </p>
            </>
          ) : (
            ""
          )}
        </div>
        <div className={styles.topics__addButton}>
          <button onClick={() => nav("/forum")}>Go Back</button>
          <button onClick={() => setModalOpen(true)}> + Create A Post</button>
        </div>

        <div className={styles.topics__topics}>
          {topics ? <Table columns={columns} data={topics} /> : ""}
        </div>

        <AddPost
          cat_id={cat_id}
          isModalOpen={isModalOpen}
          setPost={setPost}
          closeModal={() => setModalOpen(false)}
        />
      </div>
    </>
  );
};
