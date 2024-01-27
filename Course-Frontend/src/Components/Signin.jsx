import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Typography } from "@mui/material";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { userState } from "../store/atoms/user";
import { useState } from "react";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()
  const setUser = useSetRecoilState(userState);

  return (
    <div>
      <div
        style={{
          paddingTop: 150,
          marginBottom: 10,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Typography variant="h6">Welcome back, Sign in below</Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          variant={"outlined"}
          style={{
            width: 400,
            padding: 20,
          }}
        >
          <TextField
            onChange={(evant11) => {
              let elemt = evant11.target;
              setEmail(elemt.value);
            }}
            fullWidth={true}
            label="Email"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />
          <br />
          <br />
          <Button size={"large"} variant="contained"
            onClick={async () => {
              const res = await axios.post("http://localhost:3001/admin/login", {
                username: email,
                password: password
              }, {
                headers: {
                  "Content-type": "application/json"
                }
              });
              const data = res.data;

              localStorage.setItem("token", data.token);
              setUser({
                userEmail: email,
                isLoading: false
              })
              navigate("/courses")
            }}>
            Signin
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default Signin;
