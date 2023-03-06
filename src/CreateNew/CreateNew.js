import axios from 'axios';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateNew = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const handleAddDoctor = (data) => {

        fetch("https://task-manager-server-two-self.vercel.app/api/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify({ task: data })
        })
            .then((res) => res.json())
            .then((data) => {
                toast.success((`${data?.name} is Added Successfully`))
                navigate("/new-tasks")
            })
    }
    return (
        <div className='ml-[50px] mt-[30px]'>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="common__form__control">
                    <label className="my-[15px]">
                        <span className="common__input__label">Title:</span>
                    </label>
                    <input {...register("name", { required: "Name is Required*" })} placeholder="Task Title" type="text" className="common__inputs px-[20px] py-[10px]" />
                    {errors.name && <p className="text-[20px] mt-[15px] font-bold text-error">{errors.name.message}</p>}
                </div>

                <div className="common__form__control">
                    <label className="my-[15px]">
                        <span className="common__input__label">Description:</span>
                    </label>
                    <input {...register("description", { required: "Description is Required*" })} placeholder="Task Information" type="text" className="common__inputs pt-[20px] pb-[200px] px-[20px]" />
                    {errors.description && <p className="text-[20px] mt-[15px] font-bold text-error">{errors.description.message}</p>}
                </div>

                <div className="form-control w-4/12 my-[10px]">
                    <input type="submit" className="input_btn" value="Add Task" />
                </div>
            </form>
        </div>
    );
};

export default CreateNew;