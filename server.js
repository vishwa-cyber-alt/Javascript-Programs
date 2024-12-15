const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Import cors

const app = express();

app.use(cors());  // Enable CORS for all routes

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/studentdb') // Updated URI for IPv4
  .then(() => {
    console.log('db connected success');
  })
  .catch((err) => {
    console.log('Error:', err);
  });

const studentschema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  education: String,
});

const studentModel = mongoose.model('Student', studentschema);

app.post('/students', async (req, res) => {
  const { name, education } = req.body;

  try {
    const newStudent = new studentModel({ name, education });
    await newStudent.save();
    res.status(201).json(newStudent);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.get('/students', async (req, res) => {
  try {
    const students = await studentModel.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

app.put("/students/:id", async (req, res) => {
  try {
    const { name, education } = req.body;
    const id = req.params.id;
    const updatedStudent = await studentModel.findByIdAndUpdate(
      id,
      { name, education },
      { new: true }
    )
    if (!updatedStudent) {
      return res.status(404).json({ message: "todo not found" });
    }
    res.json(updatedStudent);
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

app.delete('/students/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await studentModel.findByIdAndDelete(id);
    res.status(204).end();
  }
  catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

const port = 8000;
app.listen(port, () => {
  console.log("Server listening on port " + port);
});
