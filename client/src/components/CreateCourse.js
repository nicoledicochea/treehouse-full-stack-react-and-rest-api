import { useNavigate } from "react-router-dom";
import { useState } from "react"
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
    const [isValid, setIsValid] = useState(true)

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
            userId: 1 
        }
        if(title !== '') {
            newCourse.title = title
        }
        if(description !== '') {
            newCourse.description = description
        }
        // console.log(newCourse)
        axios({
            method: "POST",
            url,
            data: JSON.stringify(newCourse),
            headers: {"Content-Type": "application/json"},
            // TODO - update with basic auth
            auth: {
                username: "john23@smith.com",
                password: "password"
            }
            })
            .then(response => {
                if(response.status === 201) {
                    navigate(`/`)
                }
            })
            .catch(error => {
                setIsValid(false)
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
            <div className="validation--errors" hidden={isValid}>
                <h3>Validation Errors</h3>
                <ul>
                    {/* {console.log(errors)} */}
                    {errors.map((error, index) => {
                        return <li key={index}>{error}</li>
                    })}
                    {/* <li>Please provide a value for "Title"</li>
                    <li>Please provide a value for "Description"</li> */}
                </ul>
            </div>
            <form onSubmit={e => handleSubmit(e)}>
                <div className="main--flex">
                    <div>
                        <label>Course Title
                        <input id="courseTitle" name="courseTitle" type="text" value={title}
                        onChange={e => setTitle(e.target.value)} /></label>

                        {/* auth user */}
                        <p>By Joe Smith</p>

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