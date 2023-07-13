import { Button, useToast } from '@chakra-ui/react';

interface DeleteTasksProps {
    onTasksDeleted: () => void
}

const DELETE_TASKS_URL: string = "http://localhost:8080/tasks"

export default function DeleteTasks({ onTasksDeleted }: DeleteTasksProps) {
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
            onTasksDeleted();
            toast({
                variant: "left-accent",
                position: "top-right",
                title: data,
                status: "error"
            })
        })
    }
    
    return (
        <div>
            <Button width="90%" bg="#FFD6E0" border="3px solid" borderColor="#EB003B" _hover={{bg:"#FFB5C7"}} margin="5%" onClick={() => handleDeleteTasksClick()}>Delete All Tasks</Button>
        </div>
    )
}