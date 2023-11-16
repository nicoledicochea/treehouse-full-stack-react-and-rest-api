import { createContext, useState } from "react";
import Cookies from "js-cookie";

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const cookie = Cookies.get("authenticatedUser");
    const [authUser, setAuthUser] = useState(cookie ? JSON.parse(cookie) : null);

    const signIn = async (credentials) => {
        const encodedCredentials = btoa(
            `${credentials.username}:${credentials.password}`
        )
        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Basic ${encodedCredentials}`
            },
        }
        const url = "http://localhost:5000/api/users"
        const response = await fetch(url, fetchOptions)
        if(response.status === 200) {
            const user = await response.json()
            // add password from credentials to user
            user.password = credentials.password;
            setAuthUser(user)
            // set cookie
            Cookies.set("authenticatedUser", JSON.stringify(user))
            return user
        } else if(response.status === 401) {
            return null
        } else {
            throw new Error()
        }
    }

    const signOut = () => {
        setAuthUser(null)
        Cookies.remove("authenticatedUser");
    }
    
    return (
        <UserContext.Provider
            value={{
                authUser,
                actions: {
                    signIn,
                    signOut
                }
            }}
        >
            {props.children}
        </UserContext.Provider>
        
    )
}

export default UserContext;

