import styles from "./Modal.module.css";
import { StyledLink } from "../StyledLink/StyledLink";
import { Overlay } from "../Overlay/Overlay";
import { useState } from "react";
import img from "./image/error.svg";
import img2 from "./image/arrow.svg";

export const Modal = ({ closeModal, isModalOpen, selectedItem }) => {
  const [valueName, setValueName] = useState("");
  const [valueNumber, setValueNumber] = useState("");
  const [errorName, setErrorName] = useState("");

  const [errorNumber, setErrorNumber] = useState("");
  const [isValidName, setIsValidName] = useState(null);
  const [isValidNumber, setIsValidNumber] = useState(null);

  const handleChangeName = (e) => {
    setValueName(e.target.value);
    setErrorName("");
    setIsValidName(null);
  };
  const handleChangeNumber = (e) => {
    setValueNumber(e.target.value);
    setErrorNumber("");
    setIsValidNumber(null);
  };

  const handleBlurName = (e) => {
    if (e.target.value.length < 3) {
      return setErrorName("This field in required");
    }
    if (e.target.value.length >= 12) {
      return setErrorName("Should contain 12 characters");
    }
    if (!/[a-zA-Zа-яА-ЯёЁ]+$/.test(e.target.value)) {
      return setErrorName("Only letters allowed");
    }
    setIsValidName(true);
  };
  const handleBlurNumber = (e) => {
    if (e.target.value.length < 3) {
      return setErrorNumber("This field in required");
    }
    if (e.target.value.length >= 12) {
      return setErrorNumber("Should contain 12 characters");
    }
    if (Number.isInteger(e.target.value)) {
      return setErrorNumber("Must be a number");
    }
    setIsValidNumber(true);
  };
  const addToConsole = () => {
    if (!errorName && !errorNumber) {
      console.log(`Name: ${valueName}  Number:${valueNumber}`);
    }
  };
  const clearNameError = () => {
    setErrorName("");
    setValueName("");
    setIsValidName(null);
    setIsValidNumber(null);
  };

  function getValueNameClassName() {
    if (errorName) {
      return styles.input_error;
    }
    if (isValidName) {
      return styles.input_success;
    }
    return styles.modal_input;
  }
  function getValueNumberClassName() {
    if (errorNumber) {
      return styles.input_error;
    }
    if (isValidNumber) {
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
                name="name"
                type="text"
                value={valueName}
                placeholder="Name"
                className={getValueNameClassName()}
                onChange={handleChangeName}
                onBlur={handleBlurName}
              ></input>
              {errorName && (
                <img
                  className={styles.error_img}
                  src={img}
                  onClick={clearNameError}
                />
              )}
            </label>
            {errorName && <div className={styles.error_text}>{errorName}</div>}
            <label htmlFor="number" className={styles.modal_label}>
              <input
                name="number"
                value={valueNumber}
                type="number"
                onChange={handleChangeNumber}
                onBlur={handleBlurNumber}
                className={getValueNumberClassName()}
                placeholder="Number"
              ></input>
              {errorNumber && <img className={styles.error_img} src={img} />}
            </label>
            {errorNumber && (
              <div className={styles.error_text}>{errorNumber}</div>
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
