import axios from 'axios'
import React from 'react'
import { useState, useEffect, Fragment } from 'react'
import { Link } from 'react-router-dom';
import { Dialog, Transition, Switch } from '@headlessui/react'

function Category() {
    //Income ++
    //Bank +-
    //Expenses --
    //Saving +-
    const [category, setCategory] = useState([])
    const [entry, setEntry] = useState([])
    const [input0, setInput0] = useState('')
    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
    const [input3, setInput3] = useState('');
    const [modal, setModal] = useState(false);
    const [isOpen, setIsOpen] = useState(true)
    const [enabled, setEnabled] = useState(false)
    const [start, setStart] = useState(false)
    const [balance, setBalance] = useState(0);

    const handleStart = async (event) => {
        event.preventDefault();
        // Handle form submission (e.g., validation, API call, etc.)
        if (parseFloat(balance) >= 100) {
            // Successful submission, close the modal
            setStart(false);
        } else {
            // Handle validation error or display an error message
            console.log('Please enter a starting bank balance of at least $100');
        }
    };
    async function getCategories() {
        await axios.get('http://localhost:9000/category').then(res => { setCategory(res.data) }).catch(e => console.log(e))
    }
    async function getEntries() {
        await axios.get('http://localhost:9000/transactions').then(res => {
            if (!res.data.some(item => item.category === 'bank')) setStart(true);
            setEntry(res.data)
        }).catch(e => console.log(e))
    }
    async function getEnable() {
        await axios.get('http://localhost:9000/enable').then(res => { setEnabled(res.data[0]) }).catch(e => console.log(e))
    }
    useEffect(() => {
        getEntries()
        getEnable()
        getCategories()
    }, [])
    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        let forminfo = Array.from([input0, input1.toLowerCase(), input2.toLowerCase(), input3.toLowerCase()])
        if (forminfo.every(item => item === '')) return
        if (forminfo.some(item => category.includes(item))) {
            alert('duplicate category')
            return
        }
        let newcategories = forminfo.filter(item => item !== '')
        if (newcategories.length) {
            await axios.post(`http://localhost:9000/category`, { category: newcategories }).then(res => {
                setModal(true)
            }).catch(e => console.log(e))
            setCategory([...category, ...newcategories])
        }
        setInput1('');
        setInput2('');
        setInput3('');
    };
    const handleSwitch = async () => {
        setEnabled(!enabled)
        let currDate = new Date()
        await axios.post(`http://localhost:9000/enable`, { enabled: !enabled }).then(res => console.log(res)).catch(e => console.log(e))
        await axios.post('http://localhost:9000/transactions', [{ id: (Math.floor(Math.random() * 10000) + 10000).toString(), category: 'bank', date: currDate, name: 'start', value: parseFloat(balance) }])
            .then(res => console.log(res.status)).catch(e => console.log(e))
    }
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {
                entry.length || enabled ? <div className='py-4'>
                    <Link
                        to="/transactions"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >Goto your budget table</Link>
                </div> :
                    <span className="inline-flex items-center rounded-md bg-pink-50 px-2 py-2 text-m font-medium text-pink-700 ring-1 ring-inset ring-pink-700/10">
                        Get started with a new budget
                    </span>
            }
            {
                start && <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-white shadow-xl rounded-lg p-6 mx-auto max-w-lg">
                        <h2 className="text-2xl font-bold mb-4">Starting Bank Balance</h2>
                        <p className="mb-4">To get started, you need a starting bank balance of at least $100.</p>
                        <form onSubmit={handleStart}>
                            <div className="mb-4">
                                <label htmlFor="balance" className="block text-gray-700 font-bold mb-2">
                                    Balance
                                </label>
                                <input
                                    type="number"
                                    id="balance"
                                    name="balance"
                                    step="0.01"
                                    min="100"
                                    value={balance}
                                    onChange={(e) => setBalance(e.target.value)}
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    required
                                />
                            </div>
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
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
                    <div>
                        <h2>{enabled ? 'Your account is ' : 'Start Account'}<span className='text-green-800'>{enabled ? 'active' : ''}</span></h2>
                        <Switch
                            checked={enabled}
                            onChange={handleSwitch}
                            className={`${enabled ? 'bg-blue-600' : 'bg-gray-200'
                                } relative inline-flex h-6 w-11 items-center rounded-full`}
                        >
                            <span className="sr-only">Start Account?</span>
                            <span
                                className={`${enabled ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition`}
                            />
                        </Switch>

                    </div>

                    <form onSubmit={handleSubmit}>
                    <select
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="category"
                    value={input0}
                    onChange={(e) => setInput0(e.target.value)}
                    >
                    <option value="">select</option>
                    <option value="utilities">Utilities</option>
                    <option value="transportation">Transportation</option>
                    <option value="groceries">Groceries</option>
                    <option value="investments">Investments</option>
                    </select>
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="input1">
                                Input 1
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="input1"
                                type="text"
                                placeholder="Enter Input 1"
                                value={input1}
                                onChange={(e) => setInput1(e.target.value)}
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
                                value={input2}
                                onChange={(e) => setInput2(e.target.value)}
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
                                value={input3}
                                onChange={(e) => setInput3(e.target.value)}
                            />
                        </div>
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            {
                modal && <div>
                    <div className="inset-0 flex py-2 items-center justify-center">
                        <button
                            type="button"
                            onClick={openModal}
                            className="rounded-md bg-black bg-opacity-20 px-4 py-2 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
                        >
                            Open dialog
                        </button>
                    </div>

                    <Transition appear show={isOpen} as={Fragment}>
                        <Dialog as="div" className="relative z-10" onClose={closeModal}>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <div className="fixed inset-0 bg-black bg-opacity-25" />
                            </Transition.Child>

                            <div className="fixed inset-0 overflow-y-auto">
                                <div className="flex min-h-full items-center justify-center p-4 text-center">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="ease-out duration-300"
                                        enterFrom="opacity-0 scale-95"
                                        enterTo="opacity-100 scale-100"
                                        leave="ease-in duration-200"
                                        leaveFrom="opacity-100 scale-100"
                                        leaveTo="opacity-0 scale-95"
                                    >
                                        <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                            <Dialog.Title
                                                as="h3"
                                                className="text-lg font-medium leading-6 text-gray-900"
                                            >
                                                New Category added
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    {`You can now add transactions under ${category.length} different categories!`}
                                                </p>
                                            </div>

                                            <div className="mt-4">
                                                <button
                                                    type="button"
                                                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                    onClick={closeModal}
                                                >
                                                    Got it, thanks!
                                                </button>
                                            </div>
                                        </Dialog.Panel>
                                    </Transition.Child>
                                </div>
                            </div>
                        </Dialog>
                    </Transition>
                </div>
            }
        </div>
    )
}

export default Category