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
        return instance.get<Array<GetTodos>>(`todo-lists`)
            .then(res => res)
    },
    createTodo(title: string) {
        return instance.post<CommonResponseType<{ item: GetTodos }>, AxiosResponse<CommonResponseType<{ item: GetTodos }>>, { title: string }>
        (`todo-lists`, {title})
            .then(res => res)
    },
    delTodo(delId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${delId}`)
            .then(res => res)
    },
    updateTodo(tdLId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${tdLId}`, {title})
            .then(res => res)
    }
}


type GetTodos = {
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
