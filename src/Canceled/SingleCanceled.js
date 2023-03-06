import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

const SingleCanceled = ({ task, refetch, isLoading }) => {
    const { canceled, name, description } = task;

    const handleUndo = async (task) => {
        const newFormData = {
            name: task.name,
            description: task.description,
            completed: false,
            inprogress: false,
            canceled: false
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
                    toast.success((`${data?.name} undo successfully!`))
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
    return (
        <>
            {
                canceled === true ? <>
                    <div className='w-[300px] py-[50px] rounded-lg px-[15px] text-[#000] shadow-lg relative'>
                        <h3><span className='font-bold text-black tracking-wider'>Title: </span> {name}</h3>
                        <p><span className='font-bold text-black tracking-wider'>Description: </span> {description}</p>
                        <div className='flex items-center justify-around mt-[18px]'>
                            <button className='px-[18px] py-[4px] bg-blue-900 text-white rounded-md shadow-md' onClick={() => handleUndo(task)}>Undo</button>

                            <button onClick={() => deleteTask(task._id)} className='flex items-center bg-red-600 text-white px-[12px] py-[3px] rounded-md shadow-md font-semibold'>
                                Delete <MdDeleteOutline size={22} />
                            </button>
                        </div>
                    </div>
                </> : ""
            }
        </>
    );
};

export default SingleCanceled;