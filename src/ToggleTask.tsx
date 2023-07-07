import { useState } from "react";

interface ToggleTaskProps {
    onTaskToggled: () => void
    taskID: number
}

export default function ToggleTask({ onTaskToggled, taskID }: ToggleTaskProps) {
    const [toggleMessage, setToggleMessage] = useState<string>("");

    function handleToggleClick(id: number) {
        const url = "http://localhost:8080/tasks/id/" + id

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setToggleMessage(data);
            onTaskToggled();
        });
    }

    return (
        <div>
          <button onClick={() => handleToggleClick(taskID)}>Toggle</button><p>{toggleMessage}</p>
        </div>
    );
}