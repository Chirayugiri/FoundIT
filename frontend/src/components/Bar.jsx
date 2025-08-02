import React from "react";
import "../styles/Bar.css";

function Bar(props) {

  return (
    <div className="bar">
      <h2 style={{fontSize: '26px', fontWeight: 'bold'}}>{props.title} Items</h2>
      {/* Use navigate function correctly */}
      <a href="#"
        onClick={(e) => {
          e.preventDefault();
        }}>
          {/* link */}
          <h3>See all</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "30px", height: "30px", verticalAlign: "middle" }}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
      </a>
    </div>
  );
}

export default Bar;
