import { Card, Typography, Button, TextField, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Course() {
  let { courseId } = useParams();
  const [course, setCourse] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/admin/courses/" + courseId, {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + localStorage.getItem("token")
      }
    }).then(res => {
      setCourse(res.data.course);
    });
  }, []);


  if (!course) {
    return <div style={{ height: "100vh", justifyContent: "center", flexDirection: "column" }}>
      Loading......
    </div>
  }

  return <div>
    <GrayTopper title={course.title} />
    <Grid container>
      <Grid item lg={8} md={12} sm={12}>
        <UpdateCard course={course} setCourse={setCourse} />
      </Grid>
      <Grid item lg={4} md={12} sm={12}>
        <CourseCard course={course} />
      </Grid>
    </Grid>
  </div>
}

function GrayTopper({ title }) {
  return <div style={{ height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
    <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
      <div>
        <Typography style={{ color: "white", fontWeight: 600 }} variant="h3" textAlign={"center"}>
          {title}
        </Typography>
      </div>
    </div>
  </div>
}



function UpdateCard({ course, setCourse }) {
  const [title, setTitle] = useState(course.title);
  const [description, setDescription] = useState(course.description);
  const [image, setImage] = useState(course.imageLink)
  const [price, setPrice] = useState(course.price);

  return <div
    style={{
      display: "flex",
      justifyContent: "center",
    }}
  >
    <Card
      variant="outlined"
      style={{
        maxwidth: 600,
        marginTop: 200,
        width: 500,
        height: 400
      }}
    >
      <div style={{ padding: 20 }}>
        <Typography style={{ marginBottom: 10 }}>Update course detail</Typography>
        <TextField
          value={title}
          style={{ marginBottom: 10 }}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          fullWidth={true}
          label="Title"
          variant="outlined"
        />

        <TextField
          value={description}
          style={{ marginBottom: 10 }}
          onChange={(e1) => {
            setDescription(e1.target.value);
          }}
          fullWidth={true}
          label="Description"
          variant="outlined"
        />

        <TextField
          value={image}
          style={{ marginBottom: 10 }}
          onChange={(e1) => {
            setImage(e1.target.value);
          }}
          fullWidth={true}
          label="Image link"
          variant="outlined"
        />

        <TextField
          value={price}
          style={{ marginBottom: 10 }}
          onChange={(e1) => {
            setPrice(e1.target.value);
          }}
          fullWidth={true}
          label="Price"
          variant="outlined"
        />

        <Button

          variant="contained"
          onClick={async () => {
            axios.put("http://localhost:3001/admin/courses/" + course._id, {
              title: title,
              description: description,
              imageLink: image,
              published: true,
              price
            }, {
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token"),
              }
            });

            let updatedCourse = {
              _id: course._id,
              title: title,
              description: description,
              imageLink: image,
              price
            };
            setCourse(updatedCourse)
          }}
        >
          Update Course
        </Button>
      </div>
    </Card>
  </div>
}

function CourseCard(props) {
  return <div style={{ display: "flex", marginTop: 50, justifyContent: "center", width: "100%" }}>
    <Card style={{
      margin: 10,
      width: 300,
      minHeight: 200,
      borderRadius: 20,
      marginRight: 50,
      paddingBottom: 15,
      zIndex: 2
    }}>
      <img src={props.course.imageLink} style={{ widht: 350 }}></img>
      <div style={{ marginBottom: 10 }}>
        <Typography variant="h5">{props.course.title}</Typography>
        <Typography variant="subtitle2" style={{ color: "gray" }}>
          Price
        </Typography>
        <Typography variant="subtitle1" >
          <b>Rs {props.course.price} </b>
        </Typography>
      </div>
    </Card>
  </div>
}

export default Course;