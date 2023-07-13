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

    function updateStates() {
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
            return <MdCelebration size="50%" color="#297105"></MdCelebration>
        } else {
            return <FaSadTear size="50%" color="#EB003B"></FaSadTear>
        }
    }

    return (
        <div>
            <Flex borderBottom="4px solid grey" height="100vh">
                <Box width="30%" bg="#E0FFD6">
                    <AppHeader />
                    <PostTask onTaskAdded={updateStates} />
                    <SearchBar searchedTask={searchedTask} setSearchedTask={setSearchedTask} />
                    <Box width="90%" margin="5%">
                        <Flex justifyContent="center" flexDirection="column" alignItems="center">
                            <CircularProgress color="#297105" trackColor="#EB003B" size="100%" thickness="16px" value={percentComplete}>
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
                    <Tabs margin="20px" variant="soft-rounded" align="center" size="lg" isFitted={true}>
                        <TabList>
                            <Tab margin="10px" bg="#EDF7F7" border="3px solid" borderColor="grey" _selected={{borderColor:"grey", bg:"black", color:"white", fontWeight:"bold"}} onClick={() => handleTabChange("allTasks")}>
                                All Tasks
                            </Tab>
                            <Tab margin="10px" bg="#FFD6E0" border="3px solid" borderColor="#EB003B" _selected={{borderColor:"grey", bg:"#EB003B", color:"white", fontWeight:"bold"}} onClick={() => handleTabChange("todoTasks")}>
                                To-Do Tasks
                            </Tab>
                            <Tab margin="10px" bg="#E0FFD6" border="3px solid" borderColor="#297105" _selected={{borderColor:"grey", bg:"#297105", color:"white", fontWeight:"bold"}} onClick={() => handleTabChange("completeTasks")}>
                                Complete Tasks
                            </Tab>
                        </TabList>
                    </Tabs>
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
                            <Box width={[100, 200, 300]}>
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