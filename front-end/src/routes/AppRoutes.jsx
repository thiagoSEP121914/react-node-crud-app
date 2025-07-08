import { Routes, Route } from "react-router-dom";
import CreateUser from "../pages/UserForm.jsx";
import Home from "../pages/Home.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Finances from "../pages/Finances.jsx";
import Users from "../pages/UsersTable.jsx";

function AppRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="home" element = {<Home/>}/>
        <Route path="dashBoard" element={<Dashboard/>}/>
        <Route path="finance" element={<Finances/>} />
        <Route path="Users" element={<Users/>} />
        <Route path="users/create" element={<CreateUser />} />
      <Route path="*" element={<div>NOT FOUND</div>} />
      
    </Routes>
  );
}

export default AppRoutes;
