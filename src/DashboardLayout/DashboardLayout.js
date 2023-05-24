import React, { useContext } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { BiGridAlt } from 'react-icons/bi';
import { AiOutlineEdit, AiOutlineCheckCircle, AiOutlineArrowDown } from 'react-icons/ai';
import { FaTasks } from 'react-icons/fa';
import { GrInProgress } from 'react-icons/gr';
import { IoCloseCircleOutline } from 'react-icons/io5';
import "../styles/style.css";
import Navbar from '../Navbar/Navbar';
import { AuthContext } from '../contexts/AuthProvider';

const DashboardLayout = () => {
    const { user, logOut } = useContext(AuthContext);

    console.log(user)

    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => {
                localStorage.removeItem('token');
            })
            .catch((err) => console.log(err))
        navigate('/login')
    }
    return (
        <section>
            <Navbar />
            <div className="drawer drawer-mobile fixed">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label> */}
                    <Outlet></Outlet>
                </div>
                {user && <div className="drawer-side hidden md:block">
                    <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-full md:w-64 border-r-2 bg-[#F17D9A] md:bg-transparent text-white md:text-black">
                        <ul className='block md:hidden text-center'>
                            {user?.uid ? <div className="dropdown">
                                <label tabIndex={0} className="bg-[#46C4CA] text-white font-bold px-[20px] py-[7px] rounded-lg shadow-lg text-[14px] flex items-center gap-x-[10px] cursor-pointer uppercase">{user?.displayName} <AiOutlineArrowDown size={20} /></label>
                                <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-md px-[10px] py-[4px] mt-[10px]">
                                    <li><button className='px-[18px] py-[4px] font-semibold bg-[#FA4B81] text-white' onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div> : <li>
                                <Link className='bg-[#46C4CA] text-white font-bold px-[20px] py-[7px] rounded-lg shadow-lg text-[14px]' to="/login">Login</Link>
                            </li>}
                        </ul>
                        <NavLink exact activeClassName="active" className='common__flex common__items' to='/'>
                            <BiGridAlt size={22} />
                            <li className='text-[20px]'>Dashboard</li>
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