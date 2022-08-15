import {RequestStatusType, setErrorApp, setStatusApp} from "../state/app-reducer";
import {Dispatch} from "redux";
import {CommonResponseType} from "../api/todolist-api";
import {changeTodolistEntityStatusAC} from "../state/todolists-reducer";

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
    dispatch(setErrorApp({isError:message}))
}


export const handleServerAppError = <T>(dispatch: Dispatch, data: CommonResponseType<T>) => {
    if (data.messages.length) {
        dispatch(setErrorApp({isError: data.messages[0]}))
    } else {
        dispatch(setErrorApp({isError: 'Обратитесь к администратору сайта'}))
    }
}


export const handleChangeTitleOrStatusTask = (dispatch: Dispatch, statusAndEntityStatus: RequestStatusType, todolistId: string = '') => {
    dispatch(setStatusApp({status: statusAndEntityStatus}))
    dispatch(changeTodolistEntityStatusAC({entityStatus: statusAndEntityStatus, todoId: todolistId}))
}
