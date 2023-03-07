import { useQuery } from '@tanstack/react-query';
import React from 'react';
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

    if (isLoading) {
        return <Spinner />
    };

    refetch()

    return (
        <>
            <h3 className='text-center text-[18px] uppercase border w-2/12 mx-auto rounded-md py-[4px] font-semibold shadow-2xl border-blue-900'>Total Task: {tasks?.length}</h3>
            <div className='grid grid-cols-3 gap-x-[15px] gap-y-[30px] text-center place-items-center px-[30px] py-[30px]'>
                {
                    tasks?.map((task) => <Task key={task._id} task={task} />)
                }
            </div>
        </>
    );
};

export default Dashboard;