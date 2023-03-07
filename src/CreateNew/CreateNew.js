import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import taskIllustration from "../assets/todo.jpg";

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
        <>
            <div>
                <h3 className='text-[32px] text-center font-mono font-semibold'><span className='text-[#F17D9A]'>Create </span><span className='text-[#46C4CA]'>Task</span></h3>
                <div className='mx-[20px] my-[30px] flex items-center'>
                    <form className='flex-1' onSubmit={handleSubmit(handleAddDoctor)}>
                        <div className="common__form__control">
                            <input {...register("name", { required: "Name is Required*" })} placeholder="Task Title" type="text" className="common__inputs px-[20px] py-[10px]" />
                            {errors.name && <p className="text-[20px] mt-[15px] font-bold text-error">{errors.name.message}</p>}
                        </div>

                        <div className="common__form__control">
                            <input {...register("description", { required: "Description is Required*" })} placeholder="Task Information" type="text" className="common__inputs pt-[20px] pb-[200px] px-[20px]" />
                            {errors.description && <p className="text-[20px] mt-[15px] font-bold text-error">{errors.description.message}</p>}
                        </div>

                        <div className="form-control w-full my-[10px]">
                            <input type="submit" className="input_btn" value="Add Task" />
                        </div>
                    </form>
                    <div className='flex-1'>
                        <img className='w-full' src={taskIllustration} alt="" />
                    </div>
                </div>



            </div>
        </>
    );
};

export default CreateNew;