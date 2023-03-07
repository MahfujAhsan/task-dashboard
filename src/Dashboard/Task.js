import React from 'react';
import { AiTwotoneCalendar } from 'react-icons/ai';

const Task = ({ task }) => {
    const { name, description, canceled, completed, inprogress } = task;

    return (
        <div className="common__card">
            <div className="">
                <h2 className=" font-mono capitalize text-[22px]">{name}</h2>
                <p className='mb-[20px] text-[#808080]'>{description}</p>
                <div className="flex justify-between items-center">
                    <div className='flex items-center gap-x-[5px] text-[#808080]'>
                        <AiTwotoneCalendar size={18} /> <span>{task.createdAt.toString().slice(0, 10)}</span>
                    </div>
                    <div>
                        {
                            completed && <span className='bg-green-900 px-[8px] py-[3px] text-white rounded-md shadow-md text-[14px] font-semibold'>Completed</span>
                        }
                        {
                            inprogress && <span className='bg-[#46C4CA] px-[8px] py-[3px] text-white rounded-md shadow-md text-[14px] font-semibold'>Inprogress</span>
                        }
                        {
                            canceled && <span className='bg-[#F17D9A] px-[8px] py-[3px] text-white rounded-md shadow-md text-[10px] font-semibold uppercase'>Canceled</span>
                        }
                        {
                            !completed && !inprogress && !canceled && <span className='bg-stone-900 px-[8px] py-[3px] text-white rounded-md shadow-md text-[10px] font-semibold uppercase'>New</span>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Task;