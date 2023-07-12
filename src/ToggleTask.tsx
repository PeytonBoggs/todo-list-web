import { Button, HStack, Icon, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { Task } from "./Task-Interface";
import { FaCheck, FaList } from "react-icons/fa"

interface ToggleTaskProps {
    onTaskToggled: () => void
    task: Task
}

export default function ToggleTask({ onTaskToggled, task }: ToggleTaskProps) {
    const [, setToggleMessage] = useState<string>("");
    const toast = useToast();

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

    function getUI(complete: boolean): JSX.Element {
        if (complete) {
            return (
                <Button width="100%" border="2px solid grey" onClick={() => {handleToggleClick(task.id); toast({variant:"left-accent", position:"top-right", title:"Task marked To-Do", status:"info"})}}>
                    <HStack>
                        <Text>Mark To-Do</Text>
                        <Icon as={FaList} />
                    </HStack>
                </Button>
            )
        } else {
            return (
                <Button width="100%" bg="#E0FFD6" border="2px solid green" _hover={{backgroundColor:"#52E309"}} onClick={() => {handleToggleClick(task.id); toast({variant:"left-accent", position:"top-right", title:"Task Completed!", status:"success"})}}>
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