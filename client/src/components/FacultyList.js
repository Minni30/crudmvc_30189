import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FacultyList() {
  const [facultyList, setFacultyList] = useState([]);
  const [name, setName] = useState('');
  const [department, setDepartment] = useState('');
  const [experience, setExperience] = useState('');
  const [editingId, setEditingId] = useState(null);

  const FACULTY_API_URL = process.env.REACT_APP_FACULTY_API_URL;

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await axios.get(FACULTY_API_URL);
      setFacultyList(response.data);
    } catch (error) {
      console.error("Error fetching faculty:", error);
    }
  };

  const saveFaculty = async () => {
    if (!name || !department || !experience) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const facultyData = { name, department, experience };

      if (editingId) {
        await axios.put(`${FACULTY_API_URL}/${editingId}`, facultyData);
        setEditingId(null);
      } else {
        await axios.post(FACULTY_API_URL, facultyData);
      }

      setName('');
      setDepartment('');
      setExperience('');
      fetchFaculty();
    } catch (error) {
      console.error("Error saving faculty:", error);
    }
  };

  const deleteFaculty = async (id) => {
    try {
      await axios.delete(`${FACULTY_API_URL}/${id}`);
      fetchFaculty();
    } catch (error) {
      console.error("Error deleting faculty:", error);
    }
  };

  const editFaculty = (member) => {
    setEditingId(member._id);
    setName(member.name);
    setDepartment(member.department);
    setExperience(member.experience);
  };

  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '40px',
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#fafafa',
      borderRadius: '10px',
      boxShadow: '0px 10px 25px rgba(0, 0, 0, 0.1)',
      fontSize: '16px',
      lineHeight: '1.6',
      color: '#333',
    },
    title: {
      textAlign: 'center',
      fontSize: '28px',
      marginBottom: '20px',
      color: '#007BFF',
      fontWeight: 'bold',
    },
    input: {
      display: 'block',
      margin: '12px 0',
      padding: '14px 16px',
      width: '100%',
      borderRadius: '8px',
      border: '1px solid #ddd',
      backgroundColor: '#f7f7f7',
      fontSize: '16px',
      transition: 'all 0.3s ease',
    },
    inputFocus: {
      borderColor: '#007BFF',
      backgroundColor: '#ffffff',
    },
    button: {
      padding: '14px 20px',
      margin: '12px 0',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      backgroundColor: '#007BFF',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      transition: 'background-color 0.3s ease',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
    },
    listContainer: {
      marginTop: '30px',
    },
    listItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px',
      borderRadius: '8px',
      backgroundColor: '#fff',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      marginBottom: '15px',
      transition: 'all 0.3s ease',
    },
    listItemHover: {
      backgroundColor: '#f9f9f9',
    },
    listButtons: {
      display: 'flex',
      gap: '12px',
    },
    editButton: {
      backgroundColor: '#28a745',
      color: 'white',
      padding: '10px 18px',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    editButtonHover: {
      backgroundColor: '#218838',
    },
    deleteButton: {
      backgroundColor: '#dc3545',
      color: 'white',
      padding: '10px 18px',
      borderRadius: '6px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    deleteButtonHover: {
      backgroundColor: '#c82333',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Faculty List</h2>
      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={styles.input}
        onFocus={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
        onBlur={(e) => e.target.style = {...styles.input, ...styles.inputFocus}}
      />
      <input
        placeholder="Department"
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        style={styles.input}
      />
      <input
        placeholder="Experience (years)"
        type="number"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        style={styles.input}
      />
      <button
        onClick={saveFaculty}
        style={styles.button}
        onMouseOver={(e) => e.target.style.backgroundColor = styles.buttonHover.backgroundColor}
        onMouseOut={(e) => e.target.style.backgroundColor = styles.button.backgroundColor}
      >
        {editingId ? "Update Faculty" : "Add Faculty"}
      </button>

      <div style={styles.listContainer}>
        {facultyList.map((member) => (
          <div
            key={member._id}
            style={{...styles.listItem, ...styles.listItemHover}}
            onMouseOver={(e) => e.target.style.backgroundColor = '#f1f1f1'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#fff'}
          >
            <span>
              {member.name} - {member.department} - {member.experience} years
            </span>
            <div style={styles.listButtons}>
              <button
                onClick={() => editFaculty(member)}
                style={styles.editButton}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.editButtonHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.editButton.backgroundColor}
              >
                Edit
              </button>
              <button
                onClick={() => deleteFaculty(member._id)}
                style={styles.deleteButton}
                onMouseOver={(e) => e.target.style.backgroundColor = styles.deleteButtonHover.backgroundColor}
                onMouseOut={(e) => e.target.style.backgroundColor = styles.deleteButton.backgroundColor}
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

export default FacultyList;
