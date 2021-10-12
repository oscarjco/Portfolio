import React from "react";
import {Link} from "react-router-dom";
import './Errors.css';

const NotFound = () => (
    <article className="not-found error container">
        <h1>Error 404</h1>
        <p>
            Content not found. <Link to="/">Return to main page</Link>
        </p>
    </article>
);

export default NotFound;