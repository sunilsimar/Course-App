const express = require("express");
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

const adminAuthentication = (req, res, next) => {
  const { username, password } = req.headers; // const username = req.headers.username same for password
  const admin = ADMINS.find(
    (a) => a.username === username && a.password === password
  );
  if (admin) {
    next();
  } else {
    res.status(403).json({ message: "Admin authentication failed" });
  }
};

app.post("/admin/singup", (req, res) => {
  const admin = req.body;
  const existingAdmin = ADMINS.find((a) => a.username == admin.username);
  if (existingAdmin) {
    res.status(303).json({ message: "Admin already exists" });
  } else {
    ADMINS.push(admin);
    res.json({ message: "Admin created successfully" });
  }
});

app.post("/admin/login", adminAuthentication, (req, res) => {
  res.json({ message: "Logged in successfully" });
});

app.listen(3001, (req, res) => {
  console.log("app is listening on port 3001");
});
