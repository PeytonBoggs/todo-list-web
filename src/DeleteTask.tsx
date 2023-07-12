import { Button, HStack, Icon, Text, useToast } from "@chakra-ui/react";
import { RiDeleteBin6Fill } from "react-icons/ri";

interface DeleteTaskProps {
    onTaskDeleted: () => void
    taskID: number
}

export default function DeleteTask({ onTaskDeleted, taskID }: DeleteTaskProps) {
    const toast = useToast();

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
          <Button width="100%" bg="#FFD6E0" border="2px solid red" _hover={{backgroundColor:"#FFB5C7"}} onClick={() => {handleDeleteClick(taskID); toast({variant:"left-accent", position:"top-right", title:"Task Deleted", status:"error"})}}>
            <HStack>
                    <Text>Delete Task</Text>
                    <Icon as={RiDeleteBin6Fill} />
                </HStack>
          </Button>
        </div>
    );
}