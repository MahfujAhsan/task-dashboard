import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateNew = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const handleAddDoctor = (data) => {
        fetch("http://localhost:5000/api/tasks", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((data) => {
            toast.success((`${data?.name} is Added Successfully`))
            navigate("/new-tasks")
        })
    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="common__form__control">
                    <label className="my-[15px]">
                        <span className="common__input__label">Title:</span>
                    </label>
                    <input {...register("name", { required: "Name is Required*" })} type="text" className="common__inputs px-[20px] py-[10px]" />
                    {errors.name && <p className="text-[20px] mt-[15px] font-bold text-error">{errors.name.message}</p>}
                </div>

                <div className="common__form__control">
                    <label className="my-[15px]">
                        <span className="common__input__label">Description:</span>
                    </label>
                    <input {...register("description", { required: "Description is Required*" })} type="text" className="common__inputs py-[100px] px-[20px]" />
                    {errors.description && <p className="text-[20px] mt-[15px] font-bold text-error">{errors.description.message}</p>}
                </div>

                <div className="form-control w-8/12 mx-auto my-[10px]">
                    <input type="submit" className="input_btn" value="Add Task" />
                </div>
            </form>
        </div>
    );
};

export default CreateNew;