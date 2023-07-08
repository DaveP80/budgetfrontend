import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-xl rounded-lg p-6 mx-auto max-w-lg text-center">
                <h2 className="text-3xl font-bold mb-4">Error 404</h2>
                <p className="text-gray-700 mb-6">Sorry, the resource was not found.</p>
                <Link
                    to="/home"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default ErrorPage;