import React from 'react';

const footerStyle={
  display: 'flex',
  justifyContent: 'space-around',
  backgroundColor: 'black',
  alignItems: 'center',
};

const footerText = {
  color: 'white',
  fontSize: '14px'
};

const Footer = () => (
  <footer style={footerStyle}>
    <span style={footerText}>Made by Jon</span>
  </footer>
);

export default Footer;