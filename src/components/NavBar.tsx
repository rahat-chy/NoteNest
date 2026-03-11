import { Link } from "react-router-dom";
import "../css/navBar.css";

function NavBar() {
  return (
    <div className="navbar">
      <div className="navbar-items">
        <img src="../../noteLogo.png" className="navbar-logo" />
        <Link to="/" className="nav-link">
          Home
        </Link>
        <span className="separator">|</span>
        <Link to="/doneNotes" className="nav-link">
          Done Notes
        </Link>
      </div>
    </div>
  );
}

export default NavBar;
