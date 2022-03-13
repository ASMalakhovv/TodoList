import {setErrorApp} from "../state/app-reducer";
import {Dispatch} from "redux";
import {CommonResponseType} from "../api/todolist-api";

export const handleServerNetworkError = (dispatch:Dispatch, message:string) => {
    dispatch(setErrorApp(message))
}


export const handleServerAppError = <T>(dispatch:Dispatch, data:CommonResponseType<T>) => {
    if (data.messages.length){
        dispatch(setErrorApp(data.messages[0]))
    } else {
        dispatch(setErrorApp('Обратитесь к администратору сайта'))
    }
}
