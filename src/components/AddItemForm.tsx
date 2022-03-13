import React, {useState} from "react";
import {Input} from "./InputWithButton/Input";
import {IconButton} from "@material-ui/core";
import {Add} from "@material-ui/icons";
import {RequestStatusType} from "../state/app-reducer";

export type AddItemFormPropsType = {
    callback: (title: string) => void
    entityStatus?: RequestStatusType
}


export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log("AddItemForm")
    const [title, setTitle] = useState("")
    const [error, setError] = useState<string | null>(null)


    const onClickHandler = () => {
        if (title.trim() === "") {
            setError("Title is required")
            return
        }
        props.callback(title)
        setTitle("")
    }

    return (
        <div>
            <Input title={title}
                   error={error}
                   onClickHandlerForEnter={onClickHandler}
                   setTitle={setTitle}
                   setError={setError}
                   entityStatus={props.entityStatus}
            />
            <IconButton onClick={onClickHandler}
                        color={'primary'}
                        disabled={props.entityStatus === 'loading'}
            ><Add/></IconButton>
        </div>
    )
})