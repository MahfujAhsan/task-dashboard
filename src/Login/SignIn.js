import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import Spinner from '../Spinner/Spinner';

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();


    const { signIn, user, loading } = useContext(AuthContext);

    const navigate = useNavigate();

    const [loginError, setLoginError] = useState("");

    const [loginUserEmail, setLoginUserEmail] = useState("");

    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const onSubmit = data => {
        signIn(data.email, data.password)
            .then(async (res) => {
                if (res) {
                    setLoginUserEmail(data.email);

                    console.log("logged in successfully")
                    navigate("/create-new")
                    const { data: response } = await axios.post('https://task-manager-server-two-self.vercel.app/api/users/login', {
                        email: data.email,
                    });

                    if (response.accessToken) {
                        localStorage.setItem('token', response.accessToken);
                    }
                
                }
            })
            .catch((err) => {
                setLoginError(err.message)
            })

    };

    if (loading) {
        return <Spinner />
    }


    return (
        <div>
            <section className='h-screen flex justify-center items-center w-4/12 mx-auto'>
                <div className="w-full mx-auto py-[45px] rounded-lg">
                    <h3 className='text-[32px] text-center font-mono font-semibold'><span className='text-[#F17D9A]'>Log</span><span className='text-[#46C4CA]'>In</span></h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full mx-auto my-[10px]">
                            <input {...register("email", { required: "Email is Required*" })} type="text" className="input w-full shadow-md shadow-accent focus:outline-none" placeholder='Email' />
                            {errors.email && <p className="font-caveat text-[14px] mt-[8px] ml-[4px] font-bold text-error">{errors.email.message}</p>}
                        </div>

                        <div className="form-control w-full mx-auto my-[20px]">
                            <input {...register("password", { required: "Password is Required*", minLength: { value: 6, message: "6 char required" } })} type="password" className="input w-full shadow-md shadow-accent focus:outline-none" placeholder='Password' />
                            {errors.password && <p className="font-caveat text-[14px] mt-[8px] ml-[4px] font-bold text-error">{errors.password.message}</p>}
                        </div>
                            <label className="label cursor-pointer">
                                <span className="label-text text-[16px] mt-[10px] font-semibold text-[#808080]">Forgot Password?</span>
                            </label>

                        <div className="form-control w-full mx-auto">
                            <input type="submit" className="btn bg-gradient-to-r from-[#46C4CA] to-[#F85185] border-none w-full mx-auto font-bold text-[16px] text-white mt-[5px]" value="Submit" />
                        </div>
                        <div>
                            {
                                loginError && <p className="text-center mt-[15px] text-error">{loginError}</p>
                            }
                        </div>
                    </form>
                    <p className="text-center text-[18px] mt-[35px] font-semibold"><span className='font-semibold text-[#F85185]'>New to  Task Manager?</span> <Link className="font-semibold text-[#46C4CA]" to="/signup">Create New Account</Link></p>
                </div>
            </section>
        </div>
    );
};

export default SignIn;