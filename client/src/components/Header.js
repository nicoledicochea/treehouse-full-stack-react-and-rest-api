import { NavLink, Link } from "react-router-dom";
import "../reset.css"
import "../global.css"

const Header = () => {
  return (
    <header>
      <div className="wrap header--flex">
        <h1 className="header--logo">
          <Link to="/">Courses</Link>
        </h1>
        <nav>
          <ul className="header--signedout">
            <li>
              <NavLink to="signup">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="signin">Sign In</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
