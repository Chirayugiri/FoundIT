import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { Link, useLocation } from "react-router-dom";

function AllProducts() {
  const location = useLocation();
  const { items = [] } = location.state || [];
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(""); 
  const [filter, setFilter] = useState("allfound");
  const [filteredItems, setFilteredItems] = useState([]);

  function formatDate(timestamp) {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      const options = { year: "numeric", month: "short", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
    return "Invalid Date";
  }

  function filterRecentItems() {
    const currentDate = new Date();
    return items.filter((item) => {
      const itemDate = new Date(item.date.seconds * 1000);
      const timeDiff = currentDate - itemDate;
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24);
      return daysDiff <= 3;
    });
  }

  const updateFilteredItems = () => {
    let newFilteredItems = filter === "recent" ? filterRecentItems() : items;

    if (category) {
      newFilteredItems = newFilteredItems.filter((item) => item.itemType === category);
    }

    if (search) {
      newFilteredItems = newFilteredItems.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredItems(newFilteredItems);
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCategory(""); // Clear the category when searching
    setFilteredItems([]); // Clear previous results
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCategory(value);
    setSearch(""); // Clear the search when changing category
    setFilteredItems([]); // Clear previous results
  };

  useEffect(() => {
    updateFilteredItems();
  }, [search, category, filter]);

  return (
    <div className="products allproducts">
      <div className="filters">
        <h2>Found Items</h2>
        <input
          type="search"
          name="search"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search Items..."
        />
        <select
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        >
          <option value="allfound">All Found</option>
          <option value="recent">Recently Found</option>
        </select>

        <select
          onChange={handleCategoryChange}
          value={category}
        >
          <option value="">--Category--</option>
          <option value="electronic">Electronic</option>
          <option value="personal item">Personal Items</option>
          <option value="book">Book</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex">
        {filteredItems.length === 0 ? (
          <div
            style={{
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              width: "100%",
            }}
          >
            No items found
          </div>
        ) : (
          filteredItems.map((item) => (
            <Link to="/productDetail" state={{ item }} key={item.uid}>
              <ProductCard
                key={item.id}
                path={item.imageUrl}
                title={item.title}
                date={formatDate(item.date)}
                category={item.itemType}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default AllProducts;
