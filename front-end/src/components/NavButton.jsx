import { Link } from "react-router-dom";
import "../style/NavButton.css";
import { MdDashboard } from "react-icons/md";

function NavButton(props) {
  return (
    <Link to={props.to}>
      <div className="nav-button">{props.icon}</div>
    </Link>
  );
}

export default NavButton;
