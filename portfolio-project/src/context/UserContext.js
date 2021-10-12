import { createContext } from "react";

const UserContext = createContext({
    email: "",
    username: "",
    isAuthenticated: false
});

export default UserContext;