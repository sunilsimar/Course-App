import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./Components/Appbar";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import AddCourse from "./Components/AddCourse";
import Courses from "./Components/Courses";
import Course from "./Components/Course";
import {
  RecoilRoot,
} from 'recoil';
import { Landing } from "./Components/Landing";
import { userState } from "./store/atoms/user";
import axios from "axios";
import { useEffect } from "react";
import { useSetRecoilState, } from "recoil";

function App() {
  return (
    <RecoilRoot>
      <div
        style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
      >
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Router>
      </div >
    </RecoilRoot>


  );
}

function InitUser() {
  const setUser = useSetRecoilState(userState);
  const init = async () => {
    try {
      const response = await axios.get("http://localhost:3001/admin/me", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })

      if (response.data.username) {
        setUser({
          isLoading: false,
          userEmail: response.data.username
        })
      } else {
        setUser({
          isLoading: false,
          userEmail: null
        })
      }
    } catch (e) {

      setUser({
        isLoading: false,
        userEmail: null
      })
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>
}


export default App;
