const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const app = express();

app.use(express.json());

//using jwt(jsonwebtoken its provide security to password like cryptography)

const secretKey = "YOUR_SECRET_KEY";

//define mongoose schemas
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
});

const adminSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

//Define mongoose models where User,Admin,Course are collections
const User = mongoose.model("User", userSchema);
const Admin = mongoose.model("Admin", adminSchema);
const Course = mongoose.model("Course", courseSchema);

const authenticateJwt = (req, res, next) => {
  const authHeader = req.headers.authorization; //its in postman headers

  if (authHeader) {
    const token = authHeader.split(" ")[1]; //because in authorization there is a bearer+ string(we need only this)

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

//connect to mongoose
// mongoose.connect(
  // "mongodb+srv://KartikSimar:kartik@123@cluster0.xudjh4u.mongodb.net/Course",
  mongoose.connect('mongodb+srv://Sunil:npyZO4sqdoGOsFnO@cluster0.x9grnfl.mongodb.net/Backend', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });
//   { useNewUrlParser: true, useUnifiedTopology: true, dbName: Course }

const generateJwt = (user) => {
  const payload = { username: user.username };
  return jwt.sign(payload, secretKey, { expiresIN: "1h" });
};

//admin routes
app.post("/admin/singup", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (admin) {
    res.status(303).json({ message: "Admin already exists" });
  } else {
    const newAdmin = new Admin({ username, password });
    await newAdmin.save();
    const token = jwt.sign({ username, role: "admin" }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "Admin created successfully", token });
  }
});

app.post("/admin/login", async (req, res) => {
  const { username, password } = req.headers;
  const admin = await Admin.findOne({ username, password });
  if (admin) {
    const token = jwt.sign({ username, role: "admin" }, secretKey, {
      expiresIn: "1h",
    });
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.post("/admin/courses", authenticateJwt, async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.json({ message: "Course created successfully", courseId: course.id });
});

app.put("/admin/courses/:courseId", authenticateJwt, async(req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {new:true}); //mongoose function
  if (course) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

app.get("/admin/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({});
  res.json({ courses });
});

//users routes
app.post("/users/signup", async(req, res) => {
  const{username, password} = req.body;
  const user = await User.findOne({username});
  if (user) {
    res.status(403).json({ message: "User already exist" });
  } else {
    const newUser = new User({username, password});
    await newUser.save();
    const token = jwt.sign({username, role:'user'},secretKey,{expiresIn:'1h'})
    res.json({ message: "User created successfully" });
  }
});

app.post("/users/login", async(req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({username,password})
  if (user) {
    const token = jwt.sign({username,role:'user'},secretKey,{expiresIn:'1h'})
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "Invalid username or password" });
  }
});

app.get("/users/courses", authenticateJwt, async(req, res) => {
  const course = await Course.find({published: true});
  res.json({course});
});

app.post("/users/courses/:courseId", authenticateJwt, async(req, res) => {
  const course = await Course.findById(req.params.courseId);
  if (course) {
    const user = User.findOne({username:req.user.username})
    if (user) {
      user.purchasedCourses.push(course);
      await user.save();
      res.json({ message: "Course purchased successfully" });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } else {
    res.status(404).json({ message: "Course not found" });
  }
});

app.get("/users/purchasedCourses", authenticateJwt, async(req, res) => {
  const user = await User.findOne({username:req.user.username}).populate('purchasedCourses');
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] });
  } else {
    res.status(404).json({ message: "User not found" });
  }
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
