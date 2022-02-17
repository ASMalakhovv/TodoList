import {TasksType} from "../App";
import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC, setTodo, TodolistDomainType, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";
import {TaskPriorities, TaskStatuses, TodolistType} from "../api/todolist-api";

test('ids should be equals', () => {
    const tasks: TasksType = {};
    const todoLists: Array<TodolistDomainType> = []

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(tasks, action)
    const endTodolistsState = todoListsReducer(todoLists, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.todolistId);
    expect(idFromTodolists).toBe(action.todolistId);
});

test('property with todolistId should be deleted', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()
    let tasks: TasksType = {
        [todolistID1]: [
            {
                id: '1', title: "HTML&CSS", status: TaskStatuses.Completed, startDate: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, deadline: '', description: '', todoListId: todolistID1
            },
            {
                id: '2', title: "JS", status: TaskStatuses.Completed, startDate: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, deadline: '', description: '', todoListId: todolistID1
            },
            {
                id: '3', title: "ReactJS", status: TaskStatuses.New, startDate: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, deadline: '', description: '', todoListId: todolistID1
            },
            {
                id: '4', title: "Rest API", status: TaskStatuses.New, startDate: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, deadline: '', description: '', todoListId: todolistID1
            },
            {
                id: '5', title: "GraphQL", status: TaskStatuses.New, startDate: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, deadline: '', description: '', todoListId: todolistID1
            }
        ],
        [todolistID2]: [
            {
                id: '1', title: "HTML&CSS2", status: TaskStatuses.Completed, startDate: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, deadline: '', description: '', todoListId: todolistID2
            },
            {
                id: '2', title: "JS2", status: TaskStatuses.Completed, startDate: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, deadline: '', description: '', todoListId: todolistID2
            },
            {
                id: '3', title: "ReactJS2", status: TaskStatuses.New, startDate: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, deadline: '', description: '', todoListId: todolistID2
            },
            {
                id: '4', title: "Rest API2", status: TaskStatuses.New, startDate: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, deadline: '', description: '', todoListId: todolistID2
            },
            {
                id: '5', title: "GraphQL2", status: TaskStatuses.New, startDate: '', addedDate: '', order: 0,
                priority: TaskPriorities.Low, deadline: '', description: '', todoListId: todolistID2
            }
        ]
    };

    const action = removeTodoListAC(todolistID2);

    const endState = tasksReducer(tasks, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[action.id]).toBeUndefined();
})


test('properties must be added when getting todoLists', () => {
    const todolistID1 = v1()
    const todolistID2 = v1()
    let todoLists: Array<TodolistType> = [
        {id: todolistID1, title: "What to learn", addedDate: '', order: 0},
        {id: todolistID2, title: "What to buy", addedDate: '', order: 0}
    ];

    const action = setTodo(todoLists);

    const endState = tasksReducer({}, action)


    expect(endState[todolistID1]).toStrictEqual([]);
    expect(endState[todolistID2]).toStrictEqual([]);
})
