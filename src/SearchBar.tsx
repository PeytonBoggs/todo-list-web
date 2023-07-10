import { ChangeEvent } from 'react';
import { Task } from "./Task-Interface";

interface SearchBarProps {
    searchedTask: Task
    setSearchedTask: React.Dispatch<React.SetStateAction<Task>>
}

export default function SearchBar({ searchedTask, setSearchedTask }: SearchBarProps) {

    const handleIDChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (isNaN(e.target.valueAsNumber)) {
            setSearchedTask({id: 0, title: searchedTask.title, complete: searchedTask.complete});
        } else {
            setSearchedTask({id: e.target.valueAsNumber, title: searchedTask.title, complete: searchedTask.complete});
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
            <form>
                <label>ID: </label>
                <input type="number" onChange={handleIDChange}/><br></br>
                <label>Title: </label>
                <input type="search" onChange={handleTitleChange}/><br></br>
                <label>Complete? </label>
                <input type="checkbox" onChange={handleCompleteChange}/><br></br>
            </form>
        </div>
    )
}
