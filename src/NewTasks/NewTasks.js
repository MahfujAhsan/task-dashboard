import { useQuery } from '@tanstack/react-query';
import React from 'react';
import NewTask from './NewTask';

const NewTasks = () => {
    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch('https://task-manager-server-theta-nine.vercel.app/api/tasks');
            const data = res.json();
            return data;
        }
    });

    if (isLoading) {
        return <p>Loading...</p>
    };

    return (
        <section className='grid grid-cols-3 gap-x-[15px] gap-y-[30px] text-center'>
            {
                tasks.map((task) => <NewTask key={task._id} task={task} />)
            }
        </section>
    );
};

export default NewTasks;