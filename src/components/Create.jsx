import React, { useState } from "react";
import axios from "axios";
import {
  Typography,
  TextField,
  Button,
  Paper,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
const initial = { postId:"",postProfile: "", reqExperience: 0, postTechStack: [], postDesc:"" };


const Create = () => {
  const skillSet = [
    { name: "JavaScript" },
    { name: "Java" },
    { name: "Python" },
    { name: "Django" },
    { name: "Rust" },
    { name: "Node.js" },
    { name: "React.js" },
    { name: "Angular" },
    { name: "Vue.js" },
    { name: "Spring Boot" },
    { name: "Express.js" },
    { name: "MongoDB" },
    { name: "MySQL" },
    { name: "PostgreSQL" },
    { name: "Redis" },
    { name: "Kotlin" },
    { name: "Flutter" },
    { name: "AWS" },
    { name: "Azure" },
    { name: "GCP" },
  ];

  const navigate = useNavigate();
  const [form, setForm] = useState(initial);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/addJob",form)
      .then((resp) => {
        console.log(resp.data);
        navigate('/',{ state: { refresh: true } });
      })
      .catch((error) => {
        console.log(error);
      });
    };


  const { postId, postProfile, reqExperience, postDesc } = form;

  const handleChange = (e) => {
    setForm({...form , postTechStack : [...form.postTechStack, e.target.value]});
  }

  return (
    <Paper sx={{ padding:"1%"}} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Create New Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
           <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            
            onChange={(e) => setForm({ ...form, postId: e.target.value })}
            label="Enter your Post ID"
            variant="outlined"
            value={postId}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            label="Job-Profile"
            variant="outlined"
            value={postProfile}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, reqExperience: e.target.value })}
            label="Years of Experience"
            variant="outlined"
            value={reqExperience}
          />
           <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
            label="Job-desc"
            variant="outlined"
            value={postDesc}
          />
<Box sx={{ margin: "1% auto", width: "60%" }}>
<h3 style={{ textAlign: "center" }}>Please mention required skills</h3>
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      gap: "10px",
      maxWidth: "600px",
      margin: "auto",
    }}
  >
    {skillSet.map(({ name }, index) => (
      <Box key={index} sx={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px" }}>
        <input type="checkbox" id={`custom-checkbox-${index}`} name={name} value={name} onChange={handleChange} />
        <label htmlFor={`custom-checkbox-${index}`} style={{ marginLeft: "5px" }}>
          {name}
        </label>
      </Box>
    ))}
  </Box>
</Box>

          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

export default Create