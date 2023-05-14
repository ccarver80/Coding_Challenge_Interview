import { useForm } from "react-hook-form";
import { Header } from "../../Main";
import { TextInput } from "../../common";
import styles from './styles.module.css'

export const Dashboard = () => {
  const { register, handleSubmit } = useForm();

  
  return(
    <>
    <div className={styles.dashboard}>
       <Header pageTitle={"Dashboard"}/>
    
    <div className={styles.dashboard__main}>
     <div>
      
      <label>Search for books: </label>
      <input type="text" />
     </div>
    </div>
    </div>
   
    
    </>
  )
};
