import React, { useEffect, useState } from 'react';
import axios from 'axios';

function StudentList() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [grade, setGrade] = useState('');
  const [editingId, setEditingId] = useState(null);

  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(API_URL);
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const saveStudent = async () => {
    try {
      const studentData = { name, age, grade };

      // Debugging: Check what data is being sent
      console.log("Sending student data:", studentData);

      let response;

      if (editingId) {
        // Update student
        response = await axios.put(`${API_URL}/${editingId}`, studentData);
      } else {
        // Create new student
        response = await axios.post(API_URL, studentData);
      }

      if (response.status === 200 || response.status === 201) {
        console.log("Student saved successfully:", response.data);
        // Reset form fields
        setName('');
        setAge('');
        setGrade('');
        // Refresh the list
        fetchStudents();
      } else {
        console.error("Failed to save student:", response.status);
      }

    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const deleteStudent = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      if (response.status === 200) {
        console.log("Student deleted:", id);
        fetchStudents(); // Refresh the student list
      }
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  const editStudent = (student) => {
    setEditingId(student._id);
    setName(student.name);
    setAge(student.age);
    setGrade(student.grade);
  };

  // CSV Download Function
  const downloadAsCSV = () => {
    if (!students || students.length === 0) {
      alert("No student data available for download.");
      return;
    }

    // Generate CSV content with headers
    const headers = "Name,Age,Grade\n";
    const csvContent = students.map(student => 
      `${student.name},${student.age},${student.grade}`
    ).join('\n');
    
    // Blob creation
    const blob = new Blob([headers + csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    // Create a download link
    const link = document.createElement("a");
    link.href = url;
    link.download = "students.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Student List</h2>

      {/* Add/Edit Student Form */}
      <div style={styles.formContainer}>
        <input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          style={styles.input}
        />
        <input 
          placeholder="Age" 
          type="number"
          value={age} 
          onChange={(e) => setAge(e.target.value)} 
          style={styles.input}
        />
        <input 
          placeholder="Grade" 
          value={grade} 
          onChange={(e) => setGrade(e.target.value)} 
          style={styles.input}
        />

        <button 
          onClick={saveStudent} 
          style={{
            ...styles.button,
            backgroundColor: editingId ? '#FFA726' : '#4CAF50',
          }}
        >
          {editingId ? "Update Student" : "Add Student"}
        </button>
      </div>

      <button 
        onClick={downloadAsCSV} 
        style={styles.downloadButton}
      >
        Download CSV
      </button>

      {/* Student List Display */}
      <div style={styles.listContainer}>
        {students.map(student => (
          <div key={student._id} style={styles.listItem}>
            <div style={styles.listItemHeader}>{student.name}</div>
            <div style={styles.listItemDetails}>
              Age: {student.age}<br />
              Grade: {student.grade}
            </div>
            <div style={styles.listButtons}>
              <button 
                onClick={() => editStudent(student)} 
                style={styles.editButton}
              >
                Edit
              </button>
              <button 
                onClick={() => deleteStudent(student._id)} 
                style={styles.deleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '750px',
    margin: '40px auto',
    padding: '35px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
    color: '#333',
  },
  title: {
    textAlign: 'center',
    fontSize: '28px',
    marginBottom: '25px',
    color: '#007BFF',
    fontWeight: 'bold',
  },
  formContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '20px',
    marginBottom: '30px',
  },
  input: {
    padding: '12px',
    width: '100%',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s ease',
  },
  button: {
    padding: '12px 18px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
  },
  downloadButton: {
    padding: '12px 18px',
    marginTop: '15px',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#2196F3',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '16px',
    display: 'block',
    margin: '0 auto',
    transition: 'background-color 0.3s ease',
  },
  listContainer: {
    marginTop: '40px',
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  listItem: {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  listItemHeader: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  listItemDetails: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '20px',
  },
  listButtons: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '12px',
  },
  editButton: {
    backgroundColor: '#28a745',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default StudentList;
