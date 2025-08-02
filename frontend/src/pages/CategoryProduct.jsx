import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useLocation, Link } from "react-router-dom";
import Loader from "../components/Loader.jsx";

function CategoryProduct() {
  const location = useLocation();

  const [items, setItems] = useState([]);
  const [currCategory, setCurrCategory] = useState(location.state?.currCategory || "");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("allfound"); // Track selected filter (recent or allfound)

  const [isLoading, setLoading] = useState(true);

  // Use useEffect to fetch items initially
  useEffect(() => {
    async function fetchAllItems() {
      try {
        const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/allProducts`, {
          method: "GET",
        });
        const data = await result.json();
        setItems(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    }
    fetchAllItems();
  }, []);

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
      const itemDate = new Date(formatDate(item.date));
      const timeDiff = currentDate - itemDate; // Difference in milliseconds
      const daysDiff = timeDiff / (1000 * 60 * 60 * 24); // Convert to days
      return daysDiff <= 3; // Check if it's within 3 days
    });
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    setCurrCategory(""); // Clear the category when searching
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setCurrCategory(value);
    setSearch(""); // Clear the search when changing category
  };

  // Function to get filtered items based on search, category, and filter
  function getFilteredItems() {
    let filteredItems = filter === "recent" ? filterRecentItems() : items;

    // Apply category and search filters
    if (search) {
      filteredItems = filteredItems.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (currCategory && currCategory !== "") {
      filteredItems = filteredItems.filter((item) => item.itemType === currCategory);
    }

    // Remove duplicate items by ensuring unique 'uid'
    filteredItems = Array.from(new Set(filteredItems.map(item => item.uid)))
      .map(uid => filteredItems.find(item => item.uid === uid));

    // If no items match, show a message
    return filteredItems.length === 0 ? (
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
            key={item.id} // Ensure a unique key for each component
            path={item.imageUrl}
            title={item.title}
            date={formatDate(item.date)}
            category={item.itemType}
          />
        </Link>
      ))
    );
  }

  return (
    <div className="products allproducts">
      <div className="filters">
        <h2 style={{fontSize: '26px', fontWeight: 'bold'}}>Found Items</h2>
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
          value={currCategory}
        >
          <option value="">--Category--</option>
          <option value="electronic">Electronic</option>
          <option value="personal item">Personal Items</option>
          <option value="book">Book</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex">{
        isLoading === true ? <Loader />
          :
          getFilteredItems()
      }</div>
    </div>
  );
}

export default CategoryProduct;
