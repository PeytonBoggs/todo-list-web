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
            <Card width="90%" border="3px solid grey" margin="5%" padding="10px">
                <Flex flexDirection="column" alignItems="center" alignContent="space-around">
                    <CardHeader padding="10px">
                        <Highlight query="Search Tasks:" styles={{ fontSize: "25", fontWeight: "700", p: "3", rounded: "full", bg: "#E0FFD6"}}>Search Tasks:</Highlight>
                    </CardHeader>
                    <HStack width="90%" padding="10px" paddingLeft="0">
                        <Text fontSize="20" width="30%" padding="10px">By Title:</Text>
                        <Input type="search" width="70%" onChange={handleTitleChange}/>
                    </HStack>
                    <HStack width="80%" padding="10px">
                        <Text fontSize="20" width="30%" padding="10px"> By ID:</Text>
                        <NumberInput width="70%" defaultValue={NaN} min={0} onChange={handleIDChange}>
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