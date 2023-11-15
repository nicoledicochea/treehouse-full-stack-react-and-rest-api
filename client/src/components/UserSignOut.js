import { Navigate } from "react-router-dom";
import { useContext, useEffect } from 'react'
import UserContext from '../context/UserContext'
import "../reset.css";
import "../global.css";

const UserSignOut = () => {
    const { actions } = useContext(UserContext)
    useEffect(() => actions.signOut())
    return <Navigate replace to="/" />
};

export default UserSignOut;