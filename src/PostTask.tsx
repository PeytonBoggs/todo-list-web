import { Button, Card, CardHeader, Flex, HStack, Highlight, Input, Text, useToast } from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';

interface PostTaskProps {
    onTaskAdded: () => void
}

export default function PostTask({ onTaskAdded }: PostTaskProps) {
    const [inputTitle, setInputTitle] = useState<string>("");
    const toast = useToast();

    const handleAddChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value);
    }

    function handleAddClick(input: string) {
        const url = "http://localhost:8080/tasks";

        const data = {
            Title: inputTitle,
            Complete: false
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            onTaskAdded();
            toast({
                variant: "left-accent",
                position: "top-right",
                title: data,
                status: "success"
            });
        })
    }

    return (
        <div>
            <Card flex="1" margin="0.5rem" width="25rem" border="0.3rem solid grey" padding="1rem">
                <Flex flexDirection="column" alignItems="center" alignContent="space-around">
                    <CardHeader padding="0.5rem">
                        <Highlight query="Add Task" styles={{ fontSize: "1.5rem", fontWeight: "bold", p: "0.8rem", rounded: "full", bg: "#E0FFD6"}}>Add Task</Highlight>
                    </CardHeader>
                    <HStack width="23rem" padding="1rem" paddingLeft="0">
                        <Text fontSize="1.5rem" padding="0.5rem">Title:</Text>
                        <Input value={inputTitle} onChange={handleAddChange}></Input>
                    </HStack>
                    <HStack>
                        <Button width="7rem" onClick={() => handleAddClick(inputTitle)}>Add Task</Button>
                    </HStack>
                </Flex>
            </Card>
        </div>
    )
}