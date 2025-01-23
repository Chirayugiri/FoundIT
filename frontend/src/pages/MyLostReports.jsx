import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard.jsx";
import {auth} from "../Config/config.js"
import { query } from "firebase/firestore";

function MyLostReports() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const currUserId = auth?.currentUser?.uid;
    console.log("Curr user id: ",currUserId);

    async function getLostReports() {
        const response = await fetch(`http://localhost:9000/product/reports/${currUserId}`);
        const data = await response.json();
        setItems(data);
        console.log(data);
    }

    getLostReports();
  }, [])

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
        <h2>My Lost Reports</h2>
        <input
          type="search"
          name="search"
          onChange={(e) => {
            setSearch(e.target.value);
            // setCategory(""); // Reset category on new search
          }}
          placeholder="Search Items..."
        />

      </div>
      <div className="myReports"> 

      {
        items.length == 0 ? <div style={{width: "100%", height:"300px", display: "flex", justifyContent: "center", alignItems: "center", fontSize: "20px"}}>
          <p>No Reports Found!</p>
        </div>
        :
        <table class="w-full">
      <thead>
       <tr class="text-left text-gray-500">
        <th class="py-2">
         Photo
        </th>
        <th class="py-2">
         Title
        </th>
        <th class="py-2">
         Date
        </th>
        <th class="py-2">
         Status
        </th>
       </tr>
      </thead>
      <tbody>
        {
            items.filter((item)=>{
                return search === ''? item :item.title.toLowerCase().includes(search.toLowerCase())
            }).map((product)=>{
                let imgSrc = product.imageUrl;
                if(imgSrc === 'NA'){
                    imgSrc = "https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small_2x/no-image-available-icon-vector.jpg";
                }
                console.log(imgSrc);
                return <tr class="border-t">
                <td class="py-2">
                 <img alt="img" height="90px" src={imgSrc} width="100px"/>
                </td>
                <td class="py-2">
                  {product.title}
                </td>
                <td class="py-2">
                  {formatDate(product.date)}
                </td>
                <td class="py-2" style={{color:
                  product.status === 'pending' ? "rgb(247 176 0)" : "green"
                }}>
                 {product.status === "returned" ? "claimed" : "pending"}
                </td>
               </tr>
            })
        }
      </tbody>
     </table>
      }

      
      </div>
    </div>
  );
}

export default MyLostReports;
