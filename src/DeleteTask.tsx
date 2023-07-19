import { Button, HStack, Icon, Text, useToast } from "@chakra-ui/react";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { CheckCircleIcon } from "@chakra-ui/icons"

interface DeleteTaskProps {
    onTaskDeleted: () => void
    taskID: number
}

export default function DeleteTask({ onTaskDeleted, taskID }: DeleteTaskProps) {
    const toast = useToast();

    function handleDeleteClick(id: number) {
        toast({
            variant:"left-accent",
            position:"top-right",
            title:"Task Deleted",
            status:"error",
            icon: <CheckCircleIcon boxSize="1.3rem"/>
        })

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
          <Button width="12rem" bg="#FFD6E0" border="0.15rem solid" borderColor="#EB003B" _hover={{backgroundColor:"#FFB5C7"}} onClick={() => handleDeleteClick(taskID)}>
            <HStack>
                    <Text>Delete Task</Text>
                    <Icon as={RiDeleteBin6Fill} />
                </HStack>
          </Button>
        </div>
    );
}