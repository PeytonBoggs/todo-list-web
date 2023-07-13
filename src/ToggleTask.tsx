import { Button, HStack, Icon, Text, useToast } from "@chakra-ui/react";
import { Task } from "./Task-Interface";
import { FaCheck, FaList } from "react-icons/fa"
import { CheckCircleIcon } from "@chakra-ui/icons"

interface ToggleTaskProps {
    onTaskToggled: () => void
    task: Task
}

export default function ToggleTask({ onTaskToggled, task }: ToggleTaskProps) {
    const toast = useToast();

    function handleToggleClick(task: Task) {
        const url = "http://localhost:8080/tasks/id/" + task.id

        fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(onTaskToggled);

        let toastTitle: string = ""
        let toastStatus: any
        if (task.complete) {
            toastTitle = "Task marked To-Do"
            toastStatus = "info"
        } else {
            toastTitle = "Task Completed!"
            toastStatus = "success"
        }

        toast({
            variant: "left-accent",
            position: "top-right",
            title: toastTitle,
            status: toastStatus,
            icon: <CheckCircleIcon boxSize="1.3rem"/>
        })
    }

    function getUI(complete: boolean): JSX.Element {
        if (complete) {
            return (
                <Button width="12rem" marginRight="1rem" border="0.15rem solid grey" onClick={() => {handleToggleClick(task); }}>
                    <HStack>
                        <Text>Mark To-Do</Text>
                        <Icon as={FaList} />
                    </HStack>
                </Button>
            )
        } else {
            return (
                <Button width="12rem" marginRight="1rem" bg="#E0FFD6" border="0.15rem solid green" _hover={{backgroundColor:"#52E309"}} onClick={() => handleToggleClick(task)}>
                    <HStack>
                        <Text>Mark Complete</Text>
                        <Icon as={FaCheck} />
                    </HStack>
                </Button>
            )
        }
    }

    return (
        <div>
            {getUI(task.complete)}
        </div>
    );
}