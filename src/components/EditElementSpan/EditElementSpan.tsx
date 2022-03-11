import React, {ChangeEvent, useCallback, useState} from "react";
import {TextField} from "@material-ui/core";
import {KeyboardEvent} from "react";
import s from './EditElementSpan.module.css'

export type EditElementSpanPropsType = {
    title: string
    callback: (title: string) => void
}


export const EditElementSpan = React.memo(({title, ...props}: EditElementSpanPropsType) => {
    console.log('EditSpan')
    const [newTitle, setNewTitle] = useState(title);
    const [error, setError] = useState<string | null>(null);
    const [edit, setEdit] = useState(false);


    const editTrue = useCallback(() => {
        setEdit(true)
    }, []);

    const editFalse = useCallback(() => {
        if (newTitle.trim() !== "") {
            setEdit(false)
            props.callback(newTitle)
        } else {
            setError('Enter text or delete the task')
        }
    }, [props.callback, newTitle]);

    const onChangeHandle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setError(null)
        setNewTitle(e.currentTarget.value)
    }, [])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLDivElement>) => {
        if (e.code === "Enter") {
            editFalse()
        }
    }, [])

    return (
        edit ? <div>
                <TextField className={s.textField} value={newTitle} onBlur={editFalse} autoFocus onChange={onChangeHandle}
                           onKeyPress={onKeyPressHandler}/>
                <div className={s.error}>
                    {error}
                </div>
            </div>
            : <span onDoubleClick={editTrue}>{title}</span>
    )
})