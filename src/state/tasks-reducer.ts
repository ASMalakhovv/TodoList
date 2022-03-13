import {changeTodolistEntityStatusAC, removeTodoListAC, SetTodolist} from "./todolists-reducer";
import {RequestUpdateTask, TaskStatuses, TaskType, todolistApi} from "../api/todolist-api";
import {Dispatch} from "redux";
import {StateType} from "../redux/store";
import {setStatusApp} from "./app-reducer";
import {AxiosError} from "axios";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";


export type TasksActionsType =
    ReturnType<typeof updateTasksAC>
    | ReturnType<typeof removeTasksAC>
    | ReturnType<typeof addTasksAC>
    | ReturnType<typeof changeStatusTasksAC>
    | ReturnType<typeof removeTodoListAC>
    | SetTodolist
    | SetTasksActionType


export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}


export type TasksType = {
    [key: string]: TaskType[]
}

let initialState: TasksType = {
    /*['1']: [
        {
            id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, startDate: '', addedDate: '', order: 0,
            priority: TaskPriorities.Low, deadline: '', description: '', todoListId: '1'
        },
        {
            id: v1(), title: "JS", status: TaskStatuses.Completed, startDate: '', addedDate: '', order: 0,
            priority: TaskPriorities.Low, deadline: '', description: '', todoListId: '1'
        },
        {
            id: v1(), title: "ReactJS", status: TaskStatuses.New, startDate: '', addedDate: '', order: 0,
            priority: TaskPriorities.Low, deadline: '', description: '', todoListId: '1'
        },
        {
            id: v1(), title: "Rest API", status: TaskStatuses.New, startDate: '', addedDate: '', order: 0,
            priority: TaskPriorities.Low, deadline: '', description: '', todoListId: '1'
        },
        {
            id: v1(), title: "GraphQL", status: TaskStatuses.New, startDate: '', addedDate: '', order: 0,
            priority: TaskPriorities.Low, deadline: '', description: '', todoListId: '1'
        }
    ],
    ['2']: [
        {
            id: v1(), title: "HTML&CSS2", status: TaskStatuses.Completed, startDate: '', addedDate: '', order: 0,
            priority: TaskPriorities.Low, deadline: '', description: '', todoListId: '2'
        },
        {
            id: v1(), title: "JS2", status: TaskStatuses.Completed, startDate: '', addedDate: '', order: 0,
            priority: TaskPriorities.Low, deadline: '', description: '', todoListId: '2'
        },
        {
            id: v1(), title: "ReactJS2", status: TaskStatuses.New, startDate: '', addedDate: '', order: 0,
            priority: TaskPriorities.Low, deadline: '', description: '', todoListId: '2'
        },
        {
            id: v1(), title: "Rest API2", status: TaskStatuses.New, startDate: '', addedDate: '', order: 0,
            priority: TaskPriorities.Low, deadline: '', description: '', todoListId: '2'
        },
        {
            id: v1(), title: "GraphQL2", status: TaskStatuses.New, startDate: '', addedDate: '', order: 0,
            priority: TaskPriorities.Low, deadline: '', description: '', todoListId: '2'
        }
    ],*/
}

export function tasksReducer(state: TasksType = initialState, action: TasksActionsType): TasksType {
    switch (action.type) {
        case 'SET-TASKS': {
            const stateCopy = {...state}
            stateCopy[action.todolistId] = action.tasks
            return stateCopy
        }
        case "SET-TODOLIST":
            let copyState = {...state}
            action.todolist.forEach((tl) => {
                copyState[tl.id] = []
            })
            return {...copyState,}
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
                [action.task.todoListId]: [{
                    ...action.task
                },
                    ...state[action.task.todoListId]]
            }
        case "CHANGE-STATUS":
            return {
                ...state,
                [action.task.todoListId]: state[action.task.todoListId].map(t => t.id === action.task.id ? {...t, ...action.task} : t)
            }
        case 'REMOVE-TODOLIST':
            let {[action.id]: [], ...otherProperty} = {...state}
            return otherProperty
        default :
            return state;
    }
}

// ACTION
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

export const addTasksAC = (task: TaskType) => {
    return {
        type: 'ADD-TASK',
        task
    } as const
}

export const changeStatusTasksAC = (task: TaskType) => {
    return {
        type: 'CHANGE-STATUS',
        task
    } as const
}

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {
        type: 'SET-TASKS',
        tasks,
        todolistId
    }
}


// THUNK
enum ResultCode {
    success,
    error,
    captcha
}

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusApp('loading'))
    todolistApi.getTasks(todolistId)
        .then((res) => {
            const tasks = res.data.items
            const action = setTasksAC(tasks, todolistId)
            dispatch(action)
        })
        .catch((rej: AxiosError) => {
            handleServerNetworkError(dispatch, rej.message)
        })
        .finally(() => dispatch(setStatusApp('idle')))
}


export const removeTask = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
    dispatch(setStatusApp('loading'))
    dispatch(changeTodolistEntityStatusAC('loading', todolistId))
    todolistApi.deleteTask(todolistId, taskId)
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                dispatch(removeTasksAC(todolistId, taskId))
            }
        })
        .catch((rej: AxiosError) => {
            handleServerNetworkError(dispatch, rej.message)
        })
        .finally(() => {
            dispatch(setStatusApp('idle'))
            dispatch(changeTodolistEntityStatusAC('succeeded', todolistId))

        })
}

export const addTask = (payload: { todolistId: string, title: string }) => (dispatch: Dispatch) => {
    dispatch(setStatusApp('loading'))
    todolistApi.createTask(payload.todolistId, payload.title)
        .then((res) => {
            if (res.data.resultCode === ResultCode.success) {
                let task = res.data.data.item
                dispatch(addTasksAC(task))
            } else {
                handleServerAppError<{ item: TaskType }>(dispatch, res.data)
            }
        })
        .catch((rej: AxiosError) => {
            handleServerNetworkError(dispatch, rej.message)
        })
        .finally(() => dispatch(setStatusApp('idle')))
}

export const changeStatusOrTitleTask = (todolistId: string, taskId: string, payload: { status?: TaskStatuses, title?: string }) =>
    (dispatch: Dispatch, getState: () => StateType) => {
        let task = getState().tasks[todolistId].find(t => t.id === taskId)
        if (task) {
            dispatch(setStatusApp('loading'))
            let model: RequestUpdateTask = {
                status: task.status,
                title: task.title,
                description: task.description,
                deadline: task.deadline,
                priority: task.priority,
                startDate: task.startDate
            };
            if (payload.status === 0 || payload.status === 2) {
                model = {
                    ...model,
                    status: payload.status
                }
            }
            if (payload.title) {
                model = {
                    ...model,
                    title: payload.title
                }
            }
            todolistApi.changeStatusOrTitle(todolistId, taskId, model)
                .then((res) => {
                    if (res.data.resultCode === ResultCode.success) {
                        let newTask = res.data.data.item
                        dispatch(changeStatusTasksAC(newTask))
                    } else {
                        handleServerAppError(dispatch, res.data)
                    }
                })
                .catch((rej) => {
                    handleServerNetworkError(dispatch, rej.message)
                })
                .finally(() => {
                    dispatch(setStatusApp('idle'))
                })

        }
    }




