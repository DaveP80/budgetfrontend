import React from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { navLinks } from '../constants';
import { useState } from 'react';
import {close, menu, piggy, start} from '../assets'

function Nav() {
    const navigate = useNavigate();
    return (
<nav className="bg-purple-500">
  <div className="container mx-auto flex items-center justify-between py-4">
    <img src={piggy} alt='pig' className='w-1/4 sm:w-[280px] sm:h-[250px]'/>
    <img src={start} alt='start' onClick={() => navigate('transactions/category')} className='cursor-pointer'/>
    <ul className="flex space-x-4 list-none">
      {navLinks.map((item, i) => {
        return (
          <li key={i}>
            <NavLink
              to={item.id}
              className="text-white hover:text-green-500"
              activeclassname="text-green-500"
            >
              {item.title}
            </NavLink>
          </li>
        );
      })}
    </ul>
  </div>
</nav>
    )
}

export default Nav