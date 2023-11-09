import "./App.css";
import { Routes, Route, Link, NavLink } from "react-router-dom";
import CourseDetail from "./components/CourseDetail";
import Courses from "./components/Courses";
import CreateCourse from "./components/CreateCourse"
import Header from "./components/Header";
import UpdateCourse from "./components/UpdateCourse";
import UserSignIn from "./components/UserSignIn";
import UserSignOut from "./components/UserSignOut";
import UserSignUp from "./components/UserSignUp";




function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Courses />}></Route>
        <Route path="/courses/create" element={<CreateCourse />}></Route>
        <Route path="/courses/:id/update" element={<UpdateCourse />}></Route>
        <Route path="/courses/:id" element={<CourseDetail />}></Route>
        <Route path="signin" element={<UserSignIn />}></Route>
        <Route path="signup" element={<UserSignUp />}></Route>
        <Route path="signout" element={<UserSignOut />}></Route>
      </Routes>
    </>
  )
}

export default App;
