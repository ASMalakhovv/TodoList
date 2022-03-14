import React, {useCallback, useEffect} from 'react';
import {AddItemForm} from "./components/AddItemForm";
import {EditElementSpan} from "./components/EditElementSpan/EditElementSpan";
import {ButtonMy} from "./components/Button/ButtonMy";
import {IconButton, List} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./redux/store";
import {addTask, getTasksTC} from "./state/tasks-reducer";
import {Task} from "./Task/Task";
import {TaskStatuses, TaskType} from "./api/todolist-api";
import {RequestStatusType} from "./state/app-reducer";
import {FilterValuesType} from "./AppWithRedux";


type TodoListPropsType = {
    title: string
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    filter: FilterValuesType
    todoListID: string
    removeTodolist: (todoListID: string) => void
    updateTodoList: (todoListID: string, title: string) => void
    entityStatus:RequestStatusType
}

const TodoListWithReducer = React.memo((props: TodoListPropsType) => {

    useEffect(() => {
        dispatch(getTasksTC(props.todoListID))
    }, [])


    let tasksForTodolist = useSelector<StateType, Array<TaskType>>(state => state.tasks[props.todoListID])
    const dispatch = useDispatch()


    if (props.filter === 'active') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.New)
    }

    if (props.filter === 'completed') {
        tasksForTodolist = tasksForTodolist.filter(t => t.status === TaskStatuses.Completed)
    }

    const tasksJSXElements = tasksForTodolist.map(t => <Task task={t} todoListID={props.todoListID} entityStatus={props.entityStatus === 'loading'}/>)


    const tsarFoo = useCallback((todoListID: string, value: FilterValuesType) => {
        props.changeFilter(todoListID, value)
    }, [dispatch, props.changeFilter])


    const onClickHandlerForRemoveTodolist = useCallback(() => {
        props.removeTodolist(props.todoListID)
    }, [dispatch, props.removeTodolist, props.todoListID])


    const callback = useCallback((title: string) => {
        let todolistId = props.todoListID
        dispatch(addTask({todolistId, title}))
    }, [dispatch, props.todoListID])


    const updateTodoListHandler = useCallback((title: string) => {
        props.updateTodoList(props.todoListID, title)
    }, [dispatch, props.updateTodoList, props.todoListID])


    return (
        <div className="App" key={props.todoListID}>
            <div>
                <EditElementSpan title={props.title} callback={updateTodoListHandler} entityStatus={props.entityStatus === 'loading'}/>
                <IconButton onClick={onClickHandlerForRemoveTodolist} name="delete" disabled={props.entityStatus === 'loading'}><Delete/> </IconButton>
            </div>
            <AddItemForm callback={callback} entityStatus={props.entityStatus}/>
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
    )
})

export default TodoListWithReducer


