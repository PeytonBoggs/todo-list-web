import { Button, Card, useToast } from '@chakra-ui/react';
import { useState } from 'react';

interface DeleteTasksProps {
    onTasksDeleted: () => void
}

const DELETE_TASKS_URL: string = "http://localhost:8080/tasks"

export default function DeleteTasks({ onTasksDeleted }: DeleteTasksProps) {
    const [, setDeleteMessage] = useState<string>("")
    const toast = useToast();
    
    function handleDeleteTasksClick() {
        fetch (DELETE_TASKS_URL, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(data => {
            setDeleteMessage(data);
            onTasksDeleted();
            toast({
                variant: "left-accent",
                position: "top-right",
                title: data,
                status: "success"
            })
        })
    }
    
    return (
        <div>
            <Card width="90%" margin="5%">
                <Button width="100%" colorScheme="red" onClick={() => handleDeleteTasksClick()}>Delete All Tasks</Button>
            </Card>
        </div>
    )
}