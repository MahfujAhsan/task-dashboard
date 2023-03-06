import React from 'react';
import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineDown } from 'react-icons/ai';
import { GiSandsOfTime } from 'react-icons/gi';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

const NewTask = ({ task, refetch, isLoading }) => {
    const { name, description, completed, inprogress, canceled } = task;

    const setToProgress = async (task) => {
        const newFormData = {
            name: task.name,
            description: task.description,
            inprogress: true,
        };
        try {
            await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
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

    const setToComplete = async (task) => {
        const newFormData = {
            name: task.name,
            description: task.description,
            completed: true,
        };
        try {
            await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(newFormData)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success((`${data?.name} is Completed!`))
                });
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
            canceled: true,
        };

        try {
            await fetch(`http://localhost:5000/api/tasks/${task._id}`, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                },
                body: JSON.stringify(newFormData)
            })
                .then(res => res.json())
                .then(data => {
                    console.log({ data })
                    toast.error((`${data?.name} is Canceled!`))
                });
            refetch();
        }
        catch (error) {
            toast(error.message);
        }
    }

    const deleteTask = async (id) => {
        try {
            await fetch(`http://localhost:5000/api/tasks/${id}`, {
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
        return <p>Loading...</p>
    }

    return (
        <>
            {!inprogress && !completed && !canceled === true ?
                <div className='w-[300px] py-[30px] rounded-lg px-[15px] text-[#000] shadow-lg relative'>
                    <h3><span className='font-bold text-black tracking-wider'>Title: </span>{name}</h3>
                    <p><span className='font-bold text-black tracking-wider'>Description: </span>{description}</p>
                    {/* absolute right-2/4 bottom-2 */}
                    <div className='flex items-center justify-around mt-[18px]'>
                        <div className="dropdown dropdown-hover transition-all ease-in-out duration-200">
                            <label tabIndex={0} className="cursor-pointer bg-white text-black px-[18px] py-[4px] font-semibold rounded-md flex items-center justify-center gap-x-[5px] border shadow-md">Status Update <AiOutlineDown size={18} /> </label>
                            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-stone-100 rounded-box w-44 mt-[2px]">
                                <li><button onClick={() => setToProgress(task)} className='text-black hover:text-stone-900'>
                                    <GiSandsOfTime fill='black' size={20} /> Inprogress
                                </button></li>
                                <li><button onClick={() => setToComplete(task)} className=' text-black hover:text-stone-900'>
                                    <AiOutlineCheckCircle fill='black' size={20} /> Complete
                                </button></li>
                                <li><button onClick={() => setToCanceled(task)} className='text-black hover:text-stone-900'>
                                    <AiOutlineCloseCircle fill='black' size={20} /> Cancel
                                </button></li>

                            </ul>
                        </div>

                        <button onClick={() => deleteTask(task._id)} className='flex items-center bg-red-600 text-white px-[12px] py-[3px] rounded-md shadow-md font-semibold'>
                            Delete <MdDeleteOutline size={22} />
                        </button>
                    </div>
                </div> : ""
            }
        </>
    );
};

export default NewTask;