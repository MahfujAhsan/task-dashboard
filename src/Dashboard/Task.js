import React, { useState } from 'react';

const Task = ({ task }) => {
    const { name, description, canceled, completed, inprogress } = task;

    // const [stat, setStatus] = useState("");

    // if (canceled === true) {
    //     setStatus('Canceled');
    //     return stat
    // }
    // if (completed === true) {
    //     setStatus('Completed');
    //     return stat
    // }
    // if (inprogress === true) {
    //     setStatus('Inprogress');
    //     return stat
    // }

    return (
        <div className="card bg-base-100 w-[300px] shadow-xl relative">
            <div className="card-body">
                <h2 className="card-title justify-center">{name}</h2>
                <p className='mb-[15px]'>{description}</p>
                <div className="absolute bottom-2 right-2">
                    {
                        completed && <span className='bg-green-900 px-[8px] py-[3px] text-white rounded-md shadow-md text-[14px] font-semibold'>Completed</span>
                    }
                    {
                        inprogress && <span className='bg-blue-900 px-[8px] py-[3px] text-white rounded-md shadow-md text-[14px] font-semibold'>Inprogress</span>
                    }
                    {
                        canceled && <span className='bg-red-900 px-[8px] py-[3px] text-white rounded-md shadow-md text-[14px] font-semibold'>Canceled</span>
                    }
                    {
                        !completed && !inprogress && !canceled && <span className='bg-stone-900 px-[8px] py-[3px] text-white rounded-md shadow-md text-[14px] font-semibold'>New</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default Task;