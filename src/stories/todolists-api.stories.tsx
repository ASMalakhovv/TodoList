import React, {useEffect, useState} from 'react'
import {todolistApi} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodos()
            .then((res) => setState(res))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodo('12345')
            .then(res => setState(res))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const delId = '1370ba06-c350-4337-9433-7efcc6e05217'
    useEffect(() => {
        todolistApi.delTodo(delId)
            .then(res => setState(res))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const tdLId = 'bc2d1c6b-369c-4426-b1e9-ccebe4f18e59'
        todolistApi.updateTodo(tdLId, '98765')
            .then(res => setState(res))
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
