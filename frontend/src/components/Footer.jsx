import React from 'react';
import "../styles/Footer.css";

function Footer() {
  return (
    <div className='footer-container'>
      <div className="footer">
        <div className="left">
          <h2>Campus Lost and Found</h2>
          <p>
            Helping students reconnect with their lost belongings
            <br />
            on campus.
          </p>
        </div>
        <div className="social-icons">
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="instagram"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <a 
            href="https://www.facebook.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="facebook"
          >
            <i className="fab fa-facebook"></i>
          </a>
          <a 
            href="https://www.twitter.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="twitter"
          >
            <i className="fab fa-twitter"></i>
          </a>
        </div>
        <div className="right">
          <h1 style={{color: "#2563eb", fontWeight: 700, fontSize: "2rem", lineHeight: "2rem", marginRight: "30px"}}>FoundIT</h1>
          {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH7ZlVkYhGo4keX-fsKuAhCIo1HuA5HrOO5w&s" alt="Logo" width="30px" /> */}
        </div>
      </div>
      <hr />
      <div className="footer-bottom">
        <p>&copy; 2025 FoundIT. All rights reserved.</p>
      </div>
    </div>
  );
}

export default Footer;
