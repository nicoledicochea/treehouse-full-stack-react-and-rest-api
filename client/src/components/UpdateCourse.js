import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../reset.css";
import "../global.css";
import axios from "axios";

const UpdateCourse = () => {
  const [course, setCourse] = useState([]);
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [estimatedTime, setTime] = useState('')
  const [materialsNeeded, setMaterials] = useState('')
  const [errors, setErrors] = useState([])
  const [isValid, setIsValid] = useState(true)
  const navigate = useNavigate();

  const { id } = useParams();
  const url = `http://localhost:5000/api/courses/${id}`;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        const course = response.data
        setCourse(course);
        setTitle(course.title)
        setDescription(course.description)
        if (course.estimatedTime) {
          setTime(course.estimatedTime)
        }
        if(course.materialsNeeded) {
          setMaterials(course.materialsNeeded)
        }
        // console.log(response.data);
      })
      .catch((error) => {
        console.log(`Error fetching and parsing data: ${error}`);
      });
  }, [url]);

  const handleCancel = (e) => {
    e.preventDefault()
    navigate(`/courses/${id}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const updatedCourse =  {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      id: +id,
      userId: course.userId
    }
    // console.log(updatedCourse)
    const url = `http://localhost:5000/api/courses/${id}`;
    if(e.target.type === "submit") {
      axios({
        method: "PUT",
        url,
        data: JSON.stringify(updatedCourse),
        headers: {"Content-Type": "application/json"},
        // TODO - update with basic auth
        auth: {
          username: "john23@smith.com",
          password: "password"
        }
        })
        .then(response => {
          if(response.status === 204) {
              navigate(`/courses/${id}`)
          }
      })
        // .then(response => console.log(response.status))
        .catch(error => {
          const validationErrors = error.response.data.errors
          setErrors(validationErrors)
          setIsValid(false)
        })
        // navigate(`/courses/${id}`)
    }
  }

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
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
        <form onClick={e => handleSubmit(e)}>
          <div className="main--flex">
            <div>
              <label>
                Course Title
                <input
                  id="courseTitle"
                  name="courseTitle"
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </label>

              <p>By Joe Smith {course.userId}</p>

              <label>
                Course Description
                <textarea
                  id="courseDescription"
                  name="courseDescription"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
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
                  onChange={e => setTime(e.target.value)}
                />
              </label>

              <label>
                Materials Needed
                <textarea
                  id="materialsNeeded"
                  name="materialsNeeded"
                  value={materialsNeeded}
                  onChange={e => setMaterials(e.target.value)}
                ></textarea>
              </label>
            </div>
          </div>
          <button className="button" type="submit">
            Update Course
          </button>
          <button
            className="button button-secondary"
            onClick={e => handleCancel(e)}
            type="button"
            // onClick="event.preventDefault(); location.href='index.html';"
          >
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};

export default UpdateCourse;
