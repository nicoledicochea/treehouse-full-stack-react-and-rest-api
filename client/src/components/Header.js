import { NavLink, Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import "../reset.css";
import "../global.css";

const Header = () => {
  const { authUser } = useContext(UserContext);

  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        {/* conditionally render signin/signup links depending on authUser status */}
        <nav>
          {authUser ? (
            <ul className="header--signedin">
              <li>Welcome, {authUser.firstName}</li>
              <li>
                <NavLink to="signout">Sign Out</NavLink>
              </li>
            </ul>
          ) : (
            <ul className="header--signedout">
              <li>
                <NavLink to="signup">Sign Up</NavLink>
              </li>
              <li>
                <NavLink to="signin">Sign In</NavLink>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
