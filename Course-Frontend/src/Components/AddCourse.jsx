import { Button, Card, TextField } from "@mui/material";
import { useState } from "react";
import axios from "axios"

function AddCourse() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("")
  const [price, setPrice] = useState(0)

  return (
    <div style={{ display: "flex", justifyContent: "center", minHeight: "80vh", }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Card
          variant="outlined"
          style={{
            width: 400,
            padding: 20,
            marginTop: 150,
            height: 300
          }}
        >
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            fullWidth={true}
            label="Title"
            variant="outlined"
          />
          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e1) => {
              setDescription(e1.target.value);
            }}
            fullWidth={true}
            label="Description"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e1) => {
              setImage(e1.target.value);
            }}
            fullWidth={true}
            label="Image link"
            variant="outlined"
          />

          <TextField
            style={{ marginBottom: 10 }}
            onChange={(e1) => {
              setPrice(e1.target.value);
            }}
            fullWidth={true}
            label="Price"
            variant="outlined"
          />

          <Button
            size={"large"}
            variant="contained"
            onClick={async () => {
              await axios.post("http://localhost:3001/admin/courses", {
                title: title,
                description: description,
                imageLink: image,
                published: true,
                price
              }, {
                headers: {
                  "Authorization": "Bearer " + localStorage.getItem("token"),
                },
              });
              alert("Added course")
            }}
          >
            Add Course
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default AddCourse;
