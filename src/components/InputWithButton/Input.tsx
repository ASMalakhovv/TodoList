import React, {ChangeEvent, KeyboardEvent} from "react";
import {TextField} from "@material-ui/core";


export type InputProps = {
    title: string
    setTitle: (title: string) => void
    error: string | null
    setError: (error: string | null) => void
    onClickHandlerForEnter: () => void
}

export const Input = (props: InputProps) => {

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (props.error !== null) {
            props.setError(null)
        }
        props.setTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if(e.code === "Enter") props.onClickHandlerForEnter()
    }

    return (

        <TextField value={props.title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={props.error ? "error" : ""}
                   variant={'outlined'}
                   size={'small'}
                   label={'Type value'}
                   error={!!props.error}
                   helperText={props.error}
        />

    )
}