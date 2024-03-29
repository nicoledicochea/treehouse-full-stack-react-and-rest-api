import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../reset.css";
import "../global.css";
import axios from "axios";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  // get all course data to display on index
  const url = "http://localhost:5000/api/courses";
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCourses(response.data);
      })
      .catch((error) => {
        if (error.response.status === 500) {
          navigate("/error");
        }
        console.log(`Error fetching and parsing data: ${error}`);
      });
  }, [url, navigate]);

  return (
    <main>
      <div className="wrap main--grid">
        {/* create a link for each course */}
        {courses.map((course) => {
          return (
            <Link
              key={course.id}
              className="course--module course--link"
              to={`/courses/${course.id}`}
            >
              <h2 className="course--label">Course</h2>
              <h3 className="course--title">{course.title}</h3>
            </Link>
          );
        })}

        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    </main>
  );
};

export default Courses;
