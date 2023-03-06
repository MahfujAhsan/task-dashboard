import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SingleCanceled from './SingleCanceled';

const Canceled = () => {
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
        return <p>Loading...</p>
    };

    return (
        <div className='grid grid-cols-3 gap-x-[15px] gap-y-[30px] text-center place-items-center'>
            {
                tasks.map((task) => <SingleCanceled key={task._id} task={task} refetch={refetch} isLoading={isLoading} />)
            }
        </div>
    );
};

export default Canceled;