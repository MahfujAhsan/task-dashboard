import { useQuery } from '@tanstack/react-query';
import React from 'react';
import Spinner from '../Spinner/Spinner';
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
        return <Spinner />
    };

    return (
        <section>
            <h3 className='text-[32px] text-center font-mono font-semibold mt-[25px]'><span className='text-[#F17D9A]'>Canceled </span><span className='text-[#46C4CA]'>Task</span></h3>
            <div className='card__grid'>
                {
                    tasks.map((task) => <SingleCanceled key={task._id} task={task} refetch={refetch} isLoading={isLoading} />)
                }
            </div>
        </section>
    );
};

export default Canceled;