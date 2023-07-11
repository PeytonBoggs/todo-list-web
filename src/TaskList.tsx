import { useState, useEffect } from 'react';
import { Task } from './Task-Interface';
import AppHeader from './AppHeader';
import SearchBar from './SearchBar';
import PostTask from './PostTask';
import DeleteTasks from './DeleteTasks';
import ToggleTask from './ToggleTask';
import DeleteTask from './DeleteTask';
import { Box, Flex } from '@chakra-ui/react';

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
  
    function handleComplete(complete: boolean): string {
        if (complete) {
            return "completed"
        } else {
            return "to-do"
        }
    }

    return (
        <div>
            <Flex>
                <Box width="30%" bg="#7BF1A8">
                    <AppHeader />
                    <PostTask onTaskAdded={updateList} />
                    <SearchBar searchedTask={searchedTask} setSearchedTask={setSearchedTask} />
                    <DeleteTasks onTasksDeleted={updateList} />
                </Box>
                <Box width="70%" height="100%">
                <div>
                    <p>Showing all {handleComplete(searchedTask.complete)} tasks with ID: {searchedTask.id} and Title: "{searchedTask.title}"</p>
                    {taskList.map(task => (
                    <div>
                        <p key={task.id}>{task.title} -- {handleComplete(task.complete)}</p>
                        <ToggleTask onTaskToggled={updateList} taskID={task.id}/>
                        <DeleteTask onTaskDeleted={updateList} taskID={task.id}/>
                    </div>
                    ))}
                </div>
                </Box>
            </Flex>
        </div>
    )
}