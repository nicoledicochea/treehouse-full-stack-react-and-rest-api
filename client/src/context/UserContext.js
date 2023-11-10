import { createContext, useState } from "react";

const UserContext = createContext(null);

export const UserProvider = (props) => {
    const [authUser, setAuthUser] = useState(null);

    const signIn = () => {

    }

    const signOut = () => {

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