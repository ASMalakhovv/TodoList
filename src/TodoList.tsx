import React, {ChangeEvent} from 'react';
import {FilterValuesType, TasksType} from "./App";
import {AddItemForm} from "./components/AddItemForm";
import {EditElementSpan} from "./components/EditElementSpan/EditElementSpan";
import {ButtonMy} from "./components/Button/ButtonMy";
import {Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./redux/store";
import {changeTodoListFilterAC} from "./state/todolists-reducer";
import {addTasksAC, changeStatusTasksAC, removeTasksAC, updateTasksAC} from "./state/tasks-reducer";
import {TaskStatuses} from "./api/todolist-api";


type TodoListPropsType = {
    title: string
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    filter: FilterValuesType
    todoListID: string
    removeTodolist: (todoListID: string) => void
    updateTodoList: (todoListID: string, title: string) => void
}

function TodoList(props: TodoListPropsType) {
    let tasks = useSelector<StateType, TasksType>(state => state.tasks);
    let dispatch = useDispatch();
    let tasksForTodolist = tasks[props.todoListID]
    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
    }

    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
    }

    const tasksJSXElements = tasksForTodolist.map(t => {
        const onClickMap = () => {
            dispatch(removeTasksAC(props.todoListID, t.id))
        }
        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            let status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
            dispatch(changeStatusTasksAC(props.todoListID, t.id, status))
        }
        return (
            <ListItem key={t.id}>
                <div className={t.status === TaskStatuses.Completed ? "isDone" : ""}
                     style={{display: 'inline'}}>
                    <Checkbox
                        checked={t.status === TaskStatuses.Completed}
                        color="primary"
                        inputProps={{'aria-label': 'secondary checkbox'}}
                        onChange={onChangeHandler}
                    />
                    <EditElementSpan title={t.title}
                                     callback={(title) => updateTaskHandler(title, t.id, props.todoListID)}/>
                </div>
                <IconButton onClick={onClickMap}><Delete/> </IconButton>

            </ListItem>
        )
    })


    const tsarFoo = (todoListID: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, value))
    }
    const updateTaskHandler = (title: string, tID: string, todoListID: string) => {
        dispatch(updateTasksAC(todoListID, tID, title))
    }

    const onClickHandlerForRemoveTodolist = () => {
        props.removeTodolist(props.todoListID)
    }
    const callback = (title: string) => {
        dispatch(addTasksAC(props.todoListID, title))
    }
    const updateTodoListHandler = (title: string) => {
        props.updateTodoList(props.todoListID, title)

    }


    return (
        <div className="App">
            <div>
                <div>
                    <EditElementSpan title={props.title} callback={(title) => updateTodoListHandler(title)}/>
                    <IconButton onClick={onClickHandlerForRemoveTodolist} name="delete"><Delete/> </IconButton>
                </div>
                <AddItemForm callback={callback}/>
                <List>
                    {tasksJSXElements}
                </List>
                <div>

                    <ButtonMy callback={() => {
                        tsarFoo(props.todoListID, "all")
                    }} name={"all"} filter={props.filter}/>
                    <ButtonMy callback={() => {
                        tsarFoo(props.todoListID, "active")
                    }} name={"active"} filter={props.filter}/>
                    <ButtonMy callback={() => {
                        tsarFoo(props.todoListID, "completed")
                    }} name={"completed"} filter={props.filter}/>

                </div>
            </div>
        </div>
    )
}

export default TodoList