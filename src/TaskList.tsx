import { useState, useEffect } from 'react';
import { Task } from './Task-Interface';
import DeleteTasks from './DeleteTasks';

const GET_TASKS_URL: string = "http://localhost:8080/tasks?id=&title=&complete="

export default function TaskList() {
    const [taskList, setTaskList] = useState<Task[]>([]);

    useEffect(() => {
        updateList();
    });

    function updateList() {
        fetch(GET_TASKS_URL)
        .then(response => response.json())
        .then(setTaskList);
    }

    function printTasks() {
        if (taskList == null) {
            setTaskList([])
            return
        }

        return taskList.map(task => (
            <p key={task.id}>#{task.id}: {task.title} - {handleComplete(task.complete)}</p>))
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
                {printTasks()}
            </div>
        </div>
    )
}