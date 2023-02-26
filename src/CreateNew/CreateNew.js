import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

const CreateNew = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate();

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['specialty'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/api/tasks');
            const data = res.json();
            return data;
        }
    });

    console.log(tasks)

    const handleAddDoctor = (data) => {

    }
    return (
        <div>
            <form onSubmit={handleSubmit(handleAddDoctor)}>
                <div className="form-control w-full mx-auto my-[10px]">
                    <label className="label">
                        <span className="label-text font-caveat text-[20px] font-bold text-primary mb-[5px]">Task Name:</span>
                    </label>
                    <input {...register("name", { required: "Name is Required*" })} type="text" className="input w-full shadow-md shadow-accent text-error focus:outline-none" />
                    {errors.name && <p className="font-caveat text-[20px] mt-[15px] font-bold text-error">{errors.name.message}</p>}
                </div>

                <div className="form-control w-full mx-auto my-[10px]">
                    <label className="label">
                        <span className="label-text font-caveat text-[20px] font-bold text-primary mb-[5px]">Description:</span>
                    </label>
                    <input {...register("description", { required: "Description is Required*" })} type="text" className="input w-full shadow-md shadow-accent text-error focus:outline-none" />
                    {errors.description && <p className="font-caveat text-[20px] mt-[15px] font-bold text-error">{errors.description.message}</p>}
                </div>

                <div className="form-control w-8/12 mx-auto my-[10px">
                    <input type="submit" className="btn bg-gradient-to-r from-neutral to-primary w-full mx-auto font-bold text-[18px] text-white mt-[5px]" value="Add Tasks" />
                </div>
            </form>
        </div>
    );
};

export default CreateNew;