import React from "react";

import "./portfolio.css";

const Experience = (data) => (
    <div className="experience container">
        <div className="jobs">
            <h2>Experiencia Profesional</h2>
            <ul>
                {data.data.jobs.map(exp => (
                    <li className="job">
                        <div className="title">
                            <h3>{exp.company}</h3>
                            <span>{exp.startDate} - {exp.endDate}</span>
                        </div>
                        <p>{exp.summary}</p>
                    </li>
                ))}
            </ul>
        </div>
        <div className="projects">
            <h2>Proyectos Propios</h2>
            <ul>
                {data.data.projects.map(project => (
                    <li className="project">
                        <div className="title">
                            <h3>{project.name}</h3>
                            <h4>{project.date}</h4>
                        </div>
                        <label>Tecnologías utilizadas: </label>
                        {project.technologies.map(technology => <span className="technology">&nbsp;{technology}&nbsp;</span>)}
                        <p>{project.summary}</p>
                        <div className="links">
                            <label>Enlaces: </label>
                            <a href={project.link}>Proyecto</a>
                            <a href={project.github}>Github</a>
                        </div>
                        
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default Experience;