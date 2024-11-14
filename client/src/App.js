import React from 'react';
import StudentList from './components/StudentList';
import FacultyList from './components/FacultyList';
import BulkUpload from './components/FileUpload';
import './App.css';  // If you have a CSS file for styling

function App() {
  return (
    <div className="app-container">
      <h1>Student Management System</h1>

      <div className="components-container">
        <section>
          <h2>Students</h2>
          <StudentList />
        </section>

        <section>
          <h2>Faculty</h2>
          <FacultyList />
        </section>

        <section>
          <h2>Bulk Upload</h2>
          <BulkUpload />
        </section>
      </div>
    </div>
  );
}

export default App;
