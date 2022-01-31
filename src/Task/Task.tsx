import {useDispatch} from "react-redux";
import {changeStatusTasksAC, removeTasksAC, updateTasksAC} from "../state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditElementSpan} from "../components/EditElementSpan/EditElementSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "../App";

type TaskPropsType = {
    todoListID: string
    task: TaskType
}

export const Task = React.memo((props: TaskPropsType) => {
    console.log('Task')
    const dispatch = useDispatch()

    const onClickMap = useCallback(() => {
        dispatch(removeTasksAC(props.todoListID, props.task.id))
    }, [dispatch, props.todoListID, props.task.id])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        dispatch(changeStatusTasksAC(props.todoListID, props.task.id, e.currentTarget.checked))
    }, [dispatch, props.todoListID, props.task.id])

    const updateTaskHandler = useCallback((title: string) => {
        dispatch(updateTasksAC(props.todoListID, props.task.id, title))
    }, [dispatch, props.todoListID, props.task.id])

    return (
        <ListItem key={props.task.id}>
            <div className={props.task
                .isDone ? "isDone" : ""}
                 style={{display: 'inline'}}>
                <Checkbox
                    checked={props.task
                        .isDone}
                    color="primary"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                    onChange={onChangeHandler}
                />
                <EditElementSpan title={props.task.title}
                                 callback={updateTaskHandler}/>
            </div>
            <IconButton onClick={onClickMap}><Delete/> </IconButton>

        </ListItem>
    )
})