import { ChangeEvent } from 'react';
import { Task } from "./Task-Interface";
import { Card, CardHeader, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Text, Highlight, HStack, Flex } from '@chakra-ui/react';

interface SearchBarProps {
    searchedTask: Task
    setSearchedTask: React.Dispatch<React.SetStateAction<Task>>
}

export default function SearchBar({ searchedTask, setSearchedTask }: SearchBarProps) {

    const handleIDChange = (valueString: string) => {

        let value = parseInt(valueString)

        if (isNaN(value)) {
            setSearchedTask({id: 0, title: searchedTask.title, complete: searchedTask.complete});
        } else {
            setSearchedTask({id: value, title: searchedTask.title, complete: searchedTask.complete});
        }
    }

    const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchedTask({id: searchedTask.id, title: e.target.value, complete: searchedTask.complete});
    }

    return (
        <div>
            <Card flex="1" margin="0.5rem" width="25rem" border="0.3rem solid grey" padding="1rem">
                <Flex flexDirection="column" alignItems="center" alignContent="space-around">
                    <CardHeader padding="0.5rem">
                        <Highlight query="Search Tasks" styles={{ fontSize: "1.5rem", fontWeight: "bold", p: "0.8rem", rounded: "full", bg: "#E0FFD6"}}>Search Tasks</Highlight>
                    </CardHeader>
                    <HStack width="23rem" padding="1rem" paddingLeft="0">
                        <Text fontSize="1.5rem" width="8rem" padding="0.5rem">By Title:</Text>
                        <Input width="20rem" onChange={handleTitleChange}/>
                    </HStack>
                    <HStack width="23rem" padding="-0.5rem">
                        <Text fontSize="1.5rem" width="6.2rem" padding="0.5rem">By ID:</Text>
                        <NumberInput width="15.3rem" defaultValue={NaN} min={0} onChange={handleIDChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </HStack>
                </Flex>
            </Card>
        </div>
    )
}