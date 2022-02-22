import React from "react";
import { useGlobalContext } from "./Context";



const Modal = () => {
    const {isModalOpen, closeModal, correct, questions} = useGlobalContext();
    return (
        <div className={`$(isModalOpen ? "modal-contanier isOpen" : "modal-contanier"}`}>
        <div className="modal-content">
          <h2> Congrats </h2>
          <p>
              you answered {((correct/questions.length) * 100).toFixed(0)}% of questions correctly
          </p>
          <button className="btn btn-scucess close-btn" style={{width: "50%"}} onClick={closeModal}>
              again
          </button>
        </div>
        </div>
    )
}