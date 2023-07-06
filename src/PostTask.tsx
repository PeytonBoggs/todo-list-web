import { useState, ChangeEvent } from 'react';

interface PostTaskProps {
    onTaskAdded: () => void
}

export default function PostTask({ onTaskAdded }: PostTaskProps) {
    const [inputTitle, setInputTitle] = useState<string>("");
    const [addMessage, setAddMessage] = useState<string>("");

    const handleAddChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value);
    }

    function handleAddClick(input: string) {
        const url = "http://localhost:8080/tasks";

        const data = {
            Title: inputTitle,
            Complete: false
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(setAddMessage)
        .then(onTaskAdded)
    }

    return (
        <div>
            <input value={inputTitle} onChange={handleAddChange}></input>
            <button onClick={() => handleAddClick(inputTitle)}>Add Task</button>
            <p>{addMessage}</p>
        </div>
    )
}