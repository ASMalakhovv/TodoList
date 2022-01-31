import {v1} from "uuid";
import {TasksType} from "../App";
import {addTasksAC, changeStatusTasksAC, removeTasksAC, tasksReducer, updateTasksAC} from "./tasks-reducer";
import {addTodoListAC} from "./todolists-reducer";


test("user reducer should only change the name of the task", () => {
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
    let newTitle = "New title"


    let newTasks: TasksType = tasksReducer(tasks, updateTasksAC(todolistID1, '1', newTitle))
    let result = newTasks[todolistID1].find(t => t.id === '1')
    let example = tasks[todolistID1].find(t => t.id === '2')

    // @ts-ignore
    expect(result.title).toBe(newTitle)
    expect(tasks[todolistID1].length).toBe(5)
    // @ts-ignore
    expect(example.title).toBe("JS")

})

test("user reducer should only delete the task", () => {
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
    let removeID = "2"


    let newTasks: TasksType = tasksReducer(tasks, removeTasksAC(todolistID1, removeID,))

    expect(newTasks[todolistID1].length).toBe(4)
    expect(newTasks[todolistID1][1].id).toBe('3')
    expect(newTasks[todolistID2][1].id).toBe('2')

})

test("user reducer should only add the task", () => {
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
    let title = 'New task';


    let newTasks: TasksType = tasksReducer(tasks, addTasksAC(todolistID1, title))

    expect(newTasks[todolistID1].length).toBe(6)
    expect(newTasks[todolistID1][0].title).toBe(title)
    expect(newTasks[todolistID1][0].id).toBeDefined()
    expect(newTasks[todolistID1][0].isDone).toBe(false)


})

test("user reducer should only change the status of the task", () => {
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
    let id = '1';
    let isDone = false;


    let newTasks: TasksType = tasksReducer(tasks, changeStatusTasksAC(todolistID1, id, isDone))
    let example = newTasks[todolistID1].find(t => t.id === id)

    // @ts-ignore
    expect(example.id).toBe(id)
    // @ts-ignore
    expect(example.isDone).toBe(isDone)

})

test('new array should be added when new todolist is added', () => {
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

    const action = addTodoListAC("new todolist");

    const endState = tasksReducer(tasks, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != todolistID1 && k != todolistID2);
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

