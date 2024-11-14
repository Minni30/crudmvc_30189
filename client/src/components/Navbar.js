import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={styles.navbar}>
      <h1 style={styles.title}>CRUD MVC</h1>
      <div style={styles.linkContainer}>
        <StyledLink to="/students">Students</StyledLink>
        <StyledLink to="/faculty">Faculty</StyledLink>
        <StyledLink to="/upload">Upload</StyledLink>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    backgroundColor: '#121212',  // Darker, minimalist background
    padding: '20px 50px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
    position: 'sticky',
    top: '0',
    zIndex: '1000',
  },
  title: {
    color: '#FFFFFF',  // White text for the title
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '1.2px',
    margin: '0',
    transition: 'color 0.3s ease',
  },
  linkContainer: {
    display: 'flex',
    gap: '25px',
    alignItems: 'center',
  },
  link: {
    color: '#b3b3b3',  // Light gray text for links
    textDecoration: 'none',
    fontSize: '16px',
    fontWeight: '500',
    position: 'relative',
    padding: '5px 0',
    transition: 'color 0.3s ease',
  },
  linkHover: {
    color: '#ffffff',  // Change to white on hover
  },
  underline: {
    content: "''",
    position: 'absolute',
    width: '100%',
    height: '2px',
    backgroundColor: '#ffffff',  // White underline on hover
    left: '0',
    bottom: '-3px',
    transform: 'scaleX(0)',
    transition: 'transform 0.3s ease',
  },
};

// StyledLink component to apply hover styles dynamically with underline effect
const StyledLink = ({ to, children }) => (
  <Link
    to={to}
    style={styles.link}
    onMouseEnter={(e) => {
      e.target.style.color = styles.linkHover.color;
      e.target.querySelector('.underline').style.transform = 'scaleX(1)';
    }}
    onMouseLeave={(e) => {
      e.target.style.color = styles.link.color;
      e.target.querySelector('.underline').style.transform = 'scaleX(0)';
    }}
  >
    {children}
    <span className="underline" style={styles.underline}></span>
  </Link>
);

export default Navbar;