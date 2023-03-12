import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AuthContext } from '../contexts/AuthProvider';
import Spinner from '../Spinner/Spinner';

const SignUp = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { createUser, updateUser, loading } = useContext(AuthContext);

    const [signUpError, setSignUpError] = useState('');


    const navigate = useNavigate();

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
                console.log(data)
            });
    };

    if(loading) {
        return <Spinner />
    }


    const onSubmit = async (data) => {
        await createUser(data.email, data.password)
            .then(async (res) => {
                toast('Congrats. You Have Registered Successfully & Logged In.')
                const { data: response } = await axios.post('https://task-manager-server-two-self.vercel.app/api/users/login', {
                    email: data.email,
                });
                const userInfo = {
                    displayName: data.name
                }
                await updateUser(userInfo)
                .then(() => {
                    saveUser(data.name, data.email)
                    if (response.accessToken) {
                        localStorage.setItem('token', response.accessToken);
                        navigate("/create-new")
                        }
                    })
                    .catch(err => { console.log(err) })
            })
            .catch(err => {
                setSignUpError(err.message);
            })
    };

    return (
        <div>
           
            <section className='h-screen flex justify-center items-center w-10/12 md:w-4/12 mx-auto'>
                <div className="w-full mx-auto md:py-[45px] rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h3 className='text-[32px] text-center font-mono font-semibold'><span className='text-[#F17D9A]'>Sign</span> <span className='text-[#46C4CA]'>Up</span></h3>
                        <div className="form-control w-full mx-auto my-[10px]">
                            <input {...register("name", { required: "Name is Required*" })} type="text" className="input w-full shadow-md shadow-accent focus:outline-none" placeholder='Your Name' />
                            {errors.name && <p className="text-[14px] mt-[15px] font-bold text-error">{errors.name.message}</p>}
                        </div>

                        <div className="form-control w-full mx-auto my-[30px]">
                            <input {...register("email", { required: "Email is Required*" })} type="text" className="input w-full shadow-md shadow-accent focus:outline-none" placeholder='Email Address' />
                            {errors.email && <p className="text-[14px] mt-[15px] font-bold text-error">{errors.email.message}</p>}
                        </div>

                        <div className="form-control w-full mx-auto my-[10px]">
                            <input {...register("password", { required: "Password is Required*", minLength: { value: 6, message: "6 char required" }, pattern: { value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "one latter, one symbol, one number" } })} type="password" placeholder='Password (ex: M@2288)' className="input w-full shadow-md shadow-accent focus:outline-none" />
                            {errors.password && <p className="text-[14px] mt-[15px] font-bold text-error">{errors.password.message}</p>}
                        </div>

                        <div className="form-control w-12/12 mx-auto  mt-[25px]">
                            <input type="submit" className="btn bg-gradient-to-r from-[#46C4CA] to-[#F85185] w-full mx-auto font-bold text-[16px] text-white mt-[5px] border-none" value="Register" />
                        </div>
                        {
                            signUpError && <p className="text-error">{signUpError}</p>
                        }
                    </form>
                    <p className="text-center text-[16px] mt-[35px] text-[#46C4CA] font-semibold">Already have an account? <Link className="text-[#F85185]" to="/login">Please LOGIN</Link></p>
                </div>
            </section>
        </div>
    );
};

export default SignUp;