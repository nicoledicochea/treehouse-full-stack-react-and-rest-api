import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../reset.css";
import "../global.css";
import axios from "axios";

const UpdateCourse = () => {
  const [course, setCourse] = useState([]);

  const { id } = useParams();
  const url = `http://localhost:5000/api/courses/${id}`;
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setCourse(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(`Error fetching and parsing data: ${error}`);
      });
  }, [url]);

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <form>
          <div className="main--flex">
            <div>
              <label>
                Course Title
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={`${course.title}`}
                />
              </label>

              <p>By Joe Smith {course.userId}</p>

              <label>
                Course Description
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={`${course.description}`}
                ></textarea>
              </label>
            </div>
            <div>
              <label>
                Estimated Time
                <input
                  id="estimatedTime"
                  name="estimatedTime"
                  type="text"
                  value={course.estimatedTime ? `${course.estimatedTime}` : ""}
                />
              </label>

              <label>
                Materials Needed
                <textarea 
                id="materialsNeeded" 
                name="materialsNeeded"
                value={course.materialsNeeded ? `${course.materialsNeeded}` : ""}
                >
                
                </textarea>
              </label>
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button
            className="button button-secondary"
            onClick="event.preventDefault(); location.href='index.html';"
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;
