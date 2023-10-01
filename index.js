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

const userAuthentication = (req, res, next) => {
  const { username, password } = req.headers;
  const user = USERS.find(
    (u) => u.username === username && u.password === password
  );
  if (user) {
    // req.user = user;
    next();
  } else {
    res.status(403).json({ message: "User authentication failed" });
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

app.post("/admin/courses", adminAuthentication, (req, res) => {
  const course = req.body;
  course.id = Date.now(); //use timestamp as course id
  COURSES.push(course);
  res.json({ message: "Course created successfully", courseId: course.id });
});

app.put("/admin/courses/:courseId", adminAuthentication, (req, res) => {
  const courseId = parseInt(req.params.courseId);
  const course = COURSES.find((c) => c.id === courseId);
  if (course) {
    // Object.assign(course,req.body)    //replace in memory the same is doing below two lines
    course.title = req.body.title;
    course.price = req.body.price;
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

app.get("/admin/courses", adminAuthentication, (req, res) => {
  res.json({ courses: COURSES });
});

//users

app.post("/users/signup", (req, res) => {
  //const user = {...req.body, purchasedCourse:[]} //same as below
  const user = {
    username: req.body.username,
    password: req.body.password,
    purchasedCourses: [],
  };
  USERS.push(user);
  res.json({ message: "User created successfully" });
});

app.post("/users/login", userAuthentication, (req, res) => {
  res.json({ message: "Logged in successfully" });
});

app.get("/users/courses", userAuthentication, (req, res) => {
  //COURSES.filter((c) => c.published) modern syntax below is same syntax as this
  let filteredCourses = [];
  for (let i = 0; i < COURSES.length; i++) {
    if (COURSES[i].published) {
      filteredCourses.push(COURSES[i]);
    }
  }
  res.json({ courses: filteredCourses });
});

app.listen(3001, () => {
  console.log("app is listening on port 3001");
});
