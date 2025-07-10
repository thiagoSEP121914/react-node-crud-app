import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Finances from "../pages/Finances.jsx";
import Users from "../pages/UsersTable.jsx";
import UserForm from "../pages/UserForm.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
      <Route path="dashBoard" element={<Dashboard />} />
      <Route path="finance" element={<Finances />} />
      <Route path="Users" element={<Users />} />
      <Route path="users/create" element={<UserForm />} />
      <Route path="user/e" />
      <Route path="users/:cpf/edit" element={<UserForm />} />
    </Routes>
  );
}

export default AppRoutes;
