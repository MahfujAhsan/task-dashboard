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
            <h3 className='text-[32px] text-center font-mono font-semibold'><span className='text-[#F17D9A]'>Total Task: </span><span className='text-[#46C4CA]'>{tasks?.length}</span></h3>
            <div className='card__grid'>
                {
                    tasks?.map((task) => <Task key={task._id} task={task} />)
                }
            </div>
        </>
    );
};

export default Dashboard;