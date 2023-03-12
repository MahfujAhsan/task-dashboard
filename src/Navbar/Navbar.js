import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { AiOutlineArrowDown } from 'react-icons/ai';
import { GoThreeBars } from 'react-icons/go';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

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
        <div className='px-[10px] md:px-[100px] py-[10px] flex justify-between items-center shadow-xl sticky top-0 z-10 bg-white mx-[1px] rounded-lg'>
            <div>
                <Link to="/">
                    <h3 className='text-[22px] md:text-[26px] uppercase font-bold'><span className='text-[#46C4CA]'>Task</span> <span className='text-[#F17D9A]'>Manager</span></h3>
                </Link>
            </div>
            <div>
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden"><GoThreeBars size={24} /></label>
                <ul className='hidden md:block'>
                    {user?.uid ? <div className="dropdown">
                        <label tabIndex={0} className="bg-[#46C4CA] text-white font-bold px-[20px] py-[7px] rounded-lg shadow-lg text-[14px] flex items-center gap-x-[10px] cursor-pointer uppercase">{user?.displayName} <AiOutlineArrowDown size={20}/></label>
                        <ul tabIndex={0} className="dropdown-content menu shadow bg-base-100 rounded-md px-[10px] py-[4px] mt-[10px]">
                            <li><button className='px-[18px] py-[4px] font-semibold bg-[#FA4B81] text-white' onClick={handleLogout}>Logout</button></li>
                        </ul>
                    </div> : <li>
                            <Link className='bg-[#46C4CA] text-white font-bold px-[20px] py-[7px] rounded-lg shadow-lg text-[14px]' to="/login">Login</Link>
                    </li>}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;