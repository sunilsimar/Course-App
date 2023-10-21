import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Appbar() {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  const init = async () => {
    const response = await axios.get("http://localhost:3001/admin/me", {
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    })

    if (response.data.username) {
      setUserEmail(response.data.username)
    }
  }

  useEffect(() => {
    init();
  }, []);

  // useEffect(() => {

  //   function callback2(data) {
  //     if (data.username) {
  //       setUserEmail(data.username)
  //     }
  //   }

  //   function callback1(res) {
  //     res.json().then(callback2)
  //   }

  //   fetch("http://localhost:3001/admin/me", {
  //     method: "GET",
  //     headers: {
  //       "Authorization": "Bearer " + localStorage.getItem("token")
  //     }
  //   }).then(callback1)
  // }, []);

  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
        }}
      >
        <div>
          <Typography variant="h6">CourseApp</Typography>
        </div>

        <div style={{ display: "flex" }}>
          {/* <div>{userEmail}</div> */}

          <div>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/addcourse");
              }}
            >
              ADD Course
            </Button>
          </div>

          <div style={{ display: "flex" }}>
            <div style={{ marginRight: 10 }}></div>
            <Button
              variant="contained"
              onClick={() => {
                navigate("/courses");
              }}
            >
              Courses
            </Button>
          </div>
          <div style={{ marginRight: 10, marginLeft: 10 }}>
            <Button
              variant="contained"
              onClick={() => {
                localStorage.setItem("token", null);
                window.location = "/"

              }}
            >
              Logout
            </Button>
          </div>

        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4,
      }}
    >
      <div>
        <Typography variant="h6">CourseApp</Typography>
      </div>

      <div style={{ display: "flex" }}>
        <div style={{ marginRight: 10 }}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signup");
            }}
          >
            Signup
          </Button>
        </div>
        <div>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/signin");
            }}
          >
            Signin
          </Button>
        </div>

        {/* <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}></div>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/addcourse");
            }}
          >
            AddCourse
          </Button>

        </div> */}
      </div>
    </div>
  );
}

export default Appbar;
