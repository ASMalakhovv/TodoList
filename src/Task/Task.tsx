import {useDispatch} from "react-redux";
import {changeStatusTasksAC, removeTasksAC, updateTasksAC} from "../state/tasks-reducer";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import {EditElementSpan} from "../components/EditElementSpan/EditElementSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../api/todolist-api";

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
        let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(changeStatusTasksAC(props.todoListID, props.task.id, status))
    }, [dispatch, props.todoListID, props.task.id])

    const updateTaskHandler = useCallback((title: string) => {
        dispatch(updateTasksAC(props.todoListID, props.task.id, title))
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
                />
                <EditElementSpan title={props.task.title}
                                 callback={updateTaskHandler}/>
            </div>
            <IconButton onClick={onClickMap}><Delete/> </IconButton>

        </ListItem>
    )
})