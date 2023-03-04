import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Dashboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        const fetchTasks = async () => {
            const { data, status } = await axios.get('http://localhost:5000/api/tasks', {
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
            setIsLoading(false);
            setTasks(data);
            console.log(status)
        }

        // fetch data if accessToken available;
        let count = 0;
        const intervalId = setInterval(() => {
            if (localStorage.getItem('token') && count < 15) {
                fetchTasks();
                clearInterval(intervalId);
            }
            count++;
        }, 200)
    }, [])

    // console.log(tasks)

    // refetch();

    if (isLoading) {
        return <p>Loading...</p>
    }

    console.log(tasks.length, tasks);

    return (
        <>
            <div className='bg-stone-600 px-[15px] py-[6px] rounded-md w-[200px] ml-[50px] mt-[30px]'>
                <p className='text-[#fff] text-[18px] font-semibold'>Total Task: {tasks.length}</p>
            </div>
        </>
    );
};

export default Dashboard;