import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import { navLinks } from '../constants';
import { useState, useEffect } from 'react';
import { piggy } from '../assets'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios';

function Nav() {
    const navigate = useNavigate();
    const location = useLocation()
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [balance, setBalance] = useState(0)
    // eslint-disable-next-line
    useEffect(() => {
        getBalance()
    }, [location])

    async function getBalance() {
        await axios.get(`${process.env.REACT_APP_URL}transactions`).then(res => { if (res.data.length) setBalance((res.data.reduce((accumulator, item) => {
            return accumulator + parseFloat(item.value);;
        }, 0)).toFixed(2));}).catch(e => console.log(e))
    }
    return (

        <header className="absolute inset-x-0 top-0 z-50 bg-purple-500">
            <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <span className="sr-only">Budget</span>
                    <img
                        className="h-8 w-auto"
                        src={piggy}
                        alt="pig"
                    />
                </div>
                <h2 className="bg-green-200 text-green-800 rounded-full px-3 py-1">
                    {balance}
                </h2>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden px-5 lg:flex lg:gap-x-12">
                    {navLinks.map((item) => (
                        <p key={item.id} onClick={() => navigate(item.id)} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
                            {item.title}
                        </p>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <p onClick={() => navigate('/transactions/category')} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
                        Get Started <span aria-hidden="true">&rarr;</span>
                    </p>
                </div>
            </nav>
            <Dialog as="div" className="lg:hidden" open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <span className="sr-only">Budget!</span>
                        <img
                            className="h-8 w-auto"
                            src={piggy}
                            alt="pig"
                        />

                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                {navLinks.map((item, i) => (
                                    <p
                                        key={i}
                                        onClick={() => navigate(item.id)}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                    >
                                        {item.title}
                                    </p>
                                ))}
                            </div>
                            <div className="py-6">
                                <p
                                    onClick={() => navigate('transactions/category')}
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Get Started
                                </p>
                            </div>
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>

    )
}

export default Nav