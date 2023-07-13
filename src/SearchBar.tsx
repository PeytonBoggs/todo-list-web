import { ChangeEvent } from 'react';
import { Task } from "./Task-Interface";
import { Card, CardHeader, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Switch, Text, Highlight, HStack, Flex } from '@chakra-ui/react';

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

    const handleCompleteChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchedTask({id: searchedTask.id, title: searchedTask.title, complete: e.target.checked});
    }

    return (
        <div>
            <Card width="90%" border="3px solid grey" margin="5%" padding="10px">
                <Flex flexDirection="column" alignItems="center" alignContent="space-around">
                    <CardHeader padding="10px">
                        <Highlight query="Search Tasks:" styles={{ fontSize: "25", fontWeight: "700", p: "3", rounded: "full", bg: "#E0FFD6"}}>Search Tasks:</Highlight>
                    </CardHeader>
                    <HStack width="90%" padding="10px" paddingLeft="0">
                        <Text fontSize="20" width="20%" padding="10px">Title:</Text>
                        <Input type="search" width="80%" onChange={handleTitleChange}/>
                    </HStack>
                    <HStack width="50%" padding="10px">
                        <Text fontSize="20" width="20%">ID:</Text>
                        <NumberInput width="80%" defaultValue={NaN} min={0} onChange={handleIDChange}>
                            <NumberInputField />
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                        </NumberInput>
                    </HStack>
                    <HStack width="80%" padding="10px">
                        <Text align="right" fontSize="20" width="60%">Complete?</Text>
                        <Switch width="40%" size="lg" colorScheme="green" onChange={handleCompleteChange} />
                    </HStack>
                </Flex>
            </Card>
        </div>
    )
}