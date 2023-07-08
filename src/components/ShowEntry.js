import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function ShowEntry() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [info, setInfo] = useState(null)

    useEffect(() => { getInfo() }, [])

    async function getInfo() {
        await axios.get(`http://localhost:9000/transactions/${id}`).then(res => {if (!res.data.hasOwnProperty('id')) navigate('/notfound');
        setInfo({ ...res.data })}).catch(e => console.log(e))
    }

    async function handleDelete() {
        await axios.delete(`http://localhost:9000/transactions/${info.id}`).then(res => console.log(res.status)).catch(e => console.log(e))
        navigate('/transactions')
    }
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <div className="bg-white shadow-xl rounded-lg p-6 mx-auto max-w-lg">
                {info && <><h2 className="text-2xl font-bold mb-4">Data Details</h2>
                    <p className="text-gray-700 mb-2">
                        Category: <span className="font-bold">{info.category}</span>
                    </p>
                    <p className="text-gray-700 mb-2">
                        Description: <span className="font-bold">{info.name}</span>
                    </p>
                    <p className="text-gray-700 mb-2">
                        Value: $<span className="font-bold">{info.value}</span>
                    </p>
                    <h2 className="text-2xl font-bold mb-4">Date of Entry</h2>
                    <p className="text-gray-700 mb-6">{info.date.split("T")[0]}</p>
                </>}

                <div className="flex justify-between">
                    <button
                        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => navigate('/transactions')}
                    >
                        Back
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => navigate(`/transactions/${info.id}/edit`)}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        onClick={() => handleDelete()}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ShowEntry