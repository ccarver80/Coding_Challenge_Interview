import { useForm } from "react-hook-form";
import {
  Modal,
  TextInput,
  CallAPI,
  API_URL,
  Toast,
  TextArea,
} from "../../../common";
import styles from "./styles.module.css";
import { toast } from "react-toastify";

export const EditProfile = ({
  isModalOpen,
  closeModal,
  formInput,
  placeholder,
  setUpdate,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const id = window.sessionStorage.getItem("id");
    data.id = id;

    const res = await CallAPI(`${API_URL}users/editProfile`, "PUT", data);
    if (res.message) {
      closeModal();
      setUpdate(data);
      toast.success(res.message, Toast);
    }
  };

  return (
    <Modal isModalOpen={isModalOpen} closeModal={closeModal} maxWidth="800px">
      <div className={styles.editProfile}>
        <form className={styles.login__form} onSubmit={handleSubmit(onSubmit)}>
          {formInput == "bio" ? (
            <TextArea
              register={register}
              name="bio"
              label="Bio:"
              rows="7"
              placeholder={placeholder}
            />
          ) : formInput == "location" ? (
            <TextInput
              register={register}
              name="location"
              label="Location"
              defaultValue={placeholder}
            />
          ) : formInput == "hobbies" ? (
            <TextInput
              register={register}
              name="hobbies"
              label="Hobbies:"
              defaultValue={placeholder}
            />
          ) : (
            <TextInput
              register={register}
              name="pic_upload"
              label="Upload Picture"
              type="file"
            />
          )}

          <button className={styles.login__button} type="submit">
            Submit
          </button>
        </form>
      </div>
    </Modal>
  );
};
