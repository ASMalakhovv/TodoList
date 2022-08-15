import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    isError: null as string | null
}

/*type InitialStateType = typeof initialState*/

const slice = createSlice({
    name: 'app',
    initialState: initialState,
    reducers: {
        setStatusApp: (state, action:PayloadAction<{status: RequestStatusType}>) => {
            state.status = action.payload.status
        },
        setErrorApp: (state, action:PayloadAction<{isError: string | null}>) => {
            state.isError = action.payload.isError
        }
    }
})

export const appReducer = slice.reducer
export const {setStatusApp, setErrorApp} = slice.actions

/*export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case "APP/SET-ERROR":
            return {...state, isError: action.isError}
        case 'APP/SET-STATUS':
            return {...state, status: action.status}
        default:
            return state
    }
}*/


//AC
/*type ActionsType = SetStatusType | SetErrorType*/

/*export const setStatusApp = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export type SetStatusType = ReturnType<typeof setStatusApp>

export const setErrorApp = (isError: string | null) => ({type: 'APP/SET-ERROR', isError}) as const
export type SetErrorType = ReturnType<typeof setErrorApp>*/


