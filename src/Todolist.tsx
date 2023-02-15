import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';
import s from './App.module.css'
import {Button} from "./components/Button";

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatusTask: (taskId: string, status: boolean) => void
    filter: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {

    let [title, setTitle] = useState("");
    let [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim());
            setTitle("");
        } else {
            setError('Title is required')
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        setError(null)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const onClickHandler = (taskId: string) => {
        props.removeTask(taskId)
    }

    const onChangeStatusHandler = (taskId: string, event: ChangeEvent<HTMLInputElement>) => {
        props.changeStatusTask(taskId, event.currentTarget.checked)
    }

    const onAllClickHandler = () => props.changeFilter("all");
    const onActiveClickHandler = () => props.changeFilter("active");
    const onCompletedClickHandler = () => props.changeFilter("completed");

    const styleButtonAll = props.filter === 'all' ? s.activeFilter : '';
    const styleButtonActive = props.filter === 'active' ? s.activeFilter : '';
    const styleButtonCompleted = props.filter === 'completed' ? s.activeFilter : '';

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyDown={onKeyPressHandler}
                   className={error ? s.error : ''}
            />
            <Button callBack={addTask} name={'+'}/>
            {error && <div className={s.errorMessage}>{error}</div>}
        </div>
        <ul>
            {props.tasks.map(t => {
                return <li key={t.id} className={t.isDone ? s.isDone : ''}>
                    <Button callBack={() => onClickHandler(t.id)} name={'✖'}/>
                    <input type="checkbox"
                           checked={t.isDone}
                           onChange={(event) => onChangeStatusHandler(t.id, event)
                           }/>
                    <span>{t.title}</span>
                </li>
            })
            }
        </ul>
        <div>
            <Button callBack={onAllClickHandler} className={styleButtonAll} name={'All'}/>
            <Button callBack={onActiveClickHandler} className={styleButtonActive} name={'Active'}/>
            <Button callBack={onCompletedClickHandler} className={styleButtonCompleted} name={'Completed'}/>
        </div>
    </div>
}
