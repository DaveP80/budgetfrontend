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
        Date,
        from,}
        */
    const [categoryValues, setCategoryValues] = useState([]);
    const [isClicked, setIsClicked] = useState(false);
    const [enable, setEnabled] = useState(false);
    const [err, setShowErr] = useState(false);
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
        //cant make a duplicate bank start entry
        if (categoryValues.every(item => item.name === '') || categoryValues.some(item => item.category === 'bank' && item.name === 'start')) return
        categoryValues.forEach((item, i) => {
            if (item.name !== '') {
                arr.push({ id: (Math.floor(Math.random() * 10000) + 10000).toString(), category: item.category, date: currentDate, name: item['name'], value: parseFloat(item['value']), from: item['from'] })
                cpcategory[i]['name'] = ''
                cpcategory[i]['from'] = ''
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
        await axios.get(`${process.env.REACT_APP_URL}category`).then(res => {
            setCategoryValues(res.data.map(item => { return { category: item, name: '', value: item === 'income' ? 1 : item === 'expenses' ? -1 : 0, from: '' } }))
        }).catch(e => console.log(e))
    }
    async function getEnable() {
        await axios.get(`${process.env.REACT_APP_URL}enable`).then(res => { if (res.data[0] === false) setShowErr(!err); else setEnabled(res.data[0]) }).catch(e => console.log(e))
    }

    async function makeEntry(args) {
        await axios.post(`${process.env.REACT_APP_URL}transactions`, args).then(res => {
            if (res.status === 201) navigate(`/transactions/${+res.data[res.data.length - 1]['id']}`);
            else navigate('/transactions/new')
        }).catch(e => console.log(e))
    }

    const handleNameChange = (index, event) => {
        const updatedInformation = [...categoryValues];
        updatedInformation[index].name = event.target.value;
        setCategoryValues(updatedInformation);
    };

    const handleFromChange = (index, event) => {
        const updatedInformation = [...categoryValues];
        updatedInformation[index].from = event.target.value;
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
                    {`Category ${item.category}${item.category === 'income' ? ' credit' : item.category === 'expenses' ? ' debit' : item.category === 'bank' ? ' credit/debit' : ' credit/debit'}`}
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder='description'
                    value={item.name}
                    onChange={(event) => handleNameChange(index, event)}
                />
                <label className="block text-gray-700 text-sm font-bold" htmlFor={item.category}>
                    From
                </label>
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="text"
                    placeholder='more detail'
                    value={item.from}
                    onChange={(event) => handleFromChange(index, event)}
                />
                <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    type="number"
                    step="0.01"
                    value={item.value}
                    onChange={(event) => handleNumberChange(index, event)}
                    min={item.category === 'income' ? 1 : item.category === 'expenses' ? -Infinity : -Infinity}
                    max={item.category === 'income' ? Infinity : item.category === 'expenses' ? -1 : Infinity}
                />
            </div>
        ));
    };

    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100 mt-20'>
        {enable && (
            <div className="max-w-full sm:max-w-md rounded shadow-lg bg-white">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-4">Submit Transactions Form</div>
                <form onSubmit={handleSubmit}>
                {renderFields()}
                <button
                    className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                    isClicked ? 'animate-pulse' : ''
                    }`}
                    type="submit"
                    onClick={handleClick}
                >
                    Submit
                </button>
                </form>
            </div>
            </div>
        )} 
        {err && (
            <div className="bg-white shadow-xl rounded-lg p-6 mx-auto max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Enable First</h2>
            <p className="text-gray-700 mb-6">
                Your budget and tables are not enabled. Please click the button below to get started.
            </p>
            <Link
                to="/transactions/start"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
                Enable Your Budget
            </Link>
            </div>
        )}
        </div>
    );
};

export default MakeEntry;
