import { useQuery } from '@tanstack/react-query';
import React from 'react';
import NewTask from './NewTask';

const NewTasks = () => {
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch('https://task-manager-server-two-self.vercel.app/api/tasks',
                {
                    headers: {
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
        <section className='grid grid-cols-3 gap-x-[15px] gap-y-[30px] text-center my-[50px] place-items-center'>
            {
                tasks.map((task) => <NewTask key={task._id} task={task} refetch={refetch} isLoading={isLoading} />)
            }
        </section>
    );
};

export default NewTasks;