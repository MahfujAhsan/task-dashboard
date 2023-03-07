import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../Spinner/Spinner';
import SingleProgress from './SingleProgress';


const InProgress = () => {
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
        <section>
            <h3 className='menu__title'>Inprogress Task</h3>
            <div className='card__grid'>
                {
                    tasks.map((task) => <SingleProgress key={task._id} task={task} refetch={refetch} isLoading={isLoading} />)
                }
            </div>
        </section>
    );
};

export default InProgress;