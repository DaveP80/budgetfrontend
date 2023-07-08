import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { v1 as generateId } from 'uuid'

function AllActivity() {
    const [table, setTable] = useState([])
    const [btotal, setTotal] = useState(0)
    useEffect(() => {
        getTableInfo()
    }, [])

    async function getTableInfo() {
        await axios.get('http://localhost:9000/transactions').then(res => { 
        setTotal(res.data.reduce((accumulator, item) => {
            if (item.category === 'bank') {
            return accumulator + parseFloat(item.value);
            }
            return accumulator;
        }, 0))
        setTable(res.data)}).catch(e => console.log(e))
    }
    return (<div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
        {table.length ? (
            <div className="bg-white shadow-xl rounded-lg p-6 max-w-4xl w-full overflow-x-auto">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">Table of transactions</h2>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200">
                            {Object.keys(table[0]).map((key, i) => (
                                <th className="py-2 px-4 font-bold" key={i}>
                                    {key}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((item) => (
                            <tr key={item.id}>
                                {Object.values(item).map((value, index) => (
                                    <td className="py-2 px-4" key={index}>
                                        {index === 2 && value.includes('T') ? value.split("T")[0] : value}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
                <h2 className="text-2xl sm:text-2xl lg:text-3xl font-bold mb-4">Money Totals</h2>
                <table className="w-full">
                    <thead>
                        <tr className="bg-gray-200">
               
                                <th className="py-2 px-4 font-bold" key={generateId()}>
                                    Bank Total
                                </th>
                                <th className="py-2 px-4 font-bold" key={generateId()}>
                                    Income & Bank Total
                                </th>
                                <th className="py-2 px-4 font-bold" key={generateId()}>
                                    All transactions
                                </th>

                        </tr>
                    </thead>
                    <tbody>
                            <tr key={generateId()}>
                                    <td className={`py-2 px-4 ${btotal > 100 ? "text-green-500" : btotal > -1 && btotal < 101 ? "text-yellow-500" : "text-red-500"}`} key={'a'}>
                                        {btotal}
                                    </td>
                                    <td className="py-2 px-4" key={'b'}>
                                        {table.reduce((accumulator, item) => {
                                            if (item.category === 'bank' || item.category === 'income') {
                                                return accumulator + parseFloat(item.value)
                                            }
                                            return accumulator;
                                            }, 0)}
                                    </td>
                                    <td className="py-2 px-4" key={'c'}>
                                        {(table.reduce((accumulator, item) => {
                                            return accumulator + parseFloat(item.value);;
                                        }, 0)).toFixed(2)}
                                    </td>
                            </tr>
                    </tbody>
                </table>
            </div>
        ) : (
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
