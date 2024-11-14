import React, { useState } from 'react';
import axios from 'axios';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [studentId, setStudentId] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // To determine message type (success/error)

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleStudentIdChange = (e) => {
    setStudentId(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setMessage('Please select a file.');
      setMessageType('error');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('studentId', studentId);

    try {
      const response = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage('File uploaded and details saved');
      setMessageType('success');
    } catch (error) {
      setMessage('Error uploading file');
      setMessageType('error');
    }
  };

  // Updated CSS styles
  const containerStyle = {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '30px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  };

  const headingStyle = {
    color: '#007BFF',
    fontSize: '26px',
    fontWeight: '600',
    marginBottom: '20px',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    margin: '12px 0',
    border: '1px solid #ddd',
    borderRadius: '8px',
    fontSize: '16px',
    backgroundColor: '#f9f9f9',
    transition: 'border-color 0.3s',
  };

  const inputFocusStyle = {
    ...inputStyle,
    borderColor: '#007BFF',
  };

  const buttonStyle = {
    width: '100%',
    padding: '14px',
    backgroundColor: '#007BFF',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    fontSize: '18px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, transform 0.3s ease',
  };

  const buttonHoverStyle = {
    backgroundColor: '#0056b3',
    transform: 'scale(1.05)',
  };

  const messageStyle = {
    marginTop: '20px',
    fontSize: '16px',
    fontWeight: '500',
    padding: '10px',
    borderRadius: '8px',
    width: '100%',
    textAlign: 'center',
  };

  const errorStyle = {
    backgroundColor: '#f8d7da',
    color: '#721c24',
  };

  const successStyle = {
    backgroundColor: '#d4edda',
    color: '#155724',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Upload a File</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          onChange={handleFileChange}
          style={inputStyle}
          onFocus={(e) => (e.target.style = inputFocusStyle)}
        />
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={handleStudentIdChange}
          style={inputStyle}
        />
        <button
          type="submit"
          style={buttonStyle}
          onMouseOver={(e) => e.target.style = buttonHoverStyle}
          onMouseOut={(e) => e.target.style = buttonStyle}
        >
          Upload
        </button>
      </form>
      {message && (
        <p
          style={{
            ...messageStyle,
            ...(messageType === 'error' ? errorStyle : successStyle),
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default FileUpload;
