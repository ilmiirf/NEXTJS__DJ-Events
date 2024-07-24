import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { FaTimes } from "react-icons/fa";
import styles from "../styles/Modal.module.css";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
}

const Modal = ({ show, onClose, children, title }: ModalProps) => {
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleClose = (e: any) => {
    e.preventDefault;
    onClose();
  };
  const modalContent = show ? (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <header className={styles.header}>
          <button onClick={handleClose} className={styles.button}>
            <FaTimes />
          </button>
        </header>
        {title && <div className={styles.title}>{title}</div>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")!
    );
  } else {
    return null;
  }
};

export default Modal;
