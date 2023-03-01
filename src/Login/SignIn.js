import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const SignIn = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const { signIn } = useContext(AuthContext);

    const [loginError, setLoginError] = useState("");
    const [loginUserEmail, setLoginUserEmail] = useState("");

    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const onSubmit = data => {
        console.log(data)
        signIn(data.email, data.password)
        .then((res) => {
            if(res) {
                setLoginUserEmail(data.email)
            }
        })
        .catch((err) => {
            setLoginError(err.message)
        })
    };

    return (
        <div>
            <section className='h-[800px] flex justify-center items-center'>
                <div className="w-full mx-auto py-[45px] rounded-lg">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-control w-full mx-auto my-[10px]">
                            <label className="label">
                                <span className="label-text text-[14px] font-bold text-white bg-stone-600 px-[20px] py-[5px] rounded">Email:</span>
                            </label>
                            <input {...register("email", { required: "Email is Required*" })} type="text" className="input w-full shadow-md shadow-accent focus:outline-none" />
                            {errors.email && <p className="font-caveat text-[14px] mt-[8px] ml-[4px] font-bold text-error">{errors.email.message}</p>}
                        </div>

                        <div className="form-control w-full mx-auto my-[10px]">
                            <label className="label">
                                <span className="label-text text-[14px] font-bold text-white bg-stone-600 px-[20px] py-[5px] rounded">Password:</span>
                            </label>
                            <input {...register("password", { required: "Password is Required*", minLength: { value: 6, message: "6 char required" } })} type="password" className="input w-full shadow-md shadow-accent focus:outline-none" />
                            {errors.password && <p className="font-caveat text-[14px] mt-[8px] ml-[4px] font-bold text-error">{errors.password.message}</p>}
                            <label className="label">
                                <span className="label-text text-[16px] text-black mt-[5px]">Forgot Password?</span>
                            </label>
                        </div>

                        <div className="form-control w-full mx-auto">
                            <input type="submit" className="btn bg-gradient-to-r from-stone-600 to-primary w-6/12 mx-auto font-bold text-[16px] text-white mt-[5px]" value="Submit" />
                        </div>
                        <div>
                            {
                                loginError && <p className="text-center font-pacifico mt-[15px] text-error">{loginError}</p>
                            }
                        </div>
                    </form>
                    <p className="text-center text-[18px] mt-[35px]">New to <span className='font-semibold text-primary'>Task Manager</span>? <Link className="text-error" to="/signup">Create New Account</Link></p>
                </div>
            </section>
        </div>
    );
};

export default SignIn;