import React, {useState} from 'react';
import s from './App.module.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);

    const changeStatusTask = (taskId: string, status: boolean) => {
        setTasks(tasks.map(el => el.id === taskId ? {...el, isDone: status} : el))
    }

    function removeTask(taskId: string) {
        setTasks(tasks.filter(t => t.id !== taskId));
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        setTasks([task, ...tasks]);
    }

    let [filter, setFilter] = useState<FilterValuesType>("all");

    let tasksForTodolist = tasks;

    if (filter === "active") {
        tasksForTodolist = tasks.filter(t => !t.isDone);
    }
    if (filter === "completed") {
        tasksForTodolist = tasks.filter(t => t.isDone);
    }

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    }

    return (
        <div className={s.App}>
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatusTask={changeStatusTask}
                      filter={filter}
            />
        </div>
    );
}

export default App;
