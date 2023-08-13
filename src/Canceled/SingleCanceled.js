import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRedoAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ConfirmationModal from '../hooks/ConfirmationModal';
import { ImSpinner } from 'react-icons/im';

const SingleCanceled = ({ task, refetch, isLoading }) => {
    const [deletingTask, setDeletingTask] = useState(null);

    const [loading, setLoading] = useState(false);

    const closeModal = () => {
        setDeletingTask(null);
    };

    const { canceled, name, description } = task;

    const handleUndo = async (task) => {
        const newFormData = {
            completed: false,
            inprogress: false,
            canceled: false
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
                    refetch();
                    toast.success((`${data?.name} undo successfully!`))
                })
        }
        catch (error) {
            toast(error.message);
        }
        setLoading(true)
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
                    toast.success((`${data?.name} is Deleted!`))
                    refetch();
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
                    <div className='common__card'>
                        <div className='pb-[20px]'>
                            <div className='flex justify-between items-center'>
                                <h3 className='font-bold text-black tracking-wider text-[20px] capitalize'>{name}</h3>
                                <div>
                                    {
                                        canceled && <span className='bg-[#F17D9A] px-[8px] py-[3px] text-white rounded-md shadow-md text-[10px] font-semibold uppercase'>Canceled</span>
                                    }
                                </div>

                            </div>
                            <p className='text-[15px] text-[#808080] mt-[6px]'>{description}</p>
                        </div>
                        <div className='flex items-center justify-between'>
                            {loading ? <div className='flex justify-center items-center'><ImSpinner className='animate-spin' /></div> : <button disabled={loading && true} className='px-[18px] py-[4px] bg-[#46C4CA] text-white rounded-md shadow-md flex items-center gap-x-[5px]' onClick={() => handleUndo(task)}><FaRedoAlt /> Undo</button>}

                            <label onClick={() => setDeletingTask(task)} htmlFor="confirmation-modal" className="flex items-center bg-[#F85185] text-white px-[12px] py-[3px] rounded-md shadow-md font-semibold cursor-pointer">
                                <MdDeleteOutline size={22} /> Delete
                            </label>

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

export default SingleCanceled;