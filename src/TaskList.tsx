import { useState, useEffect } from 'react';
import { Task } from './Task-Interface';
import AppHeader from './AppHeader';
import SearchBar from './SearchBar';
import PostTask from './PostTask';
import DeleteTasks from './DeleteTasks';
import ToggleTask from './ToggleTask';
import DeleteTask from './DeleteTask';
import { Box, Card, CircularProgress, CircularProgressLabel, Divider, Flex, Tab, TabList, Tabs, Text } from '@chakra-ui/react';
import { MdCelebration } from 'react-icons/md'
import { FaSadTear } from 'react-icons/fa'

export default function TaskList() {
    const [activeTaskList, setActiveTaskList] = useState<Task[]>([]);
    const [searchedTask, setSearchedTask] = useState<Task>({id: 0, title: "", complete: false});
    const [searchAllTasks, setSearchAllTasks] = useState<boolean>(true)
    const [percentComplete, setPercentComplete] = useState<number>(0);

    useEffect(() => {
        updateActiveList();
        updatePercentComplete();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchedTask]);

    async function updateStates() {
        updateActiveList();
        updatePercentComplete();
    }

    function updateActiveList() {
        let url: string = "http://localhost:8080/tasks?"
        if (searchedTask.id !== 0) {
            url = url.concat("id=" + String(searchedTask.id) + "&")
        }
        if (searchedTask.title !== "") {
            url = url.concat("title=" + String(searchedTask.title) + "&")
        }
        if (!searchAllTasks) {
            url = url.concat("complete=" + String(searchedTask.complete) + "&")
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
    
    function updatePercentComplete() {
        fetch("http://localhost:8080/tasks")
        .then(response => response.json())
        .then((fullTaskList: Task[] | null) => {
            if (!fullTaskList) {
                setPercentComplete(0)
                return
            }

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

    function handleTabChange(tab: string) {
        if (tab === "allTasks") {
            setSearchedTask({id: 0, title: "", complete: false})
            setSearchAllTasks(true)
        }
        if (tab === "todoTasks") {
            setSearchedTask({id: 0, title: "", complete: false})
            setSearchAllTasks(false)
        }
        if (tab === "completeTasks") {
            setSearchedTask({id: 0, title: "", complete: true})
            setSearchAllTasks(false)
        }
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
            return <MdCelebration size="7rem" color="#297105"></MdCelebration>
        } else {
            return <FaSadTear size="7rem" color="#EB003B"></FaSadTear>
        }
    }

    return (
        <div>
            <Flex height="100vh" width="100vw">
                <Box minWidth="30rem" minHeight="50rem" bg="#E0FFD6" overflowY="auto">
                    <Flex height="full" flexDirection="column" justifyContent="space-around" alignItems="center">
                        <AppHeader />
                        <PostTask onTaskAdded={updateStates} />
                        <SearchBar searchedTask={searchedTask} setSearchedTask={setSearchedTask} />
                        <Flex flex="1" width="25rem" justifyContent="center" alignItems="center">
                            <Flex flexDirection="column" alignItems="center">
                                <CircularProgress color="#297105" trackColor="#EB003B" size="15rem" thickness="0.5rem" value={percentComplete}>
                                    <CircularProgressLabel>
                                        <Flex justifyContent="center">
                                            {getProgressIcon()}
                                        </Flex>
                                    </CircularProgressLabel>
                                </CircularProgress>
                                <Text marginTop="-0.5rem" fontSize="1.5rem" fontWeight="bold">{percentComplete}% Complete</Text>
                            </Flex>
                        </Flex>
                        <DeleteTasks onTasksDeleted={updateStates} />
                    </Flex>
                </Box>
                <Box minWidth="60rem" flex="1" bg="#DBEFF0" borderLeft="0.3rem solid grey" overflowY="auto">
                    <Tabs margin="1rem" variant="soft-rounded" align="center" size="lg" isFitted={true}>
                        <TabList>
                            <Tab margin="0.5rem" bg="#EDF7F7" border="0.3rem solid" borderColor="grey" _selected={{borderColor:"grey", bg:"black", color:"white", fontWeight:"bold"}} onClick={() => handleTabChange("allTasks")}>
                                All Tasks
                            </Tab>
                            <Tab margin="0.5rem" bg="#FFD6E0" border="0.3rem solid" borderColor="#EB003B" _selected={{borderColor:"grey", bg:"#EB003B", color:"white", fontWeight:"bold"}} onClick={() => handleTabChange("todoTasks")}>
                                To-Do Tasks
                            </Tab>
                            <Tab margin="0.5rem" bg="#E0FFD6" border="0.3rem solid" borderColor="#297105" _selected={{borderColor:"grey", bg:"#297105", color:"white", fontWeight:"bold"}} onClick={() => handleTabChange("completeTasks")}>
                                Complete Tasks
                            </Tab>
                        </TabList>
                    </Tabs>
                    {activeTaskList.map(task => (
                    <Card margin="1rem" marginTop="2rem" shadow="xl" bg={handleComplete(task.complete, false)} border="0.3rem solid" borderLeft="1rem solid" borderColor={handleComplete(task.complete, true)}>
                        <Flex alignItems="center" margin="1rem">
                            <Box> 
                                <Text width="3rem" marginRight="1rem" textAlign="center" fontWeight="bold" fontSize="1.5rem">#{task.id}</Text>
                            </Box>
                            <Box width="0rem" marginRight="1.5rem">
                                <Divider orientation="vertical" borderColor={handleComplete(task.complete, true)} height="3.5rem" borderWidth="0.13rem" />
                            </Box>
                            <Box flex="5">
                                <Text fontWeight="semibold" fontSize="2rem">{task.title}</Text>
                            </Box>
                            <Box flex="1">
                                <ToggleTask onTaskToggled={updateStates} task={task}/>
                            </Box>
                            <Box flex="1">
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