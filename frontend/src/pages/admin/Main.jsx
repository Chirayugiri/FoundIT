import React, { useState } from 'react'
import AdminPanel from './Found'
import Found from './Found'
import Lost from './Lost'
import Students from './Student'

function Main() {

    const [tab, setTab] = useState(0);
    return (
        <div className="bg-gray-100 admin">
            <div className="flex h-screen">
            {/* Sidebar */}
            <div className="bg-blue-950 text-white w-56">
                <h1 className="text-left text-3xl font-bold mb-8 p-6">FoundIt</h1>
                <nav className="mt-10">
                    <ul className='space-y-2'>
                        <li className="mb-2 pl-6 p-3" onClick={(e)=> setTab(0)} style={{ fontSize: "17px", backgroundColor: 
                            tab === 0 ? "#143577ff" : ""
                        }}>
                            <a className="items-center">
                                <i className="fas fa-search" style={{ fontSize: "18px"}}></i>
                                Found Item
                            </a>
                        </li>
                        <li className="mb-2 pl-6 p-3" onClick={(e)=> setTab(1)} style={{ fontSize: "17px", backgroundColor: 
                            tab === 1 ? "#0d2c69ff" : ""
                        }}>
                            <a className="items-center">
                                <i className="fas fa-times-circle" style={{ fontSize: "18px" }}></i>
                                Lost Item
                            </a>
                        </li>
                        <li className="mb-2 pl-6 p-3" onClick={(e)=> setTab(2)} style={{ fontSize: "17px", backgroundColor: 
                            tab === 2 ? "#0d2c69ff" : ""
                        }}>
                            <a className="items-center">
                                <i className="fas fa-user-alt" style={{ fontSize: "18px" }}></i>
                                Users
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
            {
                tab === 0 && <Found />
            }
            {
                tab === 1 && <Lost />
            }
            {
                tab === 2 && <Students />
            }
        </div>
        </div>
    )
}

export default Main