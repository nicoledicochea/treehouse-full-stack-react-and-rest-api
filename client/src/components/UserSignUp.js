import { Link } from "react-router-dom";
import "../reset.css";
import "../global.css";

const UserSignUp = () => {
    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                
                <form>
                    <label >First Name
                    <input id="firstName" name="firstName" type="text" value="" /></label>
                    <label>Last Name
                    <input id="lastName" name="lastName" type="text" value="" /></label>
                    <label>Email Address
                    <input id="emailAddress" name="emailAddress" type="email" value="" /></label>
                    <label>Password
                    <input id="password" name="password" type="password" value="" /></label>
                    <button className="button" type="submit">Sign Up</button><button className="button button-secondary" onClick="event.preventDefault(); location.href='index.html';"
                    >
                        Cancel
                        {/* CHANGE onClick EVENT
                        onClick="event.preventDefault(); location.href='index.html';"
                        */}
                    </button>
                </form>
                <p>Already have a user account? Click here to <Link to="/signin">sign in</Link>!</p>
            </div>
        </main>
    )
};

export default UserSignUp;