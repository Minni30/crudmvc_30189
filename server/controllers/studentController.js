const Student = require('../models/Student');

// Create a student
exports.createStudent = async (req, res) => {
  try {
    console.log("Received data for new student:", req.body);  // Debugging log
    const student = new Student(req.body);
    await student.save();
    console.log("Student created:", student);  // Debugging log
    res.status(201).json(student);
  } catch (error) {
    console.error('Error creating student:', error);  // More detailed error log
    res.status(400).json({ message: error.message });
  }
};

// Read all students
exports.getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ message: error.message });
  }
};

// Update a student
exports.updateStudent = async (req, res) => {
  try {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    console.log("Student updated:", student);  // Debugging log
    res.json(student);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete a student
exports.deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    console.log(`Student with ID ${req.params.id} deleted.`);  // Debugging log
    res.json({ message: 'Student deleted' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ message: error.message });
  }
};
