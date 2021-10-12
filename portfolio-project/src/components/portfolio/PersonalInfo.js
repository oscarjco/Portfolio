import React from "react";
import photo from "../../img/profilePhoto.png";

import "./portfolio.css";

const PersonalInfo = (data) => (
    <div className="personal-info container">

        <img className="photo" src={photo} alt="Foto de perfil"/>

        <div className="main-info">
            <h2>Datos Personales</h2>

            <ul>
                <li className="name">
                    <label>Nombre:</label>
                    <span>{data.data.name}</span>
                </li>
                <li className="job">
                    <label>Ocupación:</label>
                    <span>{data.data.job}</span>
                </li>
                <li className="birthday">
                    <label>Fecha de nacimiento:</label>
                    <span>{data.data.birthday}</span>
                </li>
                <li className="email">
                    <label>Email:</label>
                    <span>{data.data.email}</span>
                </li>
                <li className="location">
                    <label>Localidad:</label>
                    <span>{data.data.location}</span>
                </li>
            </ul>
        </div>

        <div className="about">
            <h2>Sobre mí</h2>
            <p>{data.data.about}</p>
        </div>

        <div className="knowledge">
            <h2>Conocimientos</h2>

            <div className="frontend">
                <h3>Front-end</h3>
                <ul>
                    {data.data.knowledges.frontend.map(knowledge => (
                        <li>{knowledge}</li>
                    ))}
                </ul>
            </div>
            
            <div className="backend">
                <h3>Back-end</h3>
                <ul>
                    {data.data.knowledges.backend.map(knowledge => (
                        <li>{knowledge}</li>
                    ))}
                </ul>
            </div>
            
            <div className="utils">
                <h3>Herramientas</h3>
                <ul>
                    {data.data.knowledges.utils.map(knowledge => (
                        <li>{knowledge}</li>
                    ))}
                </ul>
            </div>
        </div>
        
    </div>
);

export default PersonalInfo;