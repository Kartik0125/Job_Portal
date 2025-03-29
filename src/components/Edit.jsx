import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const initial = {
  postId: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [currId] = useState(location.state.id);


  useEffect(() => {
    const fetchInitialPosts = async (id) => {  
      const response = await axios.get(`http://localhost:8080/getJob/${id}`);
      console.log(response.data);
      setForm(response.data);
    };
    fetchInitialPosts(currId);
  }, [currId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios      
      .put("http://localhost:8080/updateJob",form)
      .then((resp) => {
        console.log(resp.data);
        navigate("/", { state: { refresh: true } });
      })
      .catch((error) => {
        console.log(error);
      });
    };


    const handleChange = (e) => {
      const skill = e.target.value;
    
      setForm((prevForm) => {
        const updatedTechStack = prevForm.postTechStack.includes(skill)
          ? prevForm.postTechStack.filter((tech) => tech !== skill) // Remove skill if already selected
          : [...prevForm.postTechStack, skill]; // Add skill if not present
    
        return { ...prevForm, postTechStack: updatedTechStack };
      });
    };
    
    

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
    

  return (
    <Paper sx={{ padding: "1%" }} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Edit New Post
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
            value={form.postId}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            label="Job-Profile"
            variant="outlined"
            value={form.postProfile}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) =>
              setForm({ ...form, reqExperience: e.target.value })
            }
            label="Years of Experience"
            variant="outlined"
            value={form.reqExperience}
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
            value={form.postDesc}
          />
<Box sx={{ margin: "1% auto", width: "60%" }}>
  <h3 style={{ textAlign: "center" }}>Please mention required skills</h3>
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
      gap: "10px",
      maxWidth: "600px", // Ensuring consistency
      margin: "auto",
    }}
  >
    {skillSet.map(({ name }, index) => (
      <Box
        key={index}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "5px",
        }}
      >
        <input
          type="checkbox"
          id={`custom-checkbox-${index}`}
          name={name}
          value={name}
          checked={form.postTechStack.includes(name)}
          onChange={handleChange}
        />
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
};

export default Edit;