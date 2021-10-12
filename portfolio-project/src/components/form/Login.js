import React, {useState} from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";

import "./forms.css";

const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {onLogin, onSignUp} = useContext(UserContext);

    const handleLogin = (event) => {
        event.preventDefault();
        onLogin(email, password);
    };

    const handleSignUp = (event) => {
        event.preventDefault();
        onSignUp(email, password);
    };

    const handleAnonymousLogin = (event) => {
        event.preventDefault();
        onLogin();
    }

    return (
        <div className="login container">
            <form name="login" onSubmit={handleLogin}>
                <p>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={(event) => setEmail(event.target.value)} />
                </p>
                <p>
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" onChange={(event) => setPassword(event.target.value)} />
                </p>
                <p>
                    <button className="green-button" type="submit" name="login" disabled={!email || !password}>Login</button>
                </p>
            </form>
            <form className="signup" onSubmit={handleSignUp}>
                <h3>No tienes una cuenta?</h3>
                <button className="green-button" type="submit" name="signup" disabled={!email || !password}>Registrarse</button>
                    <button name="anonymous" onClick={handleAnonymousLogin}>Acceder como anónimo</button>
            </form>
        </div>
    );
};

export default Login;