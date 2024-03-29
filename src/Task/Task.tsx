import {useDispatch} from "react-redux";
import {changeStatusOrTitleTask, removeTask} from "../state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditElementSpan} from "../components/EditElementSpan/EditElementSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../api/todolist-api";


type TaskPropsType = {
    todoListID: string
    task: TaskType
    entityStatus: boolean
}

export const Task = React.memo((props: TaskPropsType) => {

    const dispatch = useDispatch()

    const onClickMap = useCallback(() => {
        dispatch(removeTask(props.todoListID, props.task.id))
    }, [dispatch, props.todoListID, props.task.id])

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(changeStatusOrTitleTask(props.todoListID, props.task.id, {status}))
    }, [dispatch, props.todoListID, props.task.id])

    const updateTaskHandler = useCallback((title: string) => {
        dispatch(changeStatusOrTitleTask(props.todoListID, props.task.id, {title}))
    }, [dispatch, props.todoListID, props.task.id])

    return (
        <ListItem key={props.task.id}>
            <div className={props.task
                .status === TaskStatuses.Completed ? "isDone" : ""}
                 style={{display: 'inline'}}>
                <Checkbox
                    checked={props.task
                        .status === TaskStatuses.Completed}
                    color="primary"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                    onChange={onChangeHandler}
                    disabled={props.entityStatus}
                />
                <EditElementSpan title={props.task.title}
                                 callback={updateTaskHandler}
                                 entityStatus={props.entityStatus}
                />
            </div>
            <IconButton onClick={onClickMap} disabled={props.entityStatus}><Delete/> </IconButton>

        </ListItem>
    )
})