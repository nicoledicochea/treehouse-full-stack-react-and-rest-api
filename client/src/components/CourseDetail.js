import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../reset.css"
import "../global.css"
import axios from "axios"

const CourseDetail = () => {
    const [course, setCourse] = useState([])

    const { id } = useParams();

    const url = `http://localhost:5000/api/courses/${id}`;
    useEffect(() => {
        axios
        .get(url)
        .then((response) => {
            setCourse(response.data)
            // console.log(response.data)
        })
        .catch((error) => {
            console.log(`Error fetching and parsing data: ${error}`)
        })
    }, [url])

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <Link className="button" to={`/courses/${id}/update`}>Update Course</Link>
                    <Link className="button" to="#">Delete Course</Link>
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
                            <p>By Joe Smith {course.userId}</p>

                            {course.description}
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{course.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ul className="course--detail--list">
                                {/* <li>1/2 x 3/4 inch parting strip</li> */}
                                {course.materialsNeeded}
 
                            </ul>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
};

export default CourseDetail;