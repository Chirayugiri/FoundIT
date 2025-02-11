import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
    return (
        <div>
            <header className="bg-gray-50 navbar">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold text-blue-600">
                        FoundIT
                    </div>
                    <nav className="space-x-6">
                        <a className="text-gray-600 hover:text-blue-600" href="#">
                            Home
                        </a>
                        <a className="text-gray-600 hover:text-blue-600" href="#">
                            Lost Items
                        </a>
                        <a className="text-gray-600 hover:text-blue-600" href="#">
                            Found Items
                        </a>
                        <a className="text-gray-600 hover:text-blue-600" href="#">
                            About
                        </a>
                    </nav>
                    <div className="space-x-4">
                        <Link to='/myclaimrequest' className="text-gray-600 hover:text-blue-600">
                            My Requests
                        </Link>
                        <Link to='/mylostreports' className="bg-blue-600 text-white px-4 py-2 rounded">
                            My Reports
                        </Link>
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar