import React from 'react';

const SingleCanceled = ({ task }) => {
    const { canceled, name, description } = task;
    return (
        <>
            {
                canceled === true ? <>
                    <div className='w-[300px] bg-stone-600 py-[50px] rounded-lg px-[15px] text-[#fff] shadow-lg relative'>
                        <h3><span className='font-bold text-white tracking-wider'>Title: </span> {name}</h3>
                        <p><span className='font-bold text-white tracking-wider'>Description: </span> {description}</p>
                        <div className='absolute right-1 bottom-1 bg-red-900 px-[8px] py-[4px] rounded-lg text-[10px] font-semibold tracking-wide'>
                            <p>Canceled</p>
                        </div>
                    </div>
                </> : ""
            }
        </>
    );
};

export default SingleCanceled;