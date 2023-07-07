import axios from 'axios'
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Category() {
    //Income ++
    //Expenses --
    //Saving +-
    const [category, setCategory] = useState(null)
    const [entry, setEntry] = useState([])
    const navigate = useNavigate()
    async function getCategories() {
        await axios.get('http://localhost:9000/category').then(res => { setCategory(res.data) }).catch(e => console.log(e))
    }
    async function getEntries() {
        await axios.get('http://localhost:9000/transactions').then(res => { console.log(res.data); setEntry(res.data) }).catch(e => console.log(e))
    }
    useEffect(() => {
        getCategories()
        getEntries()
    }, [])
    return (
        <div className='container mx-auto'>
            {
                entry.length ? <div>
                    <a onClick={() => navigate('/transactions')}>Your budget table</a>
                </div> : <div><h2>Get started with a new budget</h2></div>
            }
            <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">Categories</div>
                    <ul className="mb-4 style-none">
                        {category && category.map((item, i) => {
                            return <li key={i}>{item}</li>
                        })}
                    </ul>
                    <i>add new categories</i>
                    <form>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input1">
                                Input 1
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="input1"
                                type="text"
                                placeholder="Enter Input 1"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input2">
                                Input 2
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="input2"
                                type="text"
                                placeholder="Enter Input 2"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input3">
                                Input 3
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="input3"
                                type="text"
                                placeholder="Enter Input 3"
                            />
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Category