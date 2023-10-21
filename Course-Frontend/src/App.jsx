import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Appbar from "./Components/Appbar";
import Signin from "./Components/Signin";
import Signup from "./Components/Signup";
import AddCourse from "./Components/AddCourse";
import Courses from "./Components/Courses";
import Course from "./Components/Course";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import { Landing } from "./Components/Landing";

function App() {
  return (
    <div
      style={{ width: "100vw", height: "100vh", backgroundColor: "#eeeeee" }}
    >

      <RecoilRoot>
        <Router>
          <Appbar />
          <Routes>
            <Route path="/addcourse" element={<AddCourse />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Landing />} />
          </Routes>
        </Router>
      </RecoilRoot>
    </div>

  );
}

export default App;
