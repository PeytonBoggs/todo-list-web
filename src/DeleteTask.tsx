interface DeleteTaskProps {
    onTaskDeleted: () => void
    taskID: number
}

export default function DeleteTask({ onTaskDeleted, taskID }: DeleteTaskProps) {

    function handleDeleteClick(id: number) {
        const url = "http://localhost:8080/tasks/id/" + id

        fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(onTaskDeleted);
    }

    return (
        <div>
          <button onClick={() => handleDeleteClick(taskID)}>Delete</button>
        </div>
    );
}