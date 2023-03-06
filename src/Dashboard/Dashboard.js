import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import Task from './Task';

const Dashboard = () => {
    // const [isLoading, setIsLoading] = useState(true);
    // const [tasks, setTasks] = useState([])

    // useEffect(() => {
    //     const fetchTasks = async () => {
    //         const { data, status } = await axios.get('https://task-manager-server-two-self.vercel.app/api/tasks', {
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'authorization': 'Bearer ' + localStorage.getItem('token'),
    //             }
    //         });
    //         setIsLoading(false);
    //         setTasks(data);
    //         console.log(data)
    //     }


    //     fetchTasks()
    //     // fetch data if accessToken available;
    //     // let count = 0;
    //     // const intervalId = setInterval(() => {
    //     //     if (localStorage.getItem('token') && count < 15) {
    //     //         fetchTasks();
    //     //         clearInterval(intervalId);
    //     //     }
    //     //     count++;
    //     // }, 200)
    // }, [])

    // console.log(tasks)

    // refetch();

    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch('https://task-manager-server-two-self.vercel.app/api/tasks', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
            const data = res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Spinner />
    };

    refetch()

    return (
        <>
            {/* <div className='bg-stone-600 px-[15px] py-[6px] rounded-md w-[200px] ml-[50px] mt-[30px]'>
                <p className='text-[#fff] text-[18px] font-semibold'>Total Task: {tasks.length}</p>
            </div> */}
            <h3 className='text-center text-[18px] uppercase border w-2/12 mx-auto rounded-md py-[4px] font-semibold shadow-2xl border-blue-900'>Total Task: {tasks?.length}</h3>
            <div className='grid grid-cols-3 gap-x-[15px] gap-y-[30px] text-center place-items-center px-[30px] my-[30px]'>
                {
                    tasks?.map((task) => <Task key={task._id} task={task} />)
                }
            </div>
        </>
    );
};

export default Dashboard;