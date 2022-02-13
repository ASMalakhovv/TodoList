import {applyMiddleware, combineReducers, createStore} from "redux";
import {todoListsReducer} from "../state/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer";
import thunk from "redux-thunk";


export type StateType = ReturnType<typeof rootReducer>
const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer

})


export let store = createStore(rootReducer,applyMiddleware(thunk))


// @ts-ignore
window.store = store