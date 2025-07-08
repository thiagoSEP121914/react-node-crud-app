import { createContext, useState} from "react";

const UserContext = createContext();

function UserProvider({ children }) {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
