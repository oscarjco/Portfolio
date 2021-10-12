import React from "react";

import "./portfolio.css";

const Education = (data) => (
    <div className="education container">
        <div className="academic">
            <h2>Formación Académica</h2>
            <ul>
                {data.data.academic.map(academic => (
                    <li className="academic">
                        <div className="title">
                            <h3>{academic.title}</h3>
                            {academic.date ? (<h4>{academic.date}</h4>) : (<h4>No finalizado</h4>)}
                        </div>
                        <p className="knowledges">
                            <label>Conocimientos adquiridos:</label>
                            {academic.knowledges.map(knowledge => (<span className="knowledge">&nbsp;{knowledge}&nbsp;</span>))}
                        </p>
                        <p className="summary">{academic.summary}</p>
                    </li>
                ))}
            </ul>
        </div>
        
        <div className="tutorials">
            <h2>Libros / Tutoriales realizados</h2>
            <ul>
                {data.data.tutorials.map(tutorial => (
                    <li className="tutorial">
                        <h3>{tutorial.title}</h3>
                        <p>
                            <div className="author">
                                <label>Autor:&nbsp;</label><span>{tutorial.author}</span>
                            </div>
                            <div className="knowledges">
                                <label>Conocimientos adquiridos:</label>
                                {tutorial.knowledges.map(knowledge => <span className="knowledge">&nbsp;{knowledge}&nbsp;</span>)}
                            </div>
                            </p>
                        <p className="summary">{tutorial.summary}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default Education;