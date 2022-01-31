import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
    todoListsReducer
} from "./todolists-reducer";
import {v1} from "uuid";
import {FilterValuesType, TodoListsType} from "../App";


test.skip('user reducer should increment only age', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    const todoLists: Array<TodoListsType> = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ]


    const endState = todoListsReducer(todoLists,removeTodoListAC(todolistID1) )


    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistID2)
});




test.skip('user reducer should add to do list', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    const todoLists: Array<TodoListsType> = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ]


    const endState = todoListsReducer(todoLists, addTodoListAC("New To do List"))


    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("New To do List")
    expect(endState[0].title).toBe("What to learn")
    expect(endState[2].filter).toBe("all")
});



test.skip('user reducer should change to do list title', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    const todoLists: Array<TodoListsType> = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ]
    let newTitle = "New Title"
    let action = changeTodoListTitleAC(todolistID1,newTitle)



    const endState = todoListsReducer(todoLists, action)


    expect(endState.length).toBe(2)
    expect(endState[0].title).toBe(newTitle)
});


test.skip('user reducer should change to do list filter', () => {
    let todolistID1 = v1();
    let todolistID2 = v1();
    const todoLists: Array<TodoListsType> = [
        {id: todolistID1, title: "What to learn", filter: "all"},
        {id: todolistID2, title: "What to buy", filter: "all"}
    ]
    let filter:FilterValuesType = "completed"
    let action = changeTodoListFilterAC(todolistID1,"completed")


    const endState = todoListsReducer(todoLists, action)


    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("completed")
});