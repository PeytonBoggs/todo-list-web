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
            <Card width="90%" border="3px solid grey" margin="5%" padding="10px">
                <Flex flexDirection="column" alignItems="center" alignContent="space-around">
                    <CardHeader padding="10px">
                        <Highlight query="Add Task:" styles={{ fontSize: "25", fontWeight: "700", p: "3", rounded: "full", bg: "#E0FFD6"}}>Add Task:</Highlight>
                    </CardHeader>
                    <HStack width="90%" padding="10px" paddingLeft="0">
                        <Text fontSize="20" width="20%" padding="10px">Title:</Text>
                        <Input width="100%" value={inputTitle} onChange={handleAddChange}></Input>
                    </HStack>
                    <HStack>
                        <Button width="100%" onClick={() => handleAddClick(inputTitle)}>Add Task</Button>
                    </HStack>
                </Flex>
            </Card>
        </div>
    )
}