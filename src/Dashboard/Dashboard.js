import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import Spinner from '../Spinner/Spinner';
import Task from './Task';

const Dashboard = () => {

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

    const inProgress = tasks.filter((task) => task.inprogress === true);

    const completed = tasks.filter((task) => task.completed === true);

    const canceled = tasks.filter((task) => task.canceled === true);

    const newTask = tasks.filter((task) => !task.completed === true && !task.inprogress === true && !task.canceled === true);


    if (isLoading) {
        return <Spinner />
    };

    refetch();



    return (
        <>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-[40px] my-[35px] mx-[35px]'>
                <div className='h-[100px] flex items-center justify-center md:h-[150px] shadow-md rounded-lg'>
                    <h3 className='text-[18px] md:text-[28px] text-center font-mono font-semibold'><span className='text-[#F17D9A]'>Total Task: </span><span className='text-[#46C4CA]'>{tasks.length}</span></h3>
                </div>
                <div className='h-[100px] flex items-center justify-center md:h-[150px] shadow-md rounded-lg'>
                    <h3 className='text-[18px] md:text-[28px] text-center font-mono font-semibold'><span className='text-[#F17D9A]'>New Task: </span><span className='text-[#46C4CA]'>{newTask.length}</span></h3>
                </div>
                <div className='h-[100px] flex items-center justify-center md:h-[150px] shadow-md rounded-lg'>
                    <h3 className='text-[18px] md:text-[28px] text-center font-mono font-semibold'><span className='text-[#F17D9A]'>Total InProgress: </span><span className='text-[#46C4CA]'>{inProgress.length}</span></h3>
                </div>
                <div className='h-[100px] flex items-center justify-center md:h-[150px] shadow-md rounded-lg'>
                    <h3 className='text-[18px] md:text-[28px] text-center font-mono font-semibold'><span className='text-[#F17D9A]'>Total Completed: </span><span className='text-[#46C4CA]'>{completed.length}</span></h3>
                </div>
                <div className='h-[100px] flex items-center justify-center md:h-[150px] shadow-md rounded-lg'>
                    <h3 className='text-[18px] md:text-[28px] text-center font-mono font-semibold'><span className='text-[#F17D9A]'>Total Canceled: </span><span className='text-[#46C4CA]'>{canceled.length}</span></h3>
                </div>
            </div>
            {/* <div className='card__grid'>
                {
                    tasks?.map((task) => <Task key={task._id} task={task} />)
                }
            </div> */}
        </>
    );
};

export default Dashboard;