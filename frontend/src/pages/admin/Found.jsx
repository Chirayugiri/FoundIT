import React, { useEffect, useState } from "react";

function Found() {
    const [items, setItems] = useState([]);
    const [userDetailsMap, setUserDetailsMap] = useState({}); // Map for user details
    const [search, setSearch] = useState("");
    const [date, setDate] = useState();

    const [isClaimed, setIsClaimed] = useState(false);
    const [isScaled, setScaled] = useState(false);   // for css
    useEffect(() => {
        async function fetchAllItems() {
            try {
                const result = await fetch("http://localhost:9000/product/allProducts", {
                    method: "GET",
                });
                const data = await result.json();
                setItems(data);
                const uids = [...new Set(data.map((item) => item.uid))]; // Get unique uids
                fetchAllUserDetails(uids);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        }
        fetchAllItems();
    }, []);

    async function fetchAllUserDetails(uids) {
        const detailsMap = {};
        await Promise.all(
            uids.map(async (uid) => {
                const details = await getUserDetails(uid);
                detailsMap[uid] = details; // Store details in the map
            })
        );
        setUserDetailsMap(detailsMap); // Update state with all user details
    }

    async function getUserDetails(uid) {
        try {
            const response = await fetch(`http://localhost:9000/user/${uid}`);
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const data = await response.json();

            return {
                username: data.username || "Unknown",
                mob: data.mob || "Not available",
            };
        } catch (err) {
            console.log(err);
            return {
                username: "Unknown",
                mob: "Not available",
            };
        }
    }

    async function changeItemStatus(id) {
        console.log(id);
        try {
            const response = await fetch(`http://localhost:9000/product/${id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
            
            // Update the item status in the state
            setItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? { ...item, status: "returned" } : item
            )
        );

        } catch (err) {
            console.log(err);
        }
    }

    function formatDate(timestamp) {
        if (timestamp && timestamp.seconds) {
            const date = new Date(timestamp.seconds * 1000);
            const options = { year: "numeric", month: "short", day: "numeric" };
            return date.toLocaleDateString("en-US", options);
        }
        return "Invalid Date";
    }

    function toggleScaling(e){
        if(isScaled){
            e.target.style = ""
        }
    }

    return (
        <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "grey" }}>
                    Found Item
                </h2>
                <div className="flex items-center space-x-4">
                    <input
                        className="border rounded-lg px-4 py-2"
                        placeholder="Search here"
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>
            <div className="flex items-center mb-6">
                <input
                    className="border rounded-lg px-4 py-2 mr-4"
                    onChange={(e) => setDate(e.target.value)}
                    type="date"
                />
            </div>
            <div className="mb-6">
                {
                    isClaimed === false ? <button className="bg-blue-900 text-white px-4 py-2 rounded-lg mr-4" onClick={(e) => setIsClaimed(false)}>Non Claimed</button>
                        : <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-4" onClick={(e) => setIsClaimed(false)}>Non Claimed</button>
                }
                {
                    isClaimed === false ? <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg mr-4" onClick={(e) => setIsClaimed(true)}>Claimed</button>
                        : <button className="bg-blue-900 text-white px-4 py-2 rounded-lg mr-4" onClick={(e) => setIsClaimed(true)}>Claimed</button>
                }
                <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Unresolved</button>
            </div>
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="py-2">Photo</th>
                            <th className="py-2">Title</th>
                            <th className="py-2">Date</th>
                            <th className="py-2">Location</th>
                            <th className="py-2">Found By</th>
                            <th className="py-2">Contact</th>
                            <th className="py-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items
                            .filter((product) => {
                                const productDate = new Date(product.date.seconds * 1000); // Convert to Date object
                                const selectedDate = new Date(date); // Convert input to Date object
                                return (
                                    (!search || product.title.toLowerCase().includes(search.toLowerCase())) &&
                                    (!date || productDate < selectedDate) &&
                                    (
                                        isClaimed === false ? product.status === "pending" : product.status === "returned"
                                    )
                                );
                            })
                            .map((item) => {
                                return (
                                    <tr className="border-t" key={item.id}>
                                        <td className="py-2">
                                            <img alt={item.title || "Product"} className="w-12 h-12" id="foundImg" height="50" src={item.imageUrl || ""} width="50"
                                            onClick={(e)=> toggleScaling(e)}
                                            style={{
                                                transform: isScaled ? 'scale(9)' : 'scale(1)'
                                            }}
                                            />
                                        </td>
                                        <td className="py-2">{item.title}</td>
                                        <td className="py-2">{formatDate(item.date)}</td>
                                        <td className="py-2">{item.location}</td>
                                        <td className="py-2">
                                            {userDetailsMap[item.uid]?.username || "Loading..."}
                                        </td>
                                        <td className="py-2">
                                            {userDetailsMap[item.uid]?.mob || "Loading..."}
                                        </td>
                                        {item.status === "pending" ? (
                                            <td className="py-2">
                                                <button
                                                    className="border rounded-lg px-4 py-2"
                                                    onClick={() => {
                                                        console.log("Item ID being sent:", item.id); // Debugging
                                                        changeItemStatus(item.id);
                                                    }}
                                                >
                                                    Return
                                                </button>
                                            </td>
                                        ) : (
                                            <td className="py-2">
                                                <button className="border rounded-lg px-4 py-2" disabled>
                                                    Claimed
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                );
                            })}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Found;
