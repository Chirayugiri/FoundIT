import React, { useEffect, useState } from "react";
import "../styles/ProductDetails.css";
import { useLocation } from "react-router-dom";
import { auth } from "../Config/config";

function ProductDetail() {
    const location = useLocation();
    const itemId = location.state?.item?.id || null; // only pass item ID through Link
    const currUserId = auth?.currentUser?.uid;

    const [item, setItem] = useState(null);
    const [isRequested, setRequested] = useState(false);
    const [loading, setLoading] = useState(true);

    function formatDate(timestamp) {
        if (timestamp && timestamp.seconds) {
            const date = new Date(timestamp.seconds * 1000);
            const options = { year: 'numeric', month: 'short', day: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }
        return "Invalid Date";
    }

    useEffect(() => {
        async function fetchItemDetails() {
            console.log("Fetching item details for ID:", itemId);
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/product/item/${itemId}`);
                const data = await res.json();
                setItem(data.item);
            } catch (error) {
                console.error("Error fetching item:", error);
            }
        }

        async function checkIfRequested() {
            try {
                const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/isrequested`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        currUserDocId: currUserId,
                        itemDocId: itemId,
                    }),
                });
                const data = await res.json();
                setRequested(data.exists);
            } catch (error) {
                console.error("Error checking request:", error);
            }
        }

        if (itemId && currUserId) {
            Promise.all([fetchItemDetails(), checkIfRequested()]).then(() => {
                setLoading(false);
            });
        }
    }, [itemId, currUserId]);

    async function sendClaimRequest() {
        try {
            const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/claim`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    currUserDocId: currUserId,
                    itemDocId: itemId,
                }),
            });
            const data = await res.json();
            alert("Request sent");
            setRequested(true);
        } catch (error) {
            console.error("Error sending claim:", error);
        }
    }

    if (loading || !item) return <div>Loading...</div>;

    return (
        <div className="product">
            <div className="prod-img">
                <img src={item.imageUrl} alt="Product" />
            </div>

            <div className="prod-detail">
                <span>{item.itemType}</span>
                <h2>{item.title}</h2>

                <div className="desc">
                    <p className="itemDesc">{item.desc}</p>
                    <details>
                        <summary>Found Date</summary>
                        <p>{formatDate(item.date)}</p>
                    </details>
                </div>

                {isRequested ? (
                    <button disabled style={{ cursor: "default" }}>
                        Requested
                    </button>
                ) : (
                    <button onClick={sendClaimRequest}>Send Claim Request</button>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
