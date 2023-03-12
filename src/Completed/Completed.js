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
        <section>
            <h3 className='text-[32px] text-center font-mono font-semibold mt-[25px]'><span className='text-[#46C4CA]'>Completed </span><span className='text-[#F17D9A]'>Task</span></h3>
            <div className='card__grid'>
                {
                    tasks.map((task) => <SingleCompleted key={task._id} task={task} refetch={refetch} isLoading={isLoading} />)
                }
            </div>
        </section>
    );
};

export default Completed;