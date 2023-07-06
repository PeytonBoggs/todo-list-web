import { useState, useEffect } from 'react';
import { Task } from './Task-Interface';

export default function TaskList() {
    const [taskList, setTaskList] = useState<Task[]>([]);

    const getTasksURL: string = "http://localhost:8080/tasks?id=&title=&complete="

    useEffect(() => {
        fetch(getTasksURL)
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