import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../App";

export type ActionsType = RemoveTodoListType | AddTodoListType | ChangeTodoListTitle | ChangeTodoListFilter;


type RemoveTodoListType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
type AddTodoListType = {
    type: 'ADD-TODOLIST'
    title: string
    todolistId: string
}
export type ChangeTodoListTitle = {
    type: 'CHANGE-TODOLIST-TITLE'
    id: string
    title: string

}
export type ChangeTodoListFilter = {
    type: 'CHANGE-TODOLIST-FILTER'
    id: string
    filter: FilterValuesType
};
let initialState: Array<TodoListsType> = [
    {id: '1', title: "What to learn", filter: "all"},
    {id: '2', title: "What to buy", filter: "all"}
]


export function todoListsReducer(state: Array<TodoListsType> = initialState, action: ActionsType): Array<TodoListsType> {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(s => s.id !== action.id);
        case 'ADD-TODOLIST':
            return [...state, {id: action.todolistId, title: action.title, filter: "all"}];
        case 'CHANGE-TODOLIST-TITLE':
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
export const addTodoListAC = (title: string): AddTodoListType => {
    return {
        type: 'ADD-TODOLIST',
        title,
        todolistId: v1()
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