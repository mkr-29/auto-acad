import React from "react";
import "./Modal.scss";
import { IoClose } from "react-icons/io5";

export default function Modal({
  isModalOpen,
  setIsModalOpen,
  title,
  content,
  primaryButton,
}) {
  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3 className="modal-header-title">{title}</h3>
          <button
            className="modal-header-close"
            onClick={() => setIsModalOpen(false)}
          >
            <IoClose />
          </button>
        </div>
        <div className="modal-body">{content}</div>
        <div className="modal-footer">
          <button
            className="modal-footer-button"
            onClick={primaryButton.onClick}
          >
            {primaryButton.text}
          </button>
          <button
            className="modal-footer-button"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
