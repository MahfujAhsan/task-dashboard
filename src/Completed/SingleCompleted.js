import React, { useState } from 'react';
import { AiOutlineCloseCircle, AiOutlineEdit, AiTwotoneCalendar } from 'react-icons/ai';
import { GiSandsOfTime } from 'react-icons/gi';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import ConfirmationModal from '../hooks/ConfirmationModal';

const SingleCompleted = ({ task, refetch, isLoading }) => {
    const [deletingTask, setDeletingTask] = useState(null);

    const closeModal = () => {
        setDeletingTask(null);
    };

    const { completed, name, description } = task;

    const setToInprogress = async (task) => {
        const newFormData = {
            name: task.name,
            description: task.description,
            completed: false,
            inprogress: true,
        };
        try {
            await fetch(`https://task-managerserver.vercel.app/api/tasks/${task._id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({ task: newFormData })
            })
                .then(res => res.json())
                .then(data => {
                    toast.info((`${data?.name} is In Progress!`))
                })
            refetch();
        }
        catch (error) {
            toast(error.message);
        }
    }

    const setToCanceled = async (task) => {
        const newFormData = {
            name: task.name,
            description: task.description,
            completed: false,
            canceled: true
        };
        try {
            await fetch(`https://task-managerserver.vercel.app/api/tasks/${task._id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({ task: newFormData })
            })
                .then(res => res.json())
                .then(data => {
                    toast.error((`${data?.name} is Canceled!`))
                })
            refetch();
        }
        catch (error) {
            toast(error.message);
        }
    }

    const deleteTask = async (id) => {
        try {
            await fetch(`https://task-managerserver.vercel.app/api/tasks/${id}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json', 'authorization': 'Bearer ' + localStorage.getItem('token'),
                },
            })
                .then(res => res.json())
                .then(data => {
                    refetch();
                    toast.success((`${data?.name} is Deleted!`))
                })
        }
        catch (error) {
            toast(error.message);
        }
    };
    return (
        <>
            {
                completed === true ? <>
                    <div className='common__card'>
                        <div className='pb-[20px]'>
                            <h3 className='font-bold text-black tracking-wider text-[20px] capitalize'>{name}</h3>
                            <p className='text-[15px] text-[#808080] mt-[6px]'>{description}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-[10px]'>
                                <div className='flex items-center gap-x-[5px] text-[#808080]'>
                                    <AiTwotoneCalendar size={18} /> <span>{task.createdAt.toString().slice(0, 10)}</span>
                                </div>
                                <div className="dropdown dropdown-bottom">
                                    <label tabIndex={0} className="cursor-pointer"><AiOutlineEdit size={22} fill="#2A9198" /></label>
                                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-stone-100 rounded-box w-32 mt-[0px] -right-14">
                                        <li>
                                            <button onClick={() => setToInprogress(task)} className='dropdown__btn'>
                                                <GiSandsOfTime fill='black' size={20} />  Inprogress
                                            </button>
                                        </li>
                                        <li className='mt-[10px]'>
                                            <button onClick={() => setToCanceled(task)} className=' dropdown__btn'>
                                                <AiOutlineCloseCircle fill='black' size={20} /> Cancel
                                            </button>
                                        </li>

                                    </ul>
                                </div>

                                <label onClick={() => setDeletingTask(task)} htmlFor="confirmation-modal" className="flex items-center text-white px-[12px] py-[3px] font-semibold cursor-pointer">
                                    <MdDeleteOutline size={22} fill="#F85185" />
                                </label>
                            </div>

                            <div>
                                {
                                    completed && <span className='bg-green-900 px-[8px] py-[3px] text-white rounded-md shadow-md text-[10px] font-semibold uppercase'>Completed</span>
                                }
                            </div>
                        </div>
                        {
                            deletingTask && <ConfirmationModal title={`Are you sure, you want to delete?`} message={`If you delete "${deletingTask.name}", It cannot be undo.`} closeModal={closeModal} successAction={deleteTask} modalData={deletingTask} successButtonName="Delete"></ConfirmationModal>
                        }
                    </div>
                </> : ""
            }
        </>
    );
};

export default SingleCompleted;