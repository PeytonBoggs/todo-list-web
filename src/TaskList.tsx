import { useState, useEffect } from 'react';
import { Task } from './Task-Interface';
import PatchTask from './PatchTask';

const GET_TASKS_URL: string = "http://localhost:8080/tasks?id=&title=&complete="

export default function TaskList() {
    const [taskList, setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        fetch(GET_TASKS_URL)
        .then(response => response.json())
        .then(setTaskList);
    }, []);

    function updateList() {
        console.log("updated")
    }

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
                <div>
                    <p key={task.id}>#{task.id}: {task.title} - {handleComplete(task.complete)}</p>
                    <PatchTask onTaskPatched={updateList} taskID={task.id}/>
                </div>
                ))}
            </div>
        </div>
    )
}