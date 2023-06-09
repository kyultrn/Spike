import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import "./Nav.css";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Spike from "./spike.jpg";

export default function Nav () {
    const navigate = useNavigate()
    const [modalOpen, setModalOpen] = useState(false);
    const body = document.body

    function openModal() {
        setModalOpen(true)

        body.classList.add('modal-open')
    }

    function closeModal() {
        setModalOpen(false)

        body.classList.remove('modal-open')
    }

    return (
        <>
            <nav>
                <div className="nav__left">
                    <p className="nav__logo pointer" onClick={() => navigate('/')}>
                        <img src={Spike} alt="Spike" style={{ height: "57px", width: "57px", zIndex: "1"}}/>
                    </p>
                </div>
                <div className="nav__right">
                    <div className="nav__links">
                        <Link to="/">Home</Link>
                        <Link to="/animes">Animes</Link>
                    </div>
                    <MenuIcon className="pointer" onClick={() => openModal()} />
                </div>
            </nav>
            <div className={`modal ${modalOpen ? 'open' : 'close'}`}>
                <CloseIcon className="pointer" onClick={() => closeModal()}/>
                <div className="modal__links">
                    <Link onClick={() => closeModal()} to="/">Home</Link>
                    <Link onClick={() => closeModal()} to="/animes">Animes</Link>
                </div>
            </div>
        </>
    )
}
