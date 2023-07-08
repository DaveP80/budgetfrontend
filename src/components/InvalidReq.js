import React from 'react'
import { Link } from 'react-router-dom'

function InvalidReq() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-xl rounded-lg p-6 mx-auto max-w-4xl w-full">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Cannot modify starting bank value</h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-6">
                    Select a different transaction
                </p>
                <Link
                    to="/home"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg sm:text-xl lg:text-2xl"
                >
                    Home
                </Link>
            </div>
        </div>
    )
}

export default InvalidReq