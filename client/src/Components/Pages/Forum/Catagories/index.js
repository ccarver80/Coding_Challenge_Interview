import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../../Main/Header";
import { CallAPI, GETAPI, API_URL, Table } from "../../../common";
import styles from "./styles.module.css";

export const Forum = () => {
  const [catagories, setCatagories] = useState();
  useEffect(() => {
    GETAPI(`${API_URL}forum/catagories`).then((data) => setCatagories(data));
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Catagory",
        accessor: "name",
        Cell: ({ row }) => (
          <>
            <Link
              className="text-2xl text-blue-500 underline"
              to={`/forum/catagory/${row.original.rec_id}`}
            >
              {row.values.name}
            </Link>
            <p className="mt-2">{row.original.description}</p>
          </>
        ),
      },

      {
        Header: "Lastest Post",
        accessor: "topic[0].title",
      },
      {
        Header: "Posted By",
        Cell: ({ row }) => (
          <Link
            className="text-blue-500 underline"
            to={`/profile/${row.original.topic[0].author.rec_id}`}
          >
            {row.original.topic[0].author.username}
          </Link>
        ),
      },
      {
        Header: "Time",
        accessor: "topic[0].createdAt",
      },
    ],
    []
  );

  return (
    <>
      <div className={styles.forum}>
        <Header pageTitle={"Forum"} />
        <div className={styles.forum__header}>
          <h1>Catagories</h1>
        </div>

        <div className={styles.forum__catagories}>
          {catagories ? <Table columns={columns} data={catagories} /> : ""}
        </div>
      </div>
    </>
  );
};
