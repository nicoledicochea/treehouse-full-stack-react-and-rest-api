import { Link, useNavigate } from "react-router-dom";
import { useState, useRef, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext";
import "../reset.css";
import "../global.css";

const UserSignIn = () => {
  const { actions } = useContext(UserContext);
  const username = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const credentials = {
      username: username.current.value,
      password: password.current.value,
    };
    try {
      const user = await actions.signIn(credentials);
      if(user) {
        navigate('/')
      } else {
        setErrors(["Sign in was unsuccessful"])
      }
    } catch (error) {
      console.log(error)
      navigate("/error")
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate('/');
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      { errors.length > 0 
        ? 
        <div className="validation--errors" >
          <h3>Validation Errors</h3>
          <ul>
              {errors.map((error, index) => {
                  return <li key={index}>{error}</li>
              })}
          </ul> 
          </div>
        : null }
      <form onSubmit={(e) => handleSubmit(e)}>
        <label>
          Email Address
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            ref={username}
            autoComplete="username"
          />
        </label>
        <label>
          Password
          <input
            id="password"
            name="password"
            type="password"
            ref={password}
            autoComplete="current-password"
          />
        </label>
        <button className="button" type="submit">
          Sign In
        </button>
        <button
          className="button button-secondary"
          onClick={(e) => handleCancel(e)}
        >
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to{" "}
        <Link to="/signup">sign up</Link>!
      </p>
    </div>
  );
};

export default UserSignIn;
