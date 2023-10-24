# Course-App
Course Selling Website
This repository contains the source code for the admin dashboard of a Course Selling Website. The dashboard is built using React for the frontend and Node.js with Express for the backend. MongoDB is used as the database to manage course information. The repository is structured into two main components: the frontend and the backend.

Frontend (admin-client)
The frontend of the Course Selling Website's admin dashboard is built with React. It provides a user-friendly interface for administrators to manage courses, add courses, edit courses. For administrators, the interface also includes signup, signin, and logout options.

Prerequisites
Before running the frontend, ensure you have Node.js and npm (Node Package Manager) installed on your system.

Setup and Usage
0. Open terminal and make sure you are in the right directory:
git clone https://github.com/sunilsimar/Course-App.git
1. Navigate to the Course-Frontend directory:
cd Course-Frontend
2. Install the required dependencies:
npm install
3. Start the development server:
npm run dev
This will start the development server and open the admin dashboard in your default web browser.

Backend (Server)
The backend of the Course Selling Website is built using Node.js and Express. It provides API endpoints for managing courses and user accounts, as well as authentication middleware for secure access using JWT.

Prerequisites
Before running the backend, ensure you have Node.js and MongoDB installed on your system. The mongoDB connection is on the cloud, DON'T MISUSE IT.

Setup and Usage
0. Navigate to the server directory:
cd server
1. Install the required dependencies:
npm install
2. Start the server:
node index.js
The server will start running at http://localhost:3001

Project Structure
server/db : Mongoose Schema Defined.
server/middleware : Contains authentication middleware using JWT.
server/routes/admin : Defines the API routes for signup, login, post courses, editing courses, getting a particular course, and getting all courses.
server/routes/user : Defines the API routes for signup, login, getting all courses which are published, buying a particular course, and getting all purchased courses.
API Endpoints - admin.js
Method	End-Point	Description
GET	/me	Check Admin exist & get Username
POST	/signup	Signup as a new admin
POST	/login	login as existing admin
POST	/courses	Create a specific course
PUT	/courses/:courseId	Edit existing course
GET	/courses	List all course
GET	/course/:courseId	List specific course
API Endpoints - user.js
Method	End-Point	Description
POST	/signup	Signup as a new user
POST	/login	login as existing user
GET	/courses	Get all published course
POST	/courses/:courseId	Purchase a specific course
GET	/purchasedCourses	List all purchased course
Feel free to contribute to this project, report issues, or suggest improvements. Happy coding!
