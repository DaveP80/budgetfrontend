import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function MakeEntry() {
    /*
    { id,
        category,
        name,
        value,
        Date,}
        */
    const [categoryValues, setCategoryValues] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [enable, setEnabled] = useState(false);
    const navigate = useNavigate()

    const handleClick = () => {
        setIsClicked(true);
        setTimeout(() => {
            setIsClicked(false);
        }, 1000);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        let currentDate = new Date();
        let arr = []
        let cpcategory = [...categoryValues]
        if (categoryValues.every(item => item.name === '')) return
        categoryValues.forEach((item, i) => {
            if (item.name !== '') {
                arr.push({ id: (Math.floor(Math.random() * 10000) + 10000).toString(), date: currentDate, category: item.category, name: item['name'], value: item['value'] })
                cpcategory[i]['name'] = ''
                cpcategory[i]['value'] = cpcategory[i]['category'] === 'income' ? 1 : cpcategory[i]['category'] === 'expenses' ? -1 : 0
            }
        })
        if (arr.length) makeEntry(arr);
    };

    useEffect(() => {
        getEnable()
        getCategories()
    }, [])

    async function getCategories() {
        await axios.get('http://localhost:9000/category').then(res => {
            setCategoryValues(res.data.map(item => { return { category: item, name: '', value: item === 'income' ? 1 : item === 'expenses' ? -1 : 0 } }))
        }).catch(e => console.log(e))
    }
    async function getEnable() {
        await axios.get('http://localhost:9000/enable').then(res => { setEnabled(res.data[0]) }).catch(e => console.log(e))
    }

    async function makeEntry(args) {
        await axios.post('http://localhost:9000/transactions', args).then(res => { navigate(`/transactions/${+res.data[res.data.length - 1]['id']}`) }).catch(e => console.log(e))
    }

    const handleTextChange = (index, event) => {
        const updatedInformation = [...categoryValues];
        updatedInformation[index].name = event.target.value;
        setCategoryValues(updatedInformation);
    };

    const handleNumberChange = (index, event) => {
        const updatedInformation = [...categoryValues];
        updatedInformation[index].value = +event.target.value;
        setCategoryValues(updatedInformation);
    };
    const renderFields = () => {
        return categoryValues.map((item, index) => (
            <div key={index} className='mb-4'>
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={item.category}>
                    {`${item.category}${item.category === 'income' ? ' adding value' : item.category === 'expenses' ? ' subtracting value' : ' tracking amounts'}`}
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder='description'
                    value={item.name}
                    onChange={(event) => handleTextChange(index, event)}
                />
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    value={item.value}
                    onChange={(event) => handleNumberChange(index, event)}
                    min={item.category === 'income' ? 1 : item.category === 'expenses' ? -Infinity : -Infinity}
                    max={item.category === 'income' ? Infinity : item.category === 'expenses' ? -1 : Infinity}
                />
            </div>
        ));
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            {enable ?
                <div className="max-w-md rounded overflow-hidden shadow-lg bg-white">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-4">Submit Transactions Form</div>
                        <form onSubmit={handleSubmit}>
                            {renderFields()}
                            <button
                                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${isClicked ? 'animate-pulse' : ''
                                    }`}
                                type="submit"
                                onClick={handleClick}
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
                : <div className="bg-white shadow-xl rounded-lg p-6 mx-auto max-w-lg">
                    <h2 className="text-2xl font-bold mb-4">Enable First</h2>
                    <p className="text-gray-700 mb-6">
                        Your budget and tables are not enabled. Please click the button below to get started.
                    </p>
                    <Link
                        to="/transactions/category"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Enable Your Budget
                    </Link>
                </div>
            }
        </div>

    );
};

export default MakeEntry;
