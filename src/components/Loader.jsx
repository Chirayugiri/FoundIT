import React from 'react'
import "../styles/Loader.css";

function Loader() {
  return (
    <div className="loaderDiv">
        <div className="dot-spinner">
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
            <div className="dot-spinner__dot" />
        </div>
    </div>
  )
}

export default Loader