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
            <h3 className='menu__title'>Completed Task</h3>
            <div className='card__grid'>
                {
                    tasks.map((task) => <SingleCompleted key={task._id} task={task} refetch={refetch} isLoading={isLoading} />)
                }
            </div>
        </section>
    );
};

export default Completed;