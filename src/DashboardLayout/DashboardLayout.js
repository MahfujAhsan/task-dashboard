import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { BiGridAlt } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import { GrInProgress } from 'react-icons/gr';
import { IoCloseCircleOutline } from 'react-icons/io5';
import "../styles/style.css";
import Navbar from '../Navbar/Navbar';

const DashboardLayout = () => {
    return (
        <section>
            <Navbar />
            <div className="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 bg-base-100 text-base-content border">
                        <Link className='common__flex common__items' to='/'>
                            <BiGridAlt size={22} />
                            <li className='text-[20px]'>Dashboard</li>
                        </Link>

                        <Link className='common__flex common__items' to='/create-new'>
                            <AiOutlineEdit size={22} />
                            <li className='text-[20px]'>Create New</li>
                        </Link>

                        <Link className='common__flex common__items' to='/new-tasks'>
                            <FaTasks size={22} />
                            <li className='text-[20px]'>New Tasks</li>
                        </Link>

                        <Link className='common__flex common__items' to='/in-progress'>
                            <GrInProgress size={22} />
                            <li className='text-[20px]'>In Progress</li>
                        </Link>

                        <Link className='common__flex common__items' to='/completed'>
                            <AiOutlineCheckCircle size={22} />
                            <li className='text-[20px]'>Completed</li>
                        </Link>

                        <Link className='common__flex common__items' to='/canceled'>
                            <IoCloseCircleOutline size={22} />
                            <li className='text-[20px]'>Canceled</li>
                        </Link>
                    </ul>

                </div>
            </div>
        </section>
    );
};

export default DashboardLayout;