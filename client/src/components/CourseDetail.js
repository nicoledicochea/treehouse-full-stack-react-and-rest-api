import { Link, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "../reset.css"
import "../global.css"
import axios from "axios"
import UserContext from "../context/UserContext";
import Markdown from "react-markdown";

const CourseDetail = () => {
    const [course, setCourse] = useState([])
    const { authUser } = useContext(UserContext)

    const { id } = useParams();

    const url = `http://localhost:5000/api/courses/${id}`;
    useEffect(() => {
        axios
        .get(url)
        .then((response) => {
            setCourse(response.data)
        })
        .catch((error) => {
            console.log(`Error fetching and parsing data: ${error}`)
        })
    }, [url])

    const handleDelete = () => {
        axios({
            method: "DELETE",
            url,
            auth: {
                username: authUser.emailAddress,
                password: authUser.password
            },
        })
        .then(response => console.log("Course successfully deleted"))
        .catch(error => console.error(error))
    }

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    {authUser && course.user && authUser.id == course.user.id ? <>
                        <Link className="button" to={`/courses/${id}/update`}>Update Course</Link> 
                        <Link onClick={handleDelete} className="button" to="/">Delete Course</Link>
                    </> : null}
                    <Link className="button button-secondary" to="/">Return to List</Link>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{course.title}</h4>
                            <p>By {course.user ? course.user.firstName + " " + course.user.lastName : null}</p>

                            <Markdown>{course.description}</Markdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {/* <li>1/2 x 3/4 inch parting strip</li> */}
                                <Markdown>{course.materialsNeeded}</Markdown>
 
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
};

export default CourseDetail;