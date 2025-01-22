import React from 'react'
import '../styles/ProductCard.css';

function ProductCard(props) {
  return (
    <div className="card">
      <div className="sub1">
        <img src={props.path} width="100%" />
      </div>
      <div className="sub2">
        <div className="subInfo">
          <h3>{props.title}</h3>
          <p>{props.date}</p>
        </div>
        <p>{props.category}</p>
      </div>
    </div>
  )
}

export default ProductCard;


// <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="width: 100%; height: 100%" viewBox="0 0 24 25" preserveAspectRatio="none" width="100%" height="100%"><use href="#svg-1909020957_442"></use></svg>
