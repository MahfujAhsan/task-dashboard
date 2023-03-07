import React, { useState } from 'react';
import { MdDeleteOutline } from 'react-icons/md';
import { FaRedoAlt } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ConfirmationModal from '../hooks/ConfirmationModal';

const SingleCanceled = ({ task, refetch, isLoading }) => {
    const [deletingTask, setDeletingTask] = useState(null);

    const closeModal = () => {
        setDeletingTask(null);
    };

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
                    <div className='common__card'>
                        <div className='pb-[20px]'>
                            <h3 className='font-bold text-black tracking-wider text-[20px] capitalize'>{name}</h3>
                            <p className='text-[15px] text-[#808080] mt-[6px]'>{description}</p>
                        </div>
                        <div className='flex items-center justify-around mt-[18px]'>
                            <button className='px-[18px] py-[4px] bg-blue-900 text-white rounded-md shadow-md flex items-center gap-x-[5px]' onClick={() => handleUndo(task)}><FaRedoAlt /> Undo</button>

                            <label onClick={() => setDeletingTask(task)} htmlFor="confirmation-modal" className="flex items-center bg-red-600 text-white px-[12px] py-[3px] rounded-md shadow-md font-semibold cursor-pointer">
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