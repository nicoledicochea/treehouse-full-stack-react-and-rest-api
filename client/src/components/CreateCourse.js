import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react"
import UserContext from "../context/UserContext"
import "../reset.css"
import "../global.css"
import axios from "axios"

const CreateCourse = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [estimatedTime, setTime] = useState('')
    const [materialsNeeded, setMaterials] = useState('')
    const [errors, setErrors] = useState([])
    const { authUser } = useContext(UserContext)

    const handleSubmit = (e) => {
        e.preventDefault()
        const url = `http://localhost:5000/api/courses/`;
        setTitle(title)
        setDescription(description)
        setTime(estimatedTime)
        setMaterials(materialsNeeded)
        const newCourse = {
            estimatedTime,
            materialsNeeded,
            // authUser id
            userId: authUser.id
        }
        if(title !== '') {
            newCourse.title = title
        }
        if(description !== '') {
            newCourse.description = description
        }
        axios({
            method: "POST",
            url,
            data: JSON.stringify(newCourse),
            // TODO - update with basic auth
            auth: {
                username: authUser.emailAddress,
                password: authUser.password
            }
            })
            .then(response => {
                if(response.status === 201) {
                    navigate(`/`)
                } console.log(authUser)
            })
            .catch(error => {
                const validationErrors = error.response.data.errors
                setErrors(validationErrors)
            })
        
    }

    const handleCancel = (e) => {
        e.preventDefault()
        navigate("/")
    }


    return (
        <main>
        <div className="wrap">
            <h2>Create Course</h2>
            {/* { errors.length > 0 
            ? 
            <div className="validation--errors" >
                <h3>Validation Errors</h3>
                <ul>
                    {errors.map((error, index) => {
                        return <li key={index}>{error}</li>
                    })}
                </ul> 
            </div>
            : null } */}
            <form onSubmit={e => handleSubmit(e)}>
                <div className="main--flex">
                    <div>
                        <label>Course Title
                        <input id="courseTitle" name="courseTitle" type="text" value={title}
                        onChange={e => setTitle(e.target.value)} /></label>

                        {/* auth user */}
                        { authUser ?  <p>By {authUser.firstName + authUser.lastName}</p> : null }
                       

                        <label>Course Description
                        <textarea id="courseDescription" name="courseDescription" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}></textarea></label>
                    </div>
                    <div>
                        <label>Estimated Time
                        <input id="estimatedTime" name="estimatedTime" type="text" value={estimatedTime} onChange={e => setTime(e.target.value)} /></label>

                        <label>Materials Needed
                        <textarea id="materialsNeeded" name="materialsNeeded" onChange={e => setMaterials(e.target.value)} value={materialsNeeded}> </textarea></label>
                    </div>
                </div>
                <button className="button" type="submit">Create Course</button><button className="button button-secondary" onClick={e => handleCancel(e)}>Cancel</button>
            </form>
        </div>
    </main>
    )
};

export default CreateCourse;