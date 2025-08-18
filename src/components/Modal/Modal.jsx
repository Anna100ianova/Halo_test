import styles from "./Modal.module.css";
import { StyledLink } from "../StyledLink/StyledLink";
import { Overlay } from "../Overlay/Overlay";
import { useState } from "react";
import img from "./image/error.svg";
import img2 from "./image/arrow.svg";

export const Modal = ({ closeModal, isModalOpen, selectedItem }) => {
  // const [valueName, setValueName] = useState("");
  // const [valueNumber, setValueNumber] = useState("");
  const [formState, setFormState] = useState({ userName: "", number: "" });
  const [errorState, setErrorState] = useState({ userName: "", number: "" });
  const [isValid, setIsValid] = useState({
    userName: null,
    number: null,
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleBlurName = (e) => {
    if (e.target.value.length < 3) {
      return setErrorState({
        ...errorState,
        userName: "This field in required",
      });
    }
    if (e.target.value.length >= 12) {
      return setErrorState({
        ...errorState,
        userName: "Should contain 12 characters",
      });
    }
    if (!/[a-zA-Zа-яА-ЯёЁ]+$/.test(e.target.value)) {
      return setErrorState({
        ...errorState,
        userName: "Only letters allowed",
      });
    }
    setIsValid({ ...isValid, userName: true });
  };
  const handleBlurNumber = (e) => {
    if (e.target.value.length < 3) {
      return setErrorState({
        ...errorState,
        number: "This field in required",
      });
    }
    if (e.target.value.length >= 12) {
      return setErrorState({
        ...errorState,
        number: "Should contain 12 characters",
      });
    }
    if (Number.isInteger(e.target.value)) {
      return setErrorState({
        ...errorState,
        number: "Must be a number",
      });
    }
    setIsValid({ ...isValid, number: true });
  };
  const addToConsole = () => {
    if (!errorState.userName && !errorState.number) {
      console.log(`Name: ${formState.userName}  Number:${formState.number}`);
    }
  };
  const clearError = (fieldName) => {
    setErrorState({ ...errorState, [fieldName]: "" });
    setFormState({ ...formState, [fieldName]: "" });
    setIsValid({ ...isValid, [fieldName]: null });
  };

  function getClassName(fieldName) {
    if (errorState[fieldName]) {
      return styles.input_error;
    }
    if (isValid[fieldName]) {
      return styles.input_success;
    }
    return styles.modal_input;
  }

  return (
    <Overlay closeModal={closeModal} isModalOpen={isModalOpen}>
      <div className={styles.modal_wrapper}>
        <div className={styles.modal_content}>
          <span className={styles.modal_category}>{selectedItem.category}</span>
          <span className={styles.modal_name}>{selectedItem.name}</span>
          <div className={styles.modal_price}>
            <span className={styles.modal_dollar}>&#36;</span>
            <span className={styles.modal_salary}>{selectedItem.price}</span>
          </div>
          <div className={styles.modal_inputs} id="123">
            <label className={styles.modal_label}>
              <input
                name="userName"
                type="text"
                value={formState.userName}
                placeholder="Name"
                className={getClassName("userName")}
                onChange={onInputChange}
                onBlur={handleBlurName}
              ></input>
              {errorState.userName && (
                <img
                  className={styles.error_img}
                  src={img}
                  onClick={() => clearError("userName")}
                />
              )}
            </label>
            {errorState.userName && (
              <div className={styles.error_text}>{errorState.userName}</div>
            )}
            <label htmlFor="number" className={styles.modal_label}>
              <input
                name="number"
                value={formState.number}
                type="number"
                onChange={onInputChange}
                onBlur={handleBlurNumber}
                className={getClassName("number")}
                placeholder="Number"
              ></input>
              {errorState.number && (
                <img
                  className={styles.error_img}
                  src={img}
                  onClick={() => clearError("number")}
                />
              )}
            </label>
            {errorState.number && (
              <div className={styles.error_text}>{errorState.number}</div>
            )}
          </div>
          <div className={styles.modal_button}>
            <StyledLink onClick={addToConsole}>
              Order
              <div className={styles.btn_arrow}>
                <img src={img2} />
              </div>
            </StyledLink>
          </div>
        </div>
      </div>
    </Overlay>
  );
};
