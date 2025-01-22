import React from 'react';
import "../styles/Category.css";
import { Link } from 'react-router-dom';

function Category({ state }) {
    const items = state.items || [];

    // Function to count items by category
    function countItems(category){
        return items.filter(item => item.itemType === category).length;
    };

    // Category counts
    const personalCount = countItems("personal item");
    const electronicCount = countItems("electronic");
    const bookCount = countItems("book");
    const otherCount = countItems("other")

    return (
        <div className="category">
            <h2>Explore Lost Items by Category</h2>
            <p id="cat-p1">Browse through the categories to find your lost items.</p>

            <div className="flex">
                <Link to="/categoryproduct" state={{ currCategory: 'electronic' }}>
                    <div className="smallCat">
                        <i className="fas fa-laptop" style={{ color: "#0065ea" }}></i>
                        <h3>Electronics</h3>
                        <p>{electronicCount} items found</p>
                    </div>
                </Link>
                <Link to="/categoryproduct" state={{ currCategory: 'book' }}>
                    <div className="smallCat">
                        <i className="fas fa-book" style={{ color: "#9f2ce7" }}></i>
                        <h3>Books</h3>
                        <p>{bookCount} items found</p>
                    </div>
                </Link>
                <Link to="/categoryproduct" state={{ currCategory: 'personal item' }}>
                    <div className="smallCat">
                        <i className="fas fa-wallet" style={{ color: "#ff6a00" }}></i>
                        <h3>Personal Items</h3>
                        <p>{personalCount} items found</p>
                    </div>
                </Link>
                <Link to="/categoryproduct" state={{ passCategory: 'all' }}>
                    <div className="smallCat">
                        <i className="fas fa-layer-group" style={{ color: "#00c867" }}></i>
                        <h3>Others</h3>
                        <p>{otherCount} items found</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Category;
