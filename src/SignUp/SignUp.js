import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [signUpError, setSignUpError] = useState('');

    const { createUser, updateUser } = useContext(AuthContext);

    

    const onSubmit = data => {
        console.log(data)
    };

    return (
        <div>
            <section className='h-[800px] flex justify-center items-center'>
                <div className="w-full mx-auto py-[45px] rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full mx-auto my-[10px]">
                            <label className="label">
                                <span className="label-text text-[14px] font-bold text-white bg-stone-600 px-[10px] py-[4px] rounded shadow-md">Name:</span>
                            </label>
                            <input {...register("name", { required: "Name is Required*" })} type="text" className="input w-full shadow-md shadow-accent focus:outline-none" />
                            {errors.name && <p className="text-[20px] mt-[15px] font-bold text-error">{errors.name.message}</p>}
                        </div>

                        <div className="form-control w-full mx-auto my-[10px]">
                            <label className="label">
                                <span className="label-text text-[14px] font-bold text-white bg-stone-600 px-[10px] py-[4px] rounded shadow-md">Email:</span>
                            </label>
                            <input {...register("email", { required: "Email is Required*" })} type="text" className="input w-full shadow-md shadow-accent focus:outline-none" />
                            {errors.email && <p className="text-[20px] mt-[15px] font-bold text-error">{errors.email.message}</p>}
                        </div>

                        <div className="form-control w-full mx-auto my-[10px]">
                            <label className="label">
                                <span className="label-text text-[14px] font-bold text-white bg-stone-600 px-[10px] py-[4px] rounded shadow-md">Password:</span>
                            </label>
                            <input {...register("password", { required: "Password is Required*", minLength: { value: 6, message: "6 char required" }, pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "Password must be strong" } })} type="password" className="input w-full shadow-md shadow-accent focus:outline-none" />
                            {errors.password && <p className="text-[20px] mt-[15px] font-bold text-error">{errors.password.message}</p>}
                        </div>

                        <div className="form-control w-8/12 mx-auto my-[10px]">
                            <input type="submit" className="btn bg-gradient-to-r from-neutral to-primary w-8/12 mx-auto font-bold text-[22px] text-white mt-[5px]" value="Register" />
                        </div>
                        {
                            signUpError && <p className="text-error">{signUpError}</p>
                        }
                    </form>
                    <p className="text-center text-[18px] mt-[35px] text-primary">Already have an account? <Link className="text-error" to="/login">Please Login</Link></p>
                    <div className="divider w-8/12 mx-auto">OR</div>
                    <div className="w-8/12 mx-auto">
                        <button className="btn btn-success w-full font-pacifico font-bold text-white mt-[15px]">Continue With Google</button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default SignUp;