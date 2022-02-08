import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import './components/Button/Button.css'
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./redux/store";
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC
} from "./state/todolists-reducer";



export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    let dispatch = useDispatch();
    //let tasks = useSelector<StateType, TasksType>(state => state.tasks);
    let todoLists = useSelector<StateType, Array<TodoListsType>>(state => state.todoLists)



    const updateTodoList = (todoListID: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListID, title))
    }

   /* const updateTask = (todoListID: string, taskID: string, title: string) => {
        dispatch(updateTasksAC(todoListID, taskID, title))
    }*/

    const removeTodolist = (todoListsID: string) => {
        dispatch(removeTodoListAC(todoListsID))
    }

    const changeFilter = (todoListID: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, value))
    }


  /*  const removeTasks = (todoListID: string, tasksID: string) => {
        dispatch(removeTasksAC(todoListID, tasksID))
    }
*/
    /*const addTasks = (todoListID: string, title: string) => {
        dispatch(addTasksAC(todoListID, title))
    }
*/

    /*const changeStatusTask = (todoListID: string, taskID: string, isDone: boolean) => {
        dispatch(changeStatusTasksAC(todoListID,taskID,isDone))
    };*/


    const addTodolist = (title: string) => {
        dispatch(addTodoListAC(title))
    };

    return (
        < div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={10}>
                    {todoLists.map(t => {
                        /*let tasksForTodolist = tasks[t.id]
                        if (t.filter === 'active') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
                        }

                        if (t.filter === 'completed') {
                            tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
                        }*/
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={t.id}
                                        title={t.title}
                                        //tasks={tasksForTodolist}
                                       // removeTasks={removeTasks}
                                       // addTasks={addTasks}
                                      //  changeStatusTask={changeStatusTask}
                                        changeFilter={changeFilter}
                                        filter={t.filter}
                                        todoListID={t.id}
                                        removeTodolist={removeTodolist}
                                      //  updateTask={updateTask}
                                        updateTodoList={updateTodoList}
                                    />
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    )

}

export default App;
