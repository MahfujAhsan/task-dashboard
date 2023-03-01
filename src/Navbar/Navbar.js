import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='px-[100px] py-[20px] flex justify-between items-center'>
            <div>
                <h3 className='text-[26px] uppercase font-bold'><span className='text-blue-700'>Task</span> <span className='text-stone-600'>Manager</span></h3>
            </div>
            <div>
                <ul>
                    <li>
                        <Link className='bg-primary text-white font-bold px-[20px] py-[7px] rounded-lg shadow-lg text-[14px]' to="/login">Login</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;