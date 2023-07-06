import { useState, useEffect } from 'react';
import { Task } from './Task-Interface';

function App() {
    const [taskList, setTaskList] = useState<Task[]>([{id: 1, title: "wake up", complete: true}]);

    useEffect(() => {
        fetch("http://localhost:8080/tasks?id=&title=&complete=")
        .then(response => response.json())
        .then(data => {
            setTaskList(data);
        });
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
            <h1>Todo List</h1>
            <div>
                {taskList.map(task => (
                <p key={task.id}>#{task.id}: {task.title} - {handleComplete(task.complete)}</p>    
                ))}
            </div>
        </div>
    )
}

export default App;
