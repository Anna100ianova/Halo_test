import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import styles from "./Overlay.module.css";

const modalRoot = document.getElementById("modal-root");

export const Overlay = ({ closeModal, isModalOpen, children }) => {
  if (!isModalOpen) return null;
  return ReactDOM.createPortal(
    <div className={styles.overlay_wrap}>
      <div className={styles.btn_wrap}>
        <button className={styles.close_button} onClick={closeModal}>
          ✖
        </button>
        {children}
      </div>
    </div>,
    modalRoot
  );
};
