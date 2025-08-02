import React, { useEffect, useState } from "react";
import { auth } from "../Config/config.js";
import { useNavigate } from 'react-router-dom'; 

function MyClaimRequests() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  const currUserId = auth?.currentUser?.uid;
  console.log("Curr user id: ", currUserId);

  useEffect(() => {
    async function getMyClaimRequests() {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/claim/${currUserId}`);
        const data = await response.json();
        if (Array.isArray(data)) {
          setItems(data);
        } else {
          setItems([]); // Handle case where data is not an array.
        }
      } catch (err) {
        console.error(err);
        setItems([]); // Handle error by setting items to empty array
      }
    }
  
    getMyClaimRequests();
  }, [currUserId]);
  

  function formatDate(timestamp) {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      const options = { year: "numeric", month: "short", day: "numeric" };
      return date.toLocaleDateString("en-US", options); // Format to "Dec 12, 2024"
    }
    return "Invalid Date";
  }

  return (
    <div className="products allproducts">
      <div className="filters">
        <h2 style={{fontSize: '26px'}}>My Claim Requests</h2>
        <input
          type="search"
          name="search"
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search Items..."
        />
      </div>
      <div className="myReports">
        {items && Array.isArray(items) && items.length === 0 ? (
          <div style={{ width: "100%", height: "300px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px" }}>
            <p>No Reports Found!</p>
          </div>
        ) : (
          <table className="w-[75%] mx-auto">
            <thead>
              <tr className="text-left text-gray-500">
                <th className="py-2">Photo</th>
                <th className="py-2">Title</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(items) &&
                items
                  .filter((item) => (search === '' ? true : item.title.toLowerCase().includes(search.toLowerCase())))
                  .map((item) => {
                    let imgSrc = item.imageUrl;
                    if (imgSrc === 'NA') {
                      imgSrc = "https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small_2x/no-image-available-icon-vector.jpg";
                    }

                    return (
                      <tr
                        className="border-t cursor-pointer mb-50"
                        onClick={() => navigate('/productDetail', { state: { item } })}
                        key={item.uid}
                      >
                        <td className="py-2">
                          <img alt="img" height="50px" src={imgSrc} width="90px" />
                        </td>
                        <td className="py-2">{item.title}</td>
                        <td className="py-2">{formatDate(item.date)}</td>
                        <td
                          className="py-2"
                          style={{
                            color: item.status === 'pending' ? 'rgb(247 176 0)' : 'green',
                          }}
                        >
                          {item.status === 'returned' ? 'claimed' : 'pending'}
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default MyClaimRequests;
