import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <header className="navbar">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="font-bold text-blue-600" style={{ fontSize: '1.9rem' }}>
                        FoundIT
                    </div>
                    <div className="space-x-4">
                        <Link to='/myclaimrequest' className="text-gray-600 hover:text-blue-600">
                            My Requests
                        </Link>
                        <button
                            className="bg-blue-600 text-white px-4 py-2 rounded"
                            onClick={() => {
                                localStorage.clear();
                                window.location.href = "/login";
                            }}
                            >
                            Logout
                        </button>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar