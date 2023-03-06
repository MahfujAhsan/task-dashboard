import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../Spinner/Spinner';
import SingleCompleted from './SingleCompleted';

const Completed = () => {
    const { data: tasks = [], refetch, isLoading } = useQuery({
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

    return (
        <div className='grid grid-cols-3 gap-x-[15px] gap-y-[30px] text-center place-items-center'>
            {
                tasks.map((task) => <SingleCompleted key={task._id} task={task} refetch={refetch} isLoading={isLoading} />)
            }
        </div>
    );
};

export default Completed;