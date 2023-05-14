import { Link } from "react-router-dom";
import styles from "./styles.module.css";


export const Navigation = ({ currentPage }) => {
  const navLabels = ["Dashboard", "Forum", "Profile"];

  const navList = [];
  navLabels.forEach((label) => {
    if (currentPage === label) {
      navList.push(
        <Link className="underline bg-blue-200" to={`/${label}`}>
          {label}
        </Link>
      );
    } else {
      navList.push(<Link to={`/${label}`}>{label}</Link>);
    }
  });
  return (
    <div className={styles.navigation}>
      <nav>{navList}</nav>
    </div>
  );
};
