import { async } from '@firebase/util';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthProvider';
import useToken from '../hooks/useToken';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser, updateUser } = useContext(AuthContext);

    const [signUpError, setSignUpError] = useState('');

    const [createdUserEmail, setCreatedUserEmail] = useState('');

    const [token] = useToken(createdUserEmail)


    const navigate = useNavigate();

    if (token) {
        navigate("/");
    }

    const saveUser = (name, email) => {
        const user = { name, email };
        fetch('https://task-manager-server-two-self.vercel.app/api/users', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'authorization': 'Bearer ' + localStorage.getItem('token'),
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                setCreatedUserEmail(email);
            });
    };


    const onSubmit = async (data) => {
        await createUser(data.email, data.password)
            .then(async (res) => {
                const user = res.user;
                toast('User created & please Login')
                const userInfo = {
                    displayName: data.name
                }
                await updateUser(userInfo)
                    .then(() => {
                        saveUser(data.name, data.email)
                    })
                    .catch(err => { console.log(err) })
                navigate("/login")
            })
            .catch(err => {
                setSignUpError(err.message);
            })
    };

    return (
        <div>
            <section className='h-[500px] flex justify-center items-center w-4/12 mx-auto'>
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
                            <input type="submit" className="btn bg-gradient-to-r from-stone-600 to-primary w-full mx-auto font-bold text-[16px] text-white mt-[5px] border-none" value="Register" />
                        </div>
                        {
                            signUpError && <p className="text-error">{signUpError}</p>
                        }
                    </form>
                    <p className="text-center text-[18px] mt-[35px] text-primary">Already have an account? <Link className="text-error" to="/login">Please Login</Link></p>
                </div>
            </section>
        </div>
    );
};

export default SignUp;