import "../style/SideBar.css"
import NavButton from "./NavButton";
import { MdDashboard } from "react-icons/md";
import { CiHome } from "react-icons/ci";
import { TbUsersGroup } from "react-icons/tb";
import { FaRegShareSquare } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { CiMoneyBill } from "react-icons/ci";



function SideBar({ isActive }) {
  return (
    <aside className={`sidebar ${isActive ? "mobile-active" : ""}`}>
      <div>
        <div className="nav">
          <NavButton 
          to={"/dashBoard"}
          icon={<MdDashboard size={40} color="4182F9" />} />
          <NavButton 
          to={"/home"}
          icon={<CiHome size={40} color="4182F9" />} />
          <NavButton 
          to={"/finance"}
          icon={<CiMoneyBill size={40} color="4182F9" />} />
          <NavButton 
          to={"/users"}
          icon={<TbUsersGroup size={40} color="4182F9" />} />
          <NavButton 
          to={"/users/create"}          
          icon={<IoPersonAddOutline size={40} color="4182F9" />} />
        </div>
      </div>
    </aside>
  );
}

export default SideBar;