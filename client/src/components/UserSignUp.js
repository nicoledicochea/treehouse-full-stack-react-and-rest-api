import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useContext } from "react";
import axios from "axios";
import UserContext from "../context/UserContext"
import "../reset.css";
import "../global.css";
import Cookies from "js-cookie";

const UserSignUp = () => {
  const navigate = useNavigate();
  const firstName = useRef(null);
  const lastName = useRef(null);
  const emailAddress = useRef(null);
  const password = useRef(null);
  const [errors, setErrors] = useState([]);
  const { actions } = useContext(UserContext);

  const handleSubmit = async (e) => {
    e.preventDefault()
    const user = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        emailAddress: emailAddress.current.value,
        password: password.current.value
    }
    const url = "http://localhost:5000/api/users"
    try {
        await axios({
            method: "POST",
            url,
            data: JSON.stringify(user),
            headers: {"Content-Type": "application/json"},
        })
        .then(async(response) => {
            if(response.status === 201) {
                await actions.signIn(user)
            } 
        })
    } catch (error) {
        const validationErrors = error.response.data.errors;
        setErrors(validationErrors)
        if(!validationErrors) {
            navigate('/error')
        }
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <main>
      <div className="form--centered">
        <h2>Sign Up</h2>
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
            First Name
            <input
              id="firstName"
              name="firstName"
              type="text"
              ref={firstName}
              placeholder="First Name"
            />
          </label>
          <label>
            Last Name
            <input 
                id="lastName" 
                name="lastName" 
                type="text" 
                ref={lastName} 
                placeholder="Last Name"
            />
          </label>
          <label>
            Email Address
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              ref={emailAddress}
              placeholder="Email"
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
              placeholder="Password"
              autoComplete="current-password"
            />
          </label>
          <button className="button" type="submit">
            Sign Up
          </button>
          <button
            className="button button-secondary"
            onClick={(e) => handleCancel(e)}
          >
            Cancel
            {/* CHANGE onClick EVENT
                        onClick="event.preventDefault(); location.href='index.html';"
                        */}
          </button>
        </form>
        <p>
          Already have a user account? Click here to{" "}
          <Link to="/signin">sign in</Link>!
        </p>
      </div>
    </main>
  );
};

export default UserSignUp;
