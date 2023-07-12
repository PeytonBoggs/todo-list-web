import { useState, useEffect } from 'react';
import { Task } from './Task-Interface';
import AppHeader from './AppHeader';
import SearchBar from './SearchBar';
import PostTask from './PostTask';
import DeleteTasks from './DeleteTasks';
import ToggleTask from './ToggleTask';
import DeleteTask from './DeleteTask';
import { Box, Card, Divider, Flex, Text } from '@chakra-ui/react';

export default function TaskList() {
    const [taskList, setTaskList] = useState<Task[]>([]);
    const [searchedTask, setSearchedTask] = useState<Task>({id: 0, title: "", complete: false});

    useEffect(() => {
        updateList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchedTask]);

    function updateList() {
        let url: string = "http://localhost:8080/tasks?"
        if (searchedTask.id !== 0) {
            url = url.concat("id=" + String(searchedTask.id) + "&")
        }
        if (searchedTask.title !== "") {
            url = url.concat("title=" + String(searchedTask.title) + "&")
        }
        if (searchedTask.complete) {
            url = url.concat("complete=true&")
        } else {
            url = url.concat("complete=false&")
        }

        fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data === null) {
                setTaskList([]);
            } else {
                setTaskList(data);
            }
        });
    }
  
    function handleComplete(complete: boolean, border: boolean): string {
        if (complete) {
            if (border) {
                return "#297105"
            } else {
                return "#E0FFD6"
            }
        } else {
            if (border) {
                return "grey"
            } else {
                return "#EDF7F7"
            }
        }
    }

    return (
        <div>
            <Flex borderBottom="4px solid grey" height="100vh">
                <Box width="30%" bg="#7BF1A8">
                    <AppHeader />
                    <PostTask onTaskAdded={updateList} />
                    <SearchBar searchedTask={searchedTask} setSearchedTask={setSearchedTask} />
                    <DeleteTasks onTasksDeleted={updateList} />
                </Box>
                <Box width="70%" bg="#DBEFF0" borderLeft="4px solid grey">
                    {taskList.map(task => (
                    <Card shadow="xl" bg={handleComplete(task.complete, false)} border="2px solid grey" borderLeft="10px solid" borderLeftColor={handleComplete(task.complete, true)} margin="20px">
                        <Flex flexDirection="row" alignItems="center" gap="10px" margin="20px">
                            <Box width="8%"> 
                                <Text fontWeight="bold" fontSize="3xl" margin="5px">#{task.id}</Text>
                            </Box>
                            <Box width="2px" marginRight="8px">
                                <Divider orientation="vertical" borderColor={handleComplete(task.complete, true)} height="50px" borderWidth="2px" />
                            </Box>
                            <Box width="50%">
                                <Text fontWeight="bold" fontSize="3xl">{task.title}</Text>
                            </Box>
                            <Box width="20%">
                                <ToggleTask onTaskToggled={updateList} task={task}/>
                            </Box>
                            <Box width="20%">
                                <DeleteTask onTaskDeleted={updateList} taskID={task.id}/>
                            </Box>
                        </Flex>
                    </Card>
                    ))}
                </Box>
            </Flex>
        </div>
    )
}