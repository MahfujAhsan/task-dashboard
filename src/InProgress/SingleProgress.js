import React from 'react';

const SingleProgress = ({ task }) => {
    const { inprogress, name, description } = task;
    return (
        <div>
            {
                inprogress === true ?
                    <div className='w-[300px] bg-stone-600 py-[50px] rounded-lg px-[15px] text-[#fff] shadow-lg'>
                        <h3><span className='font-bold text-black tracking-wider'>Title: </span> {name}</h3>
                        <p><span className='font-bold text-black tracking-wider'>Description: </span> {description}</p>
                </div>
                 : ""
            }
        </div>
    );
};

export default SingleProgress;