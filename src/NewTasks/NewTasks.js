import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../Spinner/Spinner';
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
        return <Spinner />
    };

    return (
        <section>
            <h3 className='menu__title'>Task List</h3>
            <div className='card__grid'>
                {
                    tasks.map((task) => <NewTask key={task._id} task={task} refetch={refetch} isLoading={isLoading} />)
                }
            </div>
        </section>
    );
};

export default NewTasks;