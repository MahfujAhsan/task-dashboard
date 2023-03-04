import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch((err) => console.log(err))
            navigate('/login')
    }

    return (
        <div className='px-[100px] py-[20px] flex justify-between items-center'>
            <div>
                <Link to="/">
                    <h3 className='text-[26px] uppercase font-bold'><span className='text-blue-700'>Task</span> <span className='text-stone-600'>Manager</span></h3>
                </Link>
            </div>
            <div>
                <ul>
                    {user?.uid ? <li>
                        <button onClick={handleLogout} className='bg-primary text-white font-bold px-[20px] py-[7px] rounded-lg shadow-lg text-[14px]'>Logout</button>
                    </li> : <li>
                        <Link className='bg-primary text-white font-bold px-[20px] py-[7px] rounded-lg shadow-lg text-[14px]' to="/login">Login</Link>
                    </li>}
                </ul>
            </div>
        </div>
    );
};

export default Navbar;