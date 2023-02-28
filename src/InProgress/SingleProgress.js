import React from 'react';

const SingleProgress = ({ task }) => {
    const { inprogress, name, description } = task;
    return (
        <div>
            {
                inprogress === true ?
                    <div className='w-[300px] bg-stone-600 py-[50px] rounded-lg px-[15px] text-[#fff] shadow-lg'>
                    <h3>Title: {name}</h3>
                    <p>Description: {description}</p>
                </div>
                 : ""
            }
        </div>
    );
};

export default SingleProgress;