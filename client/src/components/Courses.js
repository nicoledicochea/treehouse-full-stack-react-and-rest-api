import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../reset.css"
import "../global.css"
import axios from "axios"

const Courses = () => {
    const [courses, setCourses] = useState([])

    // try {
    //     const url = "http://localhost:5000/api/courses";
    //     const fetchOptions = {
    //         method: "GET"
    //     }
    //     const response = fetch(url, fetchOptions)
 

    // } catch (error) {
    //     console.error(error)
    // }
    
    const url = "http://localhost:5000/api/courses";
    useEffect(() => {
        axios
        .get(url)
        .then((response) => {
            setCourses(response.data)
            // console.log(response.data)
        })
        .catch((error) => {
            console.log(`Error fetching and parsing data: ${error}`)
        })
    }, [url])
   
    return (
        <main>
            <div className="wrap main--grid">
            {courses.map((course) => {
                return (
                    // "/api/courses/" + course.id}

                    <NavLink key={course.id} className="course--module course--link" to={`/courses/${course.id}`}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                        
                    </NavLink>
                )
            })}
        

            {/* <NavLink className="course--module course--link" to="coursedetail">
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">Build a Basic Bookcase</h3>
            </NavLink>
            <NavLink className="course--module course--link" to="coursedetail">
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">Learn How to Program</h3>
            </NavLink>
            <NavLink className="course--module course--link" to="coursedetail">
                <h2 className="course--label">Course</h2>
                <h3 className="course--title">Learn How to Test Programs</h3>
            </NavLink> */}

            <NavLink className="course--module course--add--module" to="/courses/create">
                <span className="course--add--title">
                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                    New Course
                </span>
            </NavLink>
        </div>
    </main>
    )
};

export default Courses;