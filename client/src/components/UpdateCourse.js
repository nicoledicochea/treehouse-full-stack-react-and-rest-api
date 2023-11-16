import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import "../global.css";
import axios from "axios";
import UserContext from "../context/UserContext";

const UpdateCourse = () => {
  const [course, setCourse] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [estimatedTime, setTime] = useState("");
  const [materialsNeeded, setMaterials] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const { authUser } = useContext(UserContext);

  // get course id from route
  const { id } = useParams();
  const url = `http://localhost:5000/api/courses/${id}`;
  // load specific course data
  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const course = response.data;
        setCourse(course);
        setTitle(course.title);
        setDescription(course.description);
        if (course.estimatedTime) {
          setTime(course.estimatedTime);
        }
        if (course.materialsNeeded) {
          setMaterials(course.materialsNeeded);
        }
        // only allow the authUser that created the course to update it
        // redirects other authorized users to forbidden
        else if (course.user.id !== authUser.id) {
          navigate("/forbidden");
        }
      })
      .catch((error) => {
        console.log(`Error fetching and parsing data: ${error}`);
      });
  }, [url, navigate, authUser.id]);

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/courses/${id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // create the updated course body using the form submission
    const updatedCourse = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      id: +id,
      userId: course.userId,
    };
    const url = `http://localhost:5000/api/courses/${id}`;
    if (e.target.type === "submit") {
      await axios({
        method: "PUT",
        url,
        data: JSON.stringify(updatedCourse),
        headers: { "Content-Type": "application/json" },
        // basic auth
        auth: {
          username: authUser.emailAddress,
          password: authUser.password,
        },
      })
        .then((response) => {
          if (response.status === 204) {
            navigate(`/courses/${id}`);
          }
        })
        .catch((error) => {
          const validationErrors = error.response.data.errors;
          setErrors(validationErrors);
          if (!validationErrors && error.response.status === 500) {
            navigate("/error");
          }
        });
    }
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        {errors.length > 0 ? (
          <div className="validation--errors">
            <h3>Validation Errors</h3>
            <ul>
              {errors.map((error, index) => {
                return <li key={index}>{error}</li>;
              })}
            </ul>
          </div>
        ) : null}
        <form onClick={(e) => handleSubmit(e)}>
          <div className="main--flex">
            <div>
              <label>
                Course Title
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>

              <p>
                By{" "}
                {course.user
                  ? course.user.firstName + " " + course.user.lastName
                  : null}
              </p>

              <label>
                Course Description
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  value={estimatedTime}
                  onChange={(e) => setTime(e.target.value)}
                />
              </label>

              <label>
                Materials Needed
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded}
                  onChange={(e) => setMaterials(e.target.value)}
                ></textarea>
              </label>
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button
            className="button button-secondary"
            onClick={(e) => handleCancel(e)}
            type="button"
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;
