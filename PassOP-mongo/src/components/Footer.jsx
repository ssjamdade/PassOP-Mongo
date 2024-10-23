import React from 'react';

const Footer = () => {
  return (
    <footer className='bg-slate-800' style={footerStyle}>
      <p className='text-white'>
        Created with <span style={heartStyle}>❤️</span> by Sanket
      </p>
    </footer>
  );
};

const footerStyle = {
  
  textAlign: 'center',
  padding: '2px 0',
  width: '100%',
};

const heartStyle = {
  color: 'red',
  fontSize: '1.5rem',
};

export default Footer;
