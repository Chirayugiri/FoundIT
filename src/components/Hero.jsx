import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom';

function Hero() {
    return (
        <div>
            <Navbar />
            <section className="flex flex-col lg:flex-row items-center lg:justify-between text-center lg:text-left hero">
                <div className="lg:w-1/2">
                    <h1 className="text-5xl font-bold title">
                        Finding Lost Items <br />Made
                        <span className="text-blue-600">
                            Easy
                        </span>
                    </h1>
                    <p className="mt-4">
                        Helping you reconnect with your lost belongings on campus.
                    </p>
                    <div className="mt-6 space-x-4">
                        <Link to="/lostReport" className="bg-blue-600 text-white px-6 py-3 rounded-full">
                            Report Lost Item
                        </Link>
                        <Link to="foundReport" className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full">
                            Report Found Item
                        </Link>

                    </div>
                </div>
                <div className="relative lg:w-1/2 mt-12 lg:mt-0 homeImg">
                    <img alt="A student holding a lost item" className="mx-auto relative z-10" height="400" src="campus.png" width="600" />
                </div>
            </section>
        </div>
    )
}

export default Hero