import { useState } from "react";

interface PatchTaskProps {
    onTaskPatched: () => void
    taskID: number
}

export default function PatchTask({ onTaskPatched, taskID }: PatchTaskProps) {
    const [patchMessage, setPatchMessage] = useState<string>("");

    function handleToggleClick(id: number) {
        const url = "http://localhost:8080/tasks/id/" + id

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(setPatchMessage)
        .then(onTaskPatched)
    }

    return (
        <div>
          <button onClick={() => handleToggleClick(taskID)}>test</button><p>{patchMessage}</p>
        </div>
    );
}