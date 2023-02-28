import React from 'react';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { GiSandsOfTime } from 'react-icons/gi';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const NewTask = ({ task, refetch }) => {
    const { name, description, completed, inprogress, canceled } = task;

    const navigate = useNavigate();

    const setToProgress = async (task) => {
        // console.log(task)
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
                },
                body: JSON.stringify(newFormData)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success((`${data?.name} is In Progress!`))
                })
            refetch();
            // navigate("/in-progress");
        }
        catch (error) {
            toast(error.message);
        }
    }

    const setToComplete = async (task) => {
        // console.log(task)
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
                },
                body: JSON.stringify(newFormData)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success((`${data?.name} is Completed!`))
                });
            refetch();
            navigate("/completed");
        }
        catch (error) {
            toast(error.message);
        }
    }

    const setToCanceled = async (task) => {
        // console.log(task)
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
                },
                body: JSON.stringify(newFormData)
            })
                .then(res => res.json())
                .then(data => {
                    toast.success((`${data?.name} is Canceled!`))
                });
            refetch();
        }
        catch (error) {
            toast(error.message);
        }
    }

    return (
        <>
            {!inprogress && !completed && !canceled === true ?
                <div className='w-[300px] bg-stone-600 py-[50px] rounded-lg px-[15px] text-[#fff] shadow-lg relative'>
                    <h3><span className='font-bold text-black tracking-wider'>Title: </span>{name}</h3>
                    <p><span className='font-bold text-black tracking-wider'>Description: </span>{description}</p>

                    <div className='absolute right-2 bottom-2'>
                        <button onClick={() => setToProgress(task)} className='hover:text-stone-900'>
                            <GiSandsOfTime size={20} />
                        </button>
                        <button onClick={() => setToComplete(task)} className='mx-[8px] hover:text-stone-900'>
                            <AiOutlineCheckCircle size={20} />
                        </button>
                        <button onClick={() => setToCanceled(task)} className='hover:text-stone-900'>
                            <IoCloseCircleOutline size={20} />
                        </button>
                    </div>
                </div> : ""
            }
        </>
    );
};

export default NewTask;