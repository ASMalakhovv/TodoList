import {v1} from "uuid";
import {addTasksAC, changeStatusTasksAC, removeTasksAC, tasksReducer, updateTasksAC} from "./tasks-reducer";
import {addTodoListAC} from "./todolists-reducer";
import {TasksType} from "../App";
import {TaskPriorities, TaskStatuses} from "../api/todolist-api";


test("user reducer should only change the name of the task", () => {
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
    let title = 'New task';


    let newTasks: TasksType = tasksReducer(tasks, addTasksAC(todolistID1, title))

    expect(newTasks[todolistID1].length).toBe(6)
    expect(newTasks[todolistID1][0].title).toBe(title)
    expect(newTasks[todolistID1][0].id).toBeDefined()
    expect(newTasks[todolistID1][0].status).toBe(TaskStatuses.New)


})

test("user reducer should only change the status of the task", () => {
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
    let id = '1';
    let status :TaskStatuses = TaskStatuses.New;


    let newTasks: TasksType = tasksReducer(tasks, changeStatusTasksAC(todolistID1, id, status))
    let example = newTasks[todolistID1].find(t => t.id === id)

    // @ts-ignore
    expect(example.id).toBe(id)
    // @ts-ignore
    expect(example.status).toBe(status)

})

test('new array should be added when new todolist is added', () => {
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

