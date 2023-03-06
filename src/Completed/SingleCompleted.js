import React from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { toast } from 'react-toastify';

const SingleCompleted = ({ task, refetch, isLoading }) => {
    const { completed, name, description } = task;

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
    return (
        <>
            {
                completed === true ? <>
                    <div className='w-[300px] py-[50px] rounded-lg px-[15px] text-[#000] shadow-lg relative'>
                        <h3><span className='font-bold text-black tracking-wider'>Title: </span> {name}</h3>
                        <p><span className='font-bold text-black tracking-wider'>Description: </span> {description}</p>
                        <div className='flex items-center justify-around mt-[18px]'><button onClick={() => deleteTask(task._id)} className='flex items-center bg-red-600 text-white px-[12px] py-[3px] rounded-md shadow-md font-semibold'>
                            Delete <MdDeleteOutline size={22} />
                        </button>
                        </div>
                        <div className='absolute right-1 bottom-1 bg-green-900 px-[8px] py-[4px] rounded-lg text-[10px] font-semibold tracking-wide text-white'>
                            <p>Completed</p>
                        </div>
                    </div>
                </> : ""
            }
        </>
    );
};

export default SingleCompleted;