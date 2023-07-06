import { useState, useEffect } from 'react';
import { Task } from './Task-Interface';

const GET_TASKS_URL: string = "http://localhost:8080/tasks?id=&title=&complete="

export default function TaskList() {
    const [taskList, setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        fetch(GET_TASKS_URL)
        .then(response => response.json())
        .then(setTaskList);
    }, []);

    function handleComplete(complete: boolean): string {
        if (complete) {
            return "Completed"
        } else {
            return "Not complete"
        }
    }

    return (
        <div>
            <div>
                {taskList.map(task => (
                <p key={task.id}>#{task.id}: {task.title} - {handleComplete(task.complete)}</p>    
                ))}
            </div>
        </div>
    )
}