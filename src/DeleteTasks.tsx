import { Button, useToast } from '@chakra-ui/react';
import { CheckCircleIcon } from "@chakra-ui/icons"

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
                status: "error",
                icon: <CheckCircleIcon boxSize="1.3rem"/>
            })
        })
    }
    
    return (
        <div>
            <Button flex="1" margin="0.5rem" width="25rem" bg="#FFD6E0" border="0.3rem solid" borderColor="#EB003B" _hover={{bg:"#FFB5C7"}} onClick={() => handleDeleteTasksClick()}>Delete All Tasks</Button>
        </div>
    )
}