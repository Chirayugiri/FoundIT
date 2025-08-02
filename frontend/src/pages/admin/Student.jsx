import React, { useEffect, useState } from "react";

function Students() {
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState(""); 

    useEffect(() => {
        async function fetchAllUsers() {
            try {
                const result = await fetch(`${process.env.REACT_APP_BACKEND_URL}/user/all`, {
                    method: "GET",
                });
                const data = await result.json();
                console.log(data);
                setItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        }
        fetchAllUsers();
    }, []);

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
                    Student Details
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
            <div className="bg-white rounded-lg shadow p-4 mb-6">
                <table className="w-full">
                    <thead>
                        <tr className="text-left text-gray-500">
                            <th className="py-2">Sr.No</th>
                            <th className="py-2">Name</th>
                            <th className="py-2">Year</th>
                            <th className="py-2">Branch</th>
                            <th className="py-2">Contact</th>
                            <th className="py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items
                            .filter((users) => {
                                return (
                                    (!search || users.username.toLowerCase().includes(search.toLowerCase()))
                                );
                            })
                            .map((user, idx) => {
                                return (
                                    <tr className="border-t" key={user.id}>
                                        <td className="py-2">{idx+1}</td>
                                        <td className="py-2">{user.username}</td>
                                        <td className="py-2">{user.year}</td>
                                        <td className="py-2">{user.branch}</td>
                                        <td className="py-2">{user.mob}</td>
                                        <td className="py-2">{formatDate(user.date)}</td>
                                    </tr>
                                );
                            })}

                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Students;
