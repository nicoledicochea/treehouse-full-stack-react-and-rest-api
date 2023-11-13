import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);

    const signIn = async (credentials) => {
        const encodedCredentials = btoa(
            `${credentials.email}:${credentials.password}`
        )

        const fetchOptions = {
            method: "GET",
            headers: {
                Authorization: `Basic ${encodedCredentials}`
            }
        }
        const url = "http://localhost:5000/api/users"
        const response = await fetch(url, fetchOptions)

        if(response.status === 200) {
            const user = await response.json()
            setAuthUser(user)
        } else if(response.status === 401) {
            return null
        } else {
            throw new Error()
        }
    }

    const signOut = () => {
        setAuthUser(null)
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