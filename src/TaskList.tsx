import { useState, useEffect } from 'react';
import { Task } from './Task-Interface';
import PostTask from './PostTask';
import DeleteTasks from './DeleteTasks';
import ToggleTask from './ToggleTask';
import DeleteTask from './DeleteTask';

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
            <PostTask onTaskAdded={updateList} />
            <DeleteTasks onTasksDeleted={updateList} />
            <div>
                {taskList.map(task => (
                <div>
                    <p key={task.id}>{task.title} - {handleComplete(task.complete)}</p>
                    <ToggleTask onTaskToggled={updateList} taskID={task.id}/>
                    <DeleteTask onTaskDeleted={updateList} taskID={task.id}/>
                </div>
                ))}
            </div>
        </div>
    )
}