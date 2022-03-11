import {
    changeTodoListTitleAC,
    removeTodoListAC, setTodo,
    todoListsReducer
} from "./todolists-reducer";
import {v1} from "uuid";
import {TodoListsDomainType} from "../App";
import {TodolistType} from "../api/todolist-api";


test('user reducer should increment only age', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    const todoLists: Array<TodoListsDomainType> = [
        {id: todolistID1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistID2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]


    const endState = todoListsReducer(todoLists, removeTodoListAC(todolistID1))


    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
});


test('user reducer should add to do list', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    const todoLists: Array<TodoListsDomainType> = [
        {id: todolistID1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistID2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
    let newTodoList: Array<TodolistType> = [
        {id: '1', title: "What to learn", addedDate: '', order: 0},
    ]

    const endState = todoListsReducer(todoLists, setTodo(newTodoList))


    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("What to buy")
    expect(endState[0].title).toBe("What to learn")
    expect(endState[2].filter).toBe("all")
});


test('user reducer should change to do list title', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    const todoLists: Array<TodoListsDomainType> = [
        {id: todolistID1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistID2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
    let newTitle = "New Title"
    let action = changeTodoListTitleAC(todolistID1, newTitle)


    const endState = todoListsReducer(todoLists, action)


    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitle)
});


test('todoLists reducer must install todoLists', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    const todoLists: Array<TodoListsDomainType> = [
        {id: todolistID1, title: "What to learn", filter: "all", addedDate: '', order: 0},
        {id: todolistID2, title: "What to buy", filter: "all", addedDate: '', order: 0}
    ]
    const newTodoLists: Array<TodolistType> = [
        {id: '1', title: "What to learn", addedDate: '', order: 0}
    ]

    let action = setTodo(newTodoLists)


    const endState = todoListsReducer(todoLists, action)


    expect(endState.length).toBe(3)
    expect(endState[0].id).toBe("1")
});