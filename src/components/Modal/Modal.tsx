import React from "react";
import "./Modal.css";
import { IModalProps } from "../../types/types";

/**
 * Компонент модального окна.
 */
const Modal: React.FC<IModalProps> = ({
  onClose,
  children,
}: IModalProps): JSX.Element => {
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__button-wrapper">
          <button className="modal__close-button" onClick={onClose}>
            Закрыть
          </button>
        </div>
        <div className="modal__children">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
