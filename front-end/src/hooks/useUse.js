// src/hooks/useUser.js
import { useContext } from "react";
import { UserContext
    
 } from "../context/userContext";
const useUser = () => useContext(UserContext);

export default useUser;
