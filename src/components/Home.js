import React from 'react'
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold mb-8">Welcome to Money Budget Site</h1>
            <div className="flex flex-col items-center space-y-4">
                <Link
                    to="/transactions/category"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    Get Started
                </Link>
                <Link
                    to="/transactions/new"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Add a Transaction
                </Link>
                <Link
                    to="/transactions"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                >
                    Budget Index
                </Link>
            </div>
        </div>
    )
}

export default Home