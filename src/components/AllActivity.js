import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { v1 as generateId } from 'uuid'
import { useNavigate } from 'react-router-dom'

function AllActivity() {
    const [table, setTable] = useState([])
    const [btotal, setTotal] = useState(0)
    const [err, setShowErr] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        getTableInfo()
    }, [])

    async function getTableInfo() {
        await axios.get(`${process.env.REACT_APP_URL}transactions`).then(res => {
            if (res.data.length) {
                setTotal(res.data.reduce((accumulator, item) => {
                    if (item.category === 'bank') {
                        return accumulator + parseFloat(item.value);
                    }
                    return accumulator;
                }, 0).toFixed(2));
                setTable(res.data);
            } else setShowErr(!err);
        }).catch(e => console.log(e));
    }
    return (<div className='flex items-center justify-center min-h-screen bg-gray-100'>
        {table.length > 0 && (
            <div className="bg-white shadow-xl rounded-lg p-6 max-w-4xl w-full overflow-x-auto">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Table of transactions</h2>
                <table className="min-w-full divide-y">
                    <thead className='bg-gray-200'>
                        <tr>
                            {Object.keys(table[0]).slice(0, -1).map((key, i) => (
                                <th className="px-6 py-3 font-bold text-left text-black-500 uppercase" key={i}>
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        {table.map((item) => (
                            <tr key={item.id} className=''>
                                {Object.values(item).slice(0, -1).map((value, index) => (
                                    <td className={`px-6 py-4 text-md font-medium text-gray-800 whitespace-nowrap${index === 0 ? ' cursor-pointer' : ''}`} key={index} onClick={() => { if (index === 0) navigate(`/transactions/${item.id}`) }}>
                                        {index === 2 && value.includes('T') ? value.split("T")[0] : value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2 className="text-xl sm:text-xl lg:text-2xl font-bold mb-4">Money Totals</h2>
                <table className="min-w-full divide-y">
                    <thead className='bg-gray-200'>
                        <tr>

                            <th className="px-6 py-3 font-bold text-left text-black-500 uppercase" key={generateId()}>
                                Bank Total
                            </th>
                            <th className="px-6 py-3 font-bold text-left text-black-500 uppercase" key={generateId()}>
                                Income & Bank Total
                            </th>
                            <th className="px-6 py-3 font-bold text-left text-black-500 uppercase" key={generateId()}>
                                All transactions
                            </th>

                        </tr>
                    </thead>
                    <tbody className='divide-y'>
                        <tr key={generateId()}>
                            <td className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${btotal > 100 ? "text-green-500" : btotal > -1 && btotal < 101 ? "text-yellow-500" : "text-red-500"}`} key={'a'}>
                                {btotal}
                            </td>
                            <td className="px-6 py-4 text-md font-medium text-gray-800 whitespace-nowrap" key={'b'}>
                                {table.reduce((accumulator, item) => {
                                    if (item.category === 'bank' || item.category === 'income') {
                                        return accumulator + parseFloat(item.value)
                                    }
                                    return accumulator;
                                }, 0).toFixed(2)}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap" key={'c'}>
                                {(table.reduce((accumulator, item) => {
                                    return accumulator + parseFloat(item.value);;
                                }, 0)).toFixed(2)}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )}
        {err && (
            <div className="bg-white shadow-xl rounded-lg p-6 mx-auto max-w-4xl w-full">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Need transaction data</h2>
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-6">
                    You have not populated any budget data yet. Make some entries!
                </p>
                <Link
                    to="/transactions/new"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline text-lg sm:text-xl lg:text-2xl"
                >
                    Make Entries
                </Link>
            </div>
        )}
    </div>
    )
}

export default AllActivity
