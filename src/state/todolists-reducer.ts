import {Dispatch} from "redux";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {AppThunk} from "../redux/store";
import {RequestStatusType, setStatusApp} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {FilterValuesType} from "../AppWithRedux";

export type TodoListsActionsType =
    RemoveTodoListType
    | AddTodoListType
    | ChangeTodoListTitle
    | ChangeTodoListFilter
    | SetTodolist
    | ReturnType<typeof setStatusApp>
    | ChangeEntityStatusType

type RemoveTodoListType = {
    type: 'REMOVE-TODOLIST'
    id: string
};
type AddTodoListType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
};
export type ChangeTodoListTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string

};
export type ChangeTodoListFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
};
export type SetTodolist = ReturnType<typeof setTodo>


export type TodolistDomainType = TodolistType & { filter: FilterValuesType, entityStatus: RequestStatusType }
let initialState: Array<TodolistDomainType> = [
    /*    {id: '1', title: "What to learn", filter: "all"},
        {id: '2', title: "What to buy", filter: "all"}*/
]


export function todoListsReducer(state: Array<TodolistDomainType> = initialState, action: TodoListsActionsType): Array<TodolistDomainType> {
    switch (action.type) {
        case "TODO/ENTITY-STATUS":
            return state.map(t => t.id === action.todoId ? {...t, entityStatus: action.entityStatus} : t)
        case "SET-TODOLIST":
            let setTodoList: Array<TodolistDomainType> = action.todolist.map(e => ({
                ...e,
                filter: 'all',
                entityStatus: 'idle'
            }))
            return [
                ...setTodoList,
                ...state
            ]
        case 'REMOVE-TODOLIST':
            return state.filter(s => s.id !== action.id);
        case 'CHANGE-TODOLIST-TITLE':
            return state.map(s => s.id === action.id ? {...s, title: action.title} : s);
        case "CHANGE-TODOLIST-FILTER" :
            return state.map(s => s.id === action.id ? {...s, filter: action.filter} : s);
        default:
            return state
    }
}

//AC


export const removeTodoListAC = (id: string): RemoveTodoListType => {
    return {
        type: "REMOVE-TODOLIST",
        id
    }
}
export const changeTodoListTitleAC = (id: string, title: string): ChangeTodoListTitle => {
    return {
        type: "CHANGE-TODOLIST-TITLE",
        id,
        title
    }
}
export const changeTodoListFilterAC = (id: string, filter: FilterValuesType): ChangeTodoListFilter => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        filter,
        id
    }
}

export const setTodo = (todolist: Array<TodolistType>) => {
    return {
        type: 'SET-TODOLIST',
        todolist
    } as const
}

export const changeTodolistEntityStatusAC = (entityStatus: RequestStatusType, todoId: string) => {
    debugger
    return {
        type: 'TODO/ENTITY-STATUS',
        entityStatus,
        todoId
    } as const
}

export type ChangeEntityStatusType = ReturnType<typeof changeTodolistEntityStatusAC>

// THUNK

enum ResultCode {
    success,
    error,
    captcha
}

export const getTodoListsThunk = (dispatch: Dispatch): void => {
    dispatch(setStatusApp('loading'))
    todolistApi.getTodos()
        .then(res => {
            dispatch(setTodo(res.data))
        })
        .catch((rej: AxiosError) => {
            handleServerNetworkError(dispatch, rej.response?.data.message)
        })
        .finally(() => dispatch(setStatusApp('idle')))
}


export const createTodoListThunk = (title: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(setStatusApp('loading'))
    todolistApi.createTodo(title)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                let todoList: Array<TodolistType> = [{...res.data.data.item}]
                dispatch(setTodo(todoList))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((rej: AxiosError) => {
            handleServerNetworkError(dispatch, rej.message)
        })
        .finally(() => dispatch(setStatusApp('idle')))
}

export const deleteTodoListThunk = (todoListId: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(setStatusApp('loading'))
    dispatch(changeTodolistEntityStatusAC('loading', todoListId))
    todolistApi.delTodo(todoListId)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(removeTodoListAC(todoListId))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((rej: AxiosError) => {
            handleServerNetworkError(dispatch, rej.message)
        })
        .finally(() => dispatch(setStatusApp('idle')))
}

export const changeTodoListTitle = (todoListId: string, title: string): AppThunk => (dispatch: Dispatch) => {
    dispatch(setStatusApp('loading'))
    todolistApi.updateTodo(todoListId, title)
        .then(res => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(changeTodoListTitleAC(todoListId, title))
            } else {
                handleServerAppError(dispatch, res.data)
            }
        })
        .catch((rej: AxiosError) => {
            handleServerNetworkError(dispatch, rej.message)
        })
        .finally(() => dispatch(setStatusApp('idle')))
}