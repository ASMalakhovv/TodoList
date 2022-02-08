import {TasksType} from "../App";
import {v1} from "uuid"
import {addTodoListAC, removeTodoListAC} from "./todolists-reducer";

export type ActionsType =
    ReturnType<typeof updateTasksAC>
    | ReturnType<typeof removeTasksAC>
    | ReturnType<typeof addTasksAC>
    | ReturnType<typeof changeStatusTasksAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof removeTodoListAC>

let initialState: TasksType = {
/*    ['1']: [
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false}
    ],
    ['2']: [
        {id: v1(), title: "HTML&CSS2", isDone: true},
        {id: v1(), title: "JS2", isDone: true},
        {id: v1(), title: "ReactJS2", isDone: false},
        {id: v1(), title: "Rest API2", isDone: false},
        {id: v1(), title: "GraphQL2", isDone: false}
    ],*/
}

export function tasksReducer(state: TasksType = initialState, action: ActionsType): TasksType {
    switch (action.type) {
        case 'UPDATE-TASKS':
            return {
                ...state,
                [action.todolistID1]: state[action.todolistID1].map(t => t.id === action.id ?
                    {...t, title: action.title}
                    : t
                )
            };
        case 'REMOVE-TASK':
            return {
                ...state,
                [action.todolistID1]: state[action.todolistID1].filter((t) => {
                    return t.id !== action.removeID
                })
            };
        case "ADD-TASK":
            return {
                ...state,
                [action.todolistID1]: [{id: '0', title: action.title, isDone: false},
                    ...state[action.todolistID1]]
            }
        case "CHANGE-STATUS":
            return {
                ...state,
                [action.todolistID1]: state[action.todolistID1].map(t => t.id === action.id ?
                    {...t, isDone: action.isDone}
                    : t
                )
            }
        case "ADD-TODOLIST":
            return {
                ...state,
                [action.todolistId]: []
            }
        case 'REMOVE-TODOLIST':
            let {[action.id]: [], ...otherProperty} = {...state}
            /*let newState = {...state}
            delete newState[action.id]*/
            return otherProperty

        default :
            return state;
    }
}


export const updateTasksAC = (todolistID1: string, id: string, title: string) => {
    return {
        type: 'UPDATE-TASKS',
        todolistID1,
        id,
        title
    } as const
}

export const removeTasksAC = (todolistID1: string, removeID: string) => {
    return {
        type: 'REMOVE-TASK',
        todolistID1,
        removeID
    } as const
}

export const addTasksAC = (todolistID1: string, title: string) => {
    return {
        type: 'ADD-TASK',
        todolistID1,
        id: v1(),
        title
    } as const
}

export const changeStatusTasksAC = (todolistID1: string, id: string, isDone: boolean) => {
    return {
        type: 'CHANGE-STATUS',
        todolistID1,
        id,
        isDone
    } as const
}