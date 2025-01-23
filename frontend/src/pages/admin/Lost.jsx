import React, { useEffect, useState } from "react";

function Lost() {
    const [items, setItems] = useState([]);
    const [userDetailsMap, setUserDetailsMap] = useState({}); // Map for user details
    const [search, setSearch] = useState("");
    const [date, setDate] = useState();

    useEffect(() => {
        async function fetchAllItems() {
            try {
                const response = await fetch("http://localhost:9000/product/lost", {
                    method: "GET",
                });
                const data = await response.json();
                setItems(data);
                console.log(data);
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

    function formatDate(timestamp) {
        if (timestamp && timestamp.seconds) {
            const date = new Date(timestamp.seconds * 1000);
            const options = { year: "numeric", month: "short", day: "numeric" };
            return date.toLocaleDateString("en-US", options);
        }
        return "Invalid Date";
    }

    return (
        <div className="flex-1 p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold" style={{ color: "grey" }}>
                    Lost Item
                </h2>
                <div className="flex items-center space-x-4">
                    <input
                        className="border rounded-lg px-4 py-2"
                        placeholder="Search here"
                        type="text"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <i className="fas fa-bell text-xl" style={{ color: "grey", cursor: "pointer" }}></i>
                    <img
                        alt="User profile picture"
                        className="rounded-full w-10 h-10"
                        height="40"
                        src="https://storage.googleapis.com/a1aa/image/vONPmzZ1PsrPGdfJCdYZ0iUJp4UfhOTacfBoU1iehUOBeoufE.jpg"
                        width="40"
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

            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="py-2">Photo</th>
                            <th className="py-2">Title</th>
                            <th className="py-2">Date</th>
                            <th className="py-2">Location</th>
                            <th className="py-2">Reported By</th>
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
                                    (!date || productDate <= selectedDate)
                                );
                            })
                            .map((item) => {
                                return (
                                    <tr className="border-t" key={item.id}>
                                        {
                                            item.imageUrl === "NA" ? <td className="py-2">
                                                <img alt={item.title || "Product"} className="w-12 h-12" height="50" src={"https://static.vecteezy.com/system/resources/thumbnails/022/059/000/small_2x/no-image-available-icon-vector.jpg"} width="50" />
                                            </td>
                                                : <td className="py-2">
                                                    <img alt={item.title || "Product"} className="w-12 h-12" height="50" src={item.imageUrl || ""} width="50" />
                                                </td>
                                        }
                                        <td className="py-2">{item.title}</td>
                                        <td className="py-2">{formatDate(item.date)}</td>
                                        <td className="py-2">{item.location}</td>
                                        <td className="py-2">
                                            {userDetailsMap[item.uid]?.username || "Loading..."}
                                        </td>
                                        <td className="py-2">
                                            {userDetailsMap[item.uid]?.mob || "Loading..."}
                                        </td>
                                        <td className="py-2">
                                            <button className="border rounded-lg px-4 py-2" disabled>
                                                Claimed
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Lost;
