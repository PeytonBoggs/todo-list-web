import { useState, useEffect } from 'react';
import { Task } from './Task-Interface';
import AppHeader from './AppHeader';
import SearchBar from './SearchBar';
import PostTask from './PostTask';
import DeleteTasks from './DeleteTasks';
import ToggleTask from './ToggleTask';
import DeleteTask from './DeleteTask';
import { Box, Card, CircularProgress, CircularProgressLabel, Divider, Flex, Text } from '@chakra-ui/react';
import { MdCelebration } from 'react-icons/md'
import { FaSadTear } from 'react-icons/fa'

export default function TaskList() {
    const [activeTaskList, setActiveTaskList] = useState<Task[]>([]);
    const [searchedTask, setSearchedTask] = useState<Task>({id: 0, title: "", complete: false});
    const [percentComplete, setPercentComplete] = useState<number>(0);

    useEffect(() => {
        updateActiveList();
        updatePercentComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchedTask]);

    function updateStates() {
        updateActiveList();
        updatePercentComplete();
    }

    function updatePercentComplete() {
        fetch("http://localhost:8080/tasks")
        .then(response => response.json())
        .then((fullTaskList: Task[] | null) => {
            if (!fullTaskList) {
                setPercentComplete(0)
                return
            }

            console.log(fullTaskList)
            
            let completeTasks: number = 0;
            let totalTasks: number = fullTaskList.length;

            fullTaskList.forEach(task => {
                if (task.complete) {
                    completeTasks++;
                };
            });

            setPercentComplete(Math.trunc(completeTasks/totalTasks * 100));
        });
    }

    function updateActiveList() {
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
                setActiveTaskList([]);
            } else {
                setActiveTaskList(data);
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

    function getProgressIcon(): JSX.Element {
        if (percentComplete === 100) {
            return <MdCelebration size="50%" color="#297105"></MdCelebration>
        } else {
            return <FaSadTear size="50%" color="#FFD6E0"></FaSadTear>
        }
    }

    return (
        <div>
            <Flex borderBottom="4px solid grey" height="100vh">
                <Box width="30%" bg="#7BF1A8">
                    <AppHeader />
                    <PostTask onTaskAdded={updateStates} />
                    <SearchBar searchedTask={searchedTask} setSearchedTask={setSearchedTask} />
                    <Box width="90%" margin="5%">
                        <Flex justifyContent="center" flexDirection="column" alignItems="center">
                            <CircularProgress color="#297105" trackColor="#FFD6E0" size="100%" thickness="16px" value={percentComplete}>
                                <CircularProgressLabel>
                                    <Flex justifyContent="center" height="50%">
                                        {getProgressIcon()}
                                    </Flex>
                                </CircularProgressLabel>
                            </CircularProgress>
                            <Text marginTop="10px" fontSize="150%" fontWeight="bold">{percentComplete}% Complete</Text>
                        </Flex>
                    </Box>
                    <DeleteTasks onTasksDeleted={updateStates} />
                </Box>
                <Box width="70%" bg="#DBEFF0" borderLeft="4px solid grey">
                    {activeTaskList.map(task => (
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
                                <ToggleTask onTaskToggled={updateStates} task={task}/>
                            </Box>
                            <Box width="20%">
                                <DeleteTask onTaskDeleted={updateStates} taskID={task.id}/>
                            </Box>
                        </Flex>
                    </Card>
                    ))}
                </Box>
            </Flex>
        </div>
    )
}