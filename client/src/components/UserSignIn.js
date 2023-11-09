import { Link } from "react-router-dom";
import "../reset.css"
import "../global.css"

const UserSignIn = () => {
  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <form>
        <label for="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" value="" />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" value="" />
        <button className="button" type="submit">
          Sign In
        </button>
        <button
          className="button button-secondary"
        // UPDATE ONCLICK
        //   onclick="event.preventDefault(); location.href='index.html';"
        >
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to{" "}
        <Link to="sign-up.html">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
