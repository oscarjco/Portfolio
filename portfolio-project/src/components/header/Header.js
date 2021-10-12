import React, {useContext} from "react";
import {Link} from "react-router-dom";
import UserContext from "../../context/UserContext";

import './Header.css';

const Header = (props) => {
    const {user, onLogout} = useContext(UserContext);

    const onLinkClick = (event) => {
        const option = event.target.parentElement;

        const activeLink = document.getElementsByClassName("active")[0]
        
        if(activeLink) {
            activeLink.classList.remove("active");
        }
        
        option.classList.add("active");
    };

    return (
        <header className="App-header">
            <ul>
                <li>
                <Link to={"/"} onClick={onLinkClick}>Datos Personales</Link>
                </li>
                <li>
                    <Link to={"/education"} onClick={onLinkClick}>Formación</Link>
                </li>
                <li>
                    <Link to={"/experience"} onClick={onLinkClick}>Experiencia</Link>
                </li>
                <li>
                    <Link to={"/posts"} onClick={onLinkClick}>Comentarios</Link>
                </li>
                {user.isAuthenticated ? (
                    <li className="user-info">
                        <span>Usuario: <strong>{user.username}</strong></span>
                        <button className="linkLike" onClick={(event) => {
                            event.preventDefault();
                            onLogout();
                        }}>
                            Salir
                        </button>
                    </li>
                ) : (
                    <li>
                        <Link to={"/login"}>Login</Link>
                    </li>
                )}
            </ul>
        </header>
    );
};

export default Header;