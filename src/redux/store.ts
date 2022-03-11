import {applyMiddleware, combineReducers, createStore} from "redux";
import {TodoListsActionsType, todoListsReducer} from "../state/todolists-reducer";
import {TasksActionsType, tasksReducer} from "../state/tasks-reducer";
import thunk, { ThunkAction } from "redux-thunk";
import {appReducer} from "../state/app-reducer";


export type StateType = ReturnType<typeof rootReducer>
const rootReducer = combineReducers({
    todoLists: todoListsReducer,
    tasks: tasksReducer,
    app: appReducer

})

export type AppAction = TodoListsActionsType | TasksActionsType

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType,
    StateType,
    unknown,
    AppAction>


export let store = createStore(rootReducer,applyMiddleware(thunk))


// @ts-ignore
window.store = store