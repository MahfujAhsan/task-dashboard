import React, { useContext } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { BiGridAlt } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineCheckCircle } from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import { GrInProgress } from 'react-icons/gr';
import { IoCloseCircleOutline } from 'react-icons/io5';
import "../styles/style.css";
import Navbar from '../Navbar/Navbar';
import { AuthContext } from '../contexts/AuthProvider';

const DashboardLayout = () => {
    const { user } = useContext(AuthContext);
    return (
        <section>
            <Navbar />
            <div className="drawer drawer-mobile  fixed">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
                    <Outlet></Outlet>
                </div>
                {user && <div className="drawer-side">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-64 rounded-lg shadow-black shadow-inner ml-[12px]">
                        <NavLink exact activeClassName="active" className='common__flex common__items' to='/'>
                            <BiGridAlt size={22} />
                            <li className='text-[20px]'>All Tasks</li>
                        </NavLink>

                        <NavLink exact activeClassName="active" className='common__flex common__items' to='/create-new'>
                            <AiOutlineEdit size={22} />
                            <li className='text-[20px]'>Create Task</li>
                        </NavLink>

                        <NavLink exact activeClassName="active" className='common__flex common__items' to='/new-tasks'>
                            <FaTasks size={22} />
                            <li className='text-[20px]'>Task List</li>
                        </NavLink>

                        <NavLink exact activeClassName="active" className='common__flex common__items' to='/in-progress'>
                            <GrInProgress size={22} />
                            <li className='text-[20px]'>In Progress</li>
                        </NavLink>

                        <NavLink exact activeClassName="active" className='common__flex common__items' to='/completed'>
                            <AiOutlineCheckCircle size={22} />
                            <li className='text-[20px]'>Completed</li>
                        </NavLink>

                        <NavLink exact activeClassName="active" className='common__flex common__items' to='/canceled'>
                            <IoCloseCircleOutline size={22} />
                            <li className='text-[20px]'>Canceled</li>
                        </NavLink>
                    </ul>

                </div>}
            </div>
        </section>
    );
};

export default DashboardLayout;