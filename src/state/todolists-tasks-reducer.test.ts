import {TasksType, TodoListsType} from "../App";
import {v1} from "uuid";
import {addTodoListAC, removeTodoListAC, todoListsReducer} from "./todolists-reducer";
import {tasksReducer} from "./tasks-reducer";

test('ids should be equals', () => {
    const tasks: TasksType = {};
    const todoLists: Array<TodoListsType> = []

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
            {id: '1', title: "HTML&CSS", isDone: true},
            {id: '2', title: "JS", isDone: true},
            {id: '3', title: "ReactJS", isDone: false},
            {id: '4', title: "Rest API", isDone: false},
            {id: '5', title: "GraphQL", isDone: false}
        ],
        [todolistID2]: [
            {id: '1', title: "HTML&CSS2", isDone: true},
            {id: '2', title: "JS2", isDone: true},
            {id: '3', title: "ReactJS2", isDone: false},
            {id: '4', title: "Rest API2", isDone: false},
            {id: '5', title: "GraphQL2", isDone: false}
        ]
    };

    const action = removeTodoListAC(todolistID2);

    const endState = tasksReducer(tasks, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState[action.id]).toBeUndefined();
})
