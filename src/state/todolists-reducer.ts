import {FilterValuesType} from "../App";
import {Dispatch} from "redux";
import {todolistApi, TodolistType} from "../api/todolist-api";
import {AppThunk} from "../redux/store";
import {setStatusApp} from "./app-reducer";

export type TodoListsActionsType =
    RemoveTodoListType
    | AddTodoListType
    | ChangeTodoListTitle
    | ChangeTodoListFilter
    | SetTodolist
    | ReturnType<typeof setStatusApp>


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


export type TodolistDomainType = TodolistType & { filter: FilterValuesType }
let initialState: Array<TodolistDomainType> = [
    /*    {id: '1', title: "What to learn", filter: "all"},
        {id: '2', title: "What to buy", filter: "all"}*/
]


export function todoListsReducer(state: Array<TodolistDomainType> = initialState, action: TodoListsActionsType): Array<TodolistDomainType> {
    switch (action.type) {
        case "SET-TODOLIST":
            let setTodoList: Array<TodolistDomainType> = action.todolist.map(e => ({...e, filter: 'all'}))
            return [
                ...setTodoList,
                ...state
            ]
        case 'REMOVE-TODOLIST':
            return state.filter(s => s.id !== action.id);
        case 'CHANGE-TODOLIST-TITLE':
            debugger
            return state.map(s => s.id === action.id ? {...s, title: action.title} : s);
        case "CHANGE-TODOLIST-FILTER" :
            return state.map(s => s.id === action.id ? {...s, filter: action.filter} : s);
        default:
            return state
    }
}


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

// THUNK

export const getTodoListsThunk = (dispatch: Dispatch<TodoListsActionsType>): void => {
    dispatch(setStatusApp('loading'))
    todolistApi.getTodos()
        .then(res => {
            dispatch(setStatusApp('idle'))
            dispatch(setTodo(res.data))
        })
}

export const createTodoListThunk = (title: string): AppThunk => (dispatch: Dispatch) => {
    todolistApi.createTodo(title)
        .then(res => {
            if (res.data.resultCode === 0) {
                let todoList: Array<TodolistType> = [{...res.data.data.item}]
                dispatch(setTodo(todoList))
            }
        })
}

export const deleteTodoListThunk = (todoListId: string): AppThunk => (dispatch: Dispatch) => {
    todolistApi.delTodo(todoListId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(removeTodoListAC(todoListId))
            }
        })
}

export const changeTodoListTitle = (todoListId: string, title: string): AppThunk => (dispatch: Dispatch) => {
    todolistApi.updateTodo(todoListId, title)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(changeTodoListTitleAC(todoListId, title))
            }
        })
}