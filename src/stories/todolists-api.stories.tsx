import React, {useEffect, useState} from 'react'
import {RequestUpdateTask, todolistApi} from "../api/todolist-api";
import s from './todolists-api.stories.module.css'

export default {
    title: 'API'
}

export const GetTodoLists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then(res => setState(res.data))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [title, setTitle] = useState<string>("")


    const createTodolist = () => {
        todolistApi.createTodo(title)
            .then(res => setState(res.data))
    }


    return <div>
        <div>
            <input placeholder='titleForTodolist' onChange={e => setTitle(e.currentTarget.value)} value={title}/>
        </div>
        <button onClick={createTodolist}>CreateTodolist</button>
        {JSON.stringify(state)}
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todosId, setTodosId] = useState<string>("")
    const deleteTodolist = () => {
        todolistApi.delTodo(todosId)
            .then(res => setState(res.data))
    }

    return <div>
        <div>
            <input placeholder='idForDeleteTodos' onChange={e => setTodosId(e.currentTarget.value)} value={todosId}/>
        </div>
        <button onClick={deleteTodolist}>DeleteTodolist</button>
        {JSON.stringify(state)}
    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todosId, setTodosId] = useState<string>("")
    const [title, setTitle] = useState<string>("")


    const updateTodos = () => {
        todolistApi.updateTodo(todosId, title)
            .then(res => setState(res.data))
    }


    return <div>
        <div>
            <input placeholder='idForDeleteTodos' onChange={e => setTodosId(e.currentTarget.value)} value={todosId}/>
            <input placeholder='titleForTodolist' onChange={e => setTitle(e.currentTarget.value)} value={title}
                   spellCheck/>
        </div>
        <button onClick={updateTodos}>UpdateTitleTodos</button>
        {JSON.stringify(state)}
    </div>
}


export const GetTasks = () => {
    const [title, setTitle] = useState<string>('')
    const [state, setState] = useState<string>('')
    const getTasks = () => {
        todolistApi.getTasks(title)
            .then(res => {
                setState(JSON.stringify(res.data))
            })
    }

    return (
        <div>
            <input placeholder='IdTodos' onChange={e => setTitle(e.currentTarget.value)} value={title}/>
            <button onClick={getTasks}>GetTasks</button>
            {state}
        </div>
    )
}


export const CreateTask = () => {
    const [title, setTitle] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')
    const [state, setState] = useState<string>('')
    const createTasks = () => {
        todolistApi.createTask(todoListId, title)
            .then(res => {
                setState(JSON.stringify(res.data.data.item))
            })
    }

    return (
        <div>
            <input placeholder='IdTodos' onChange={e => setTodoListId(e.currentTarget.value)} value={todoListId}/>
            <input placeholder='TitleTask' onChange={e => setTitle(e.currentTarget.value)} value={title}/>
            <button onClick={createTasks}>Create Task</button>
            {state}
        </div>
    )
}

export const DeleteTask = () => {
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')
    const [state, setState] = useState<string>('')
    const deleteTask = () => {
        todolistApi.deleteTask(todoListId, taskId)
            .then(res => {
                setState(JSON.stringify(res.data))
            })
    }

    return (
        <div>
            <input placeholder='IdTodos' onChange={e => setTodoListId(e.currentTarget.value)} value={todoListId}/>
            <input placeholder='ID Task' onChange={e => setTaskId(e.currentTarget.value)} value={taskId}/>
            <button onClick={deleteTask}>Delete Task</button>
            {state}
        </div>
    )
}

export const UpdateTask = () => {
    const [description, setDescription] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [completed, setCompleted] = useState<boolean>(false)
    const [status, setStatus] = useState<number>(0)
    const [priority, setPriority] = useState<number>(0)
    const [startDate, setStartDate] = useState<string>('')
    const [deadline, setDeadline] = useState<string>('')
    const [state, setState] = useState<string>('')
    const [taskId, setTaskId] = useState<string>('')
    const [todoListId, setTodoListId] = useState<string>('')


    const model:RequestUpdateTask = {
        title,
        description,
        deadline,
        priority,
        status,
        startDate
    }

    const updateTask = () => {
        todolistApi.updateTitleTask(todoListId, taskId, model)
            .then(res => {
                setState(JSON.stringify(res.data))
            })
    }

    return (
        <div className={s.updateTask}>
            <input placeholder='taskId' onChange={e => setTaskId(e.currentTarget.value)} value={taskId}/>
            <input placeholder='todoListId' onChange={e => setTodoListId(e.currentTarget.value)} value={todoListId}/>
            <input placeholder='description' onChange={e => setDescription(e.currentTarget.value)} value={description}/>
            <input placeholder='title' onChange={e => setTitle(e.currentTarget.value)} value={title}/>
            <input placeholder='completed' type={'checkbox'} onChange={e => setCompleted(e.currentTarget.checked)}
                   checked={completed}/>
            <input placeholder='status' type={'number'} onChange={e => setStatus(Number(e.currentTarget.value))}
                   value={status}/>
            <input placeholder='priority' type={'number'} onChange={e => setPriority(Number(e.currentTarget.value))}
                   value={priority}/>
            <input placeholder='startDate' onChange={e => setStartDate(e.currentTarget.value)} value={startDate}/>
            <input placeholder='deadline' onChange={e => setDeadline(e.currentTarget.value)} value={deadline}/>
            <button onClick={updateTask}>Update Task</button>
            {state}
        </div>
    )
}