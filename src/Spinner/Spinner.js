import React from 'react';
import loader from "../loader.jpg"

const Spinner = () => {
    return (
        <div className='flex justify-center items-center h-screen'>
            <img width={100} src={loader} alt="loader" />
        </div>
    );
};

export default Spinner;