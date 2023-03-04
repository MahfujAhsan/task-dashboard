import { useQuery } from '@tanstack/react-query';
import React from 'react';

const Dashboard = () => {

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch('http://localhost:5000/api/tasks');
            const data = res.json();
            return data;
        }
    });

    if(isLoading) {
        return <p>Loading...</p>
    }
    return (
        <>
            <div className='bg-stone-600 px-[15px] py-[6px] rounded-md w-[200px] ml-[50px] mt-[30px]'>
                <p className='text-[#fff] text-[18px] font-semibold'>Total Task: {tasks.length}</p>
            </div>
        </>
    );
};

export default Dashboard;