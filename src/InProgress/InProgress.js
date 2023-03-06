import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useFetchTasks from '../hooks/useFetchTasks';
import SingleProgress from './SingleProgress';


const InProgress = () => {
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/api/tasks', {
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
        return <p>Loading...</p>
    };

    refetch()

    return (
        <div className='grid grid-cols-3 gap-x-[15px] gap-y-[30px] text-center place-items-center'>
            {
                tasks.map((task) => <SingleProgress key={task._id} task={task} refetch={refetch} isLoading={isLoading} />)
            }
        </div>
    );
};

export default InProgress;