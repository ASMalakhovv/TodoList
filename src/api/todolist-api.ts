import axios, {AxiosResponse} from "axios";


let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        "API-KEY": "3d65a9ec-ab43-4f9c-b1c5-2bd296c92ebd"
    }
})

export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodolistType>, AxiosResponse<Array<TodolistType>>>(`todo-lists`)
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: TodolistType }>, AxiosResponse<CommonResponseType<{ item: TodolistType }>>, { title: string }>
        (`todo-lists`, {title})

    },
    delTodo(delId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${delId}`)

    },
    updateTodo(tdLId: string, title: string) {
        return instance.put<CommonResponseType, AxiosResponse<CommonResponseType>, { title: string }>(`todo-lists/${tdLId}`, {title})

    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksType>(`/todo-lists/${todolistId}/tasks`)

    },
    createTask(todoListId: string, title: string) {
        return instance.post<CommonResponseType<{ item: TaskType }>, AxiosResponse<CommonResponseType<{ item: TaskType }>>, { title: string }>
        (`/todo-lists/${todoListId}/tasks`, {title})

    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTitleTask(todolistId: string, taskId: string, model: RequestUpdateTask) {
        return instance.put<CommonResponseType<TaskType>, AxiosResponse<CommonResponseType<TaskType>>, RequestUpdateTask>
        (`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    },
    changeStatusOrTitle(todolistId: string, taskId: string, model: RequestUpdateTask) {
        return instance.put<CommonResponseType<{ item: TaskType }>, AxiosResponse<CommonResponseType<{ item: TaskType }>>, RequestUpdateTask>
        (`/todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}


export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

type GetTasksType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3,
}

export enum TaskPriorities {
    Low = 0,
    Middle,
    Hi,
    Urgently,
    Later
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type RequestUpdateTask = Omit<TaskType, 'id' | 'todoListId' | 'order' | 'addedDate'>




