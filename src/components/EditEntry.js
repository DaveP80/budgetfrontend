import React from 'react'
import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function EditEntry() {
    const { id } = useParams()
    const [formData, setFormData] = useState(null)
    const navigate = useNavigate()
    // eslint-disable-next-line
    useEffect(() => {
        getInfo()
    }, [])

    async function getInfo() {
        await axios.get(`http://localhost:9000/transactions/${id}`).then(res => {
            if (res.data.hasOwnProperty('id')) {
                if (res.data.category === 'bank' && res.data.name === 'start') navigate('/err-cannotmodify');
                else setFormData(res.data);
            }
        }).catch(e => console.log(e))
    }

    async function updateEntry() {
        await axios.put(`http://localhost:9000/transactions/${id}`, {
            id: formData.id, category: formData.category, date: formData.date,
            name: formData.name, value: parseFloat(formData.value)
        }).then(res => { if (res.data.some(item => item.id === id)) navigate(`/transactions/${id}`) })
            .catch(e => navigate('/notfound'))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (formData.name === '') return
        updateEntry()
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            {formData ? <div className="bg-white shadow-xl rounded-lg p-6 mx-auto max-w-lg">
                <h2 className="text-2xl font-bold mb-2">Edit you Entry</h2>
                <div className="mb-4">
                    <span className="inline-block bg-blue-500 text-white text-sm font-bold py-1 px-2 rounded">
                        For ID: {formData.id}
                    </span>
                </div>
                <div className="mb-4">
                    <span className="inline-block bg-blue-500 text-white text-sm font-bold py-1 px-2 rounded">
                        {formData.category} category
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="value" className="block text-gray-700 font-bold mb-2">
                            Value
                        </label>
                        <input
                            type="number"
                            id="value"
                            step="0.01"
                            name="value"
                            value={formData.value}
                            onChange={handleChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            min={formData.category === 'income' ? 1 : formData.category === 'expenses' ? -Infinity : -Infinity}
                            max={formData.category === 'income' ? Infinity : formData.category === 'expenses' ? -1 : Infinity}
                        />
                    </div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Save
                    </button>
                </form>
            </div>
                :
                <div className="bg-white shadow-xl rounded-lg p-6 mx-auto max-w-4xl w-full">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Entry not Found in Database</h2>
                    <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-6">
                        Make a new entry
                    </p>
                    <Link
                        to="/home"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg sm:text-xl lg:text-2xl"
                    >
                        Home
                    </Link>
                </div>
            }
        </div>
    )
}

export default EditEntry