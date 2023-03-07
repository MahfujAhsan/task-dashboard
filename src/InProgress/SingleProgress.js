import React from 'react';
import { toast } from 'react-toastify';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineEdit, AiTwotoneCalendar } from 'react-icons/ai';
import { MdDeleteOutline } from 'react-icons/md';
import Spinner from '../Spinner/Spinner';

const SingleProgress = ({ task, refetch, isLoading }) => {
    const { inprogress, name, description } = task;

    const setToCompleted = async (task) => {
        const newFormData = {
            name: task.name,
            description: task.description,
            inprogress: false,
            completed: true
        };
        try {
            await fetch(`https://task-manager-server-two-self.vercel.app/api/tasks/${task._id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify({ task: newFormData })
            })
                .then(res => res.json())
                .then(data => {
                    toast.success((`${data?.name} is Completed!`))
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
            inprogress: false,
            canceled: true
        };
        try {
            await fetch(`https://task-manager-server-two-self.vercel.app/api/tasks/${task._id}`, {
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
            await fetch(`https://task-manager-server-two-self.vercel.app/api/tasks/${id}`, {
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

    if (isLoading) {
        return <Spinner />
    }
    return (
        <>
            {
                inprogress === true ?
                    <div className='common__card'>
                        <div className='pb-[20px]'>
                            <h3 className='font-bold text-black tracking-wider text-[20px] capitalize'>{name}</h3>
                            <p className='text-[15px] text-[#808080] mt-[6px]'>{description}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            <div className='flex items-center gap-x-[5px] text-[#808080]'>
                                <AiTwotoneCalendar size={18} /> <span>{task.createdAt.toString().slice(0, 10)}</span>
                            </div>

                            <div className="dropdown dropdown-hover">
                                <label tabIndex={0} className="cursor-pointer"><AiOutlineEdit size={22} fill="#F7A000" /></label>
                                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-stone-100 rounded-box w-32 mt-[0px]">
                                    <li>
                                        <button onClick={() => setToCompleted(task)} className='dropdown__btn'>
                                            <AiOutlineCheckCircle fill='black' size={20} />  Complete
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => setToCanceled(task)} className='dropdown__btn'>
                                            <AiOutlineCloseCircle fill='black' size={20} /> Cancel
                                        </button>
                                    </li>

                                </ul>
                            </div>

                            <button onClick={() => deleteTask(task._id)} className='flex items-center text-white px-[12px] py-[3px] font-semibold'>
                                <MdDeleteOutline size={22} fill="#750000" />
                            </button>
                        </div>
                    </div>
                    : ""
            }
        </>
    );
};

export default SingleProgress;