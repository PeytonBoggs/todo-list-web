import { useState, useEffect } from 'react';
import { Task } from './Task-Interface';
import DeleteTasks from './DeleteTasks';

const GET_TASKS_URL: string = "http://localhost:8080/tasks?id=&title=&complete="

export default function TaskList() {
    const [taskList, setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        updateList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function updateList() {
        fetch(GET_TASKS_URL)
        .then(response => response.json())
        .then(data => {
            if (data === null) {
                setTaskList([]);
            } else {
                setTaskList(data);
            }
        });
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
            <DeleteTasks onTasksDeleted={updateList}/>
            <div>
                {taskList.map(task => (
                    <p key={task.id}>
                        #{task.id}: {task.title} - {handleComplete(task.complete)}
                    </p>
                ))}
            </div>
        </div>
    )
}