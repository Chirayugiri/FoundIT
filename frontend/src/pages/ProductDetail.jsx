import React, { useEffect, useState } from "react";
import "../styles/ProductDetails.css";
import { useLocation, useNavigate } from "react-router-dom";
import { auth } from "../Config/config";

function ProductDetail() {
    const navigate = useNavigate();
    const location = useLocation();
    const { item } = location.state || {}; // Retrieve the specific item passed

    console.log(item);

    const currUserId = auth?.currentUser?.uid;
    const [isRequested, setRequest] = useState(false);

    function formatDate(timestamp) {
        if (timestamp && timestamp.seconds) {
            // Convert seconds to milliseconds to create a Date object
            const date = new Date(timestamp.seconds * 1000);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options); // Format to "Dec 12, 2024"
        }
        return "Invalid Date";
    }

    useEffect(()=>{
        //check if the product we see currently, we sent claim request for it or not
      async function isClaimRequestSent() {
        try{
            const response = await fetch("http://localhost:9000/user/isrequested", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    currUserDocId: currUserId,
                    itemDocId: item?.id,
                }),
            });
            const data = await response.json();
            setRequest(data['exists']);
        } catch(err){
            console.log(err);
        }
      }

      isClaimRequestSent();
    }, [])

    async function sendClaimRequest(itemDocId) {
        try{
            const response = await fetch("http://localhost:9000/user/claim", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", 
                },
                body: JSON.stringify({
                    currUserDocId: currUserId,
                    itemDocId: itemDocId,
                }),
            });
            console.log(await response.json());
            alert("Request sent")
        } catch(err){
            console.log(err);
        }
      }

    return (
        <div className="product">
            {/* Product Image */}
            <div className="prod-img">
                <img src={item?.imageUrl} alt="Product" />
            </div>

            {/* Product Details */}
            <div className="prod-detail">
                <span>{item?.itemType}</span>
                <h2>{item?.title}</h2>

                {/* Description */}
                <div className="desc">
                    <p className="itemDesc">{item?.desc}</p>
                    <br />
                    <details>
                        <summary>Location</summary>
                        <p>{item?.location}</p>
                    </details>
                    <details>
                        <summary>Found Date</summary>
                        <p>{formatDate(item?.date)}</p>
                    </details>
                </div>

                {
                    isRequested === true ? <button disabled>Requested</button>
                    : <button onClick={(e) => sendClaimRequest(item?.id)}>Send Claim Request</button>
                }
            </div>
        </div>
    );
}

export default ProductDetail;
