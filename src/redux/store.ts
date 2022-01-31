import {combineReducers, createStore} from "redux";
import {todoListsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";


export type StateType = ReturnType<typeof rootReducer>
const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer

})


export let store = createStore(rootReducer)


// @ts-ignore
window.store = store