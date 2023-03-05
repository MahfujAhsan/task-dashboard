import { useQuery } from "@tanstack/react-query";
// import { useEffect, useState } from "react";


const useFetchTasks = () => {
    // const [tasks, setTasks] = useState([]);
    // const [isLoading, setIsLoading] = useState(true)

    const { data: tasks = [], isLoading } = useQuery({
        queryKey: ['tasks'],
        queryFn: async () => {
            const res = await fetch('https://task-manager-server-pink.vercel.app/api/tasks', {
                header: {
                    'authorization': 'Bearer ' + localStorage.getItem('token'),
                }
            });
            const data = res.json();
            return data;
        }
    });

    console.log('from hook', { tasks });

    // useEffect(() => {
    //     setIsLoading(loading);
    // }, [loading])

    // useEffect(() => {
    //     console.log({ data })
    //     setTasks(data);
    // }, [data])

    return { isLoading, tasks }

}

export default useFetchTasks