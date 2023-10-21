import { Button, Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Courses() {
    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios.get("http://localhost:3001/admin/courses", {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then(res => {
            setCourses(res.data.courses);
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, [])


    return <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>

        {courses.map(course => {
            return <Course course={course} />
        }
        )}
    </div>
}

export function Course(props) {
    const navigate = useNavigate();

    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <Typography textAlign={"center"} variant="h5">{props.course.title}</Typography>
        <Typography textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>
        <img src={props.course.imageLink} style={{ width: 300 }}></img>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + props.course._id);
            }}>Edit</Button>
        </div>
    </Card>
}

export default Courses