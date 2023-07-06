import { useState } from 'react';

interface DeleteTasksProps {
    onTasksDeleted: () => void
}

const DELETE_TASKS_URL: string = "http://localhost:8080/tasks"

export default function DeleteTasks({ onTasksDeleted }: DeleteTasksProps) {
    const [deleteMessage, setDeleteMessage] = useState<string>("")
    
    function handleDeleteTasksClick() {
        fetch (DELETE_TASKS_URL, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(setDeleteMessage)
        .then(onTasksDeleted)
    }
    
    return (
        <div>
            <button onClick={() => handleDeleteTasksClick()}>Delete all tasks</button>
            <p>{deleteMessage}</p>
        </div>
    )
}