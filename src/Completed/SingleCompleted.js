import React from 'react';

const SingleCompleted = ({ task }) => {
    const { completed, name, description } = task;
    return (
        <>
            {
                completed === true ? <>
                    <div className='w-[300px] bg-stone-600 py-[50px] rounded-lg px-[15px] text-[#fff] shadow-lg relative'>
                        <h3><span className='font-bold text-black tracking-wider'>Title: </span> {name}</h3>
                        <p><span className='font-bold text-black tracking-wider'>Description: </span> {description}</p>
                        <div className='absolute right-1 bottom-1 bg-green-900 px-[8px] py-[4px] rounded-lg text-[10px] font-semibold tracking-wide'>
                            <p>Completed</p>
                        </div>
                    </div>
                </> : ""
            }
        </>
    );
};

export default SingleCompleted;