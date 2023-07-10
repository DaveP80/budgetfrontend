import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../index.css'

function ShowEntry() {
    const { id } = useParams()
    const [info, setInfo] = useState(null)
    const navigate = useNavigate()
    // eslint-disable-next-line
    useEffect(() => { getInfo() }, [])

    async function getInfo() {
        await axios.get(`${process.env.REACT_APP_URL}transactions/get`, {
            params: {
                id: id
            }
        }).then(res => {
            if (!res.data.hasOwnProperty('id')) navigate('/notfound');
            setInfo({ ...res.data })
        }).catch(e => console.log(e))
    }

    async function handleDelete() {
        if (info.category === 'bank' && info.name === 'start') navigate('/err-cannotmodify')
        else {
            await axios.delete(`${process.env.REACT_APP_URL}transactions/${info.id}`).then(res => console.log(res.status)).catch(e => console.log(e))
            navigate('/transactions')
        }
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full sm:w-1/2 lg:w-90p mx-auto">
                <div className="bg-white shadow-xl rounded-lg p-6">
                    {info && (
                        <div className="flex flex-col text-center md:flex-row">
                            <div className="md:w-2/3">
                                <h2 className="text-2xl font-bold mb-4">Data Details</h2>
                                <div className="mb-6">
                                    <p className="text-gray-700 mb-2">
                                        Category: <span className="font-bold">{info.category}</span>
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        Description: <span className="font-bold">{info.name}</span>
                                    </p>
                                    <p className="text-gray-700 mb-2">
                                        Value: $<span className="font-bold">{info.value}</span>
                                    </p>
                                    {info.from && (
                                        <details>

                                            From: <span className="font-bold">{info.from}</span>

                                        </details>
                                    )}
                                </div>
                            </div>
                            <div className="md:w-1/3 md:text-left">
                                <h2 className="customtsize text-2xl font-bold mb-4">Date of Entry</h2>
                                <p className="text-gray-700 mb-6">{info.date.split("T")[0]}</p>
                            </div>
                        </div>
                    )}
                    <div className="flex justify-between gap-4 mt-4">
                        <button
                            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32"
                            onClick={() => navigate('/transactions')}
                        >
                            Back
                        </button>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32"
                            onClick={() => navigate(`/transactions/${info.id}/edit`)}
                        >
                            Edit
                        </button>
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-32"
                            onClick={() => handleDelete()}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShowEntry