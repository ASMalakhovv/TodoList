import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import './components/Button/Button.css'
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./redux/store";
import {
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC, setTodo
} from "./state/todolists-reducer";
import {TodolistType, TaskType} from './api/todolist-api';


export type FilterValuesType = 'all' | 'active' | 'completed'


export type TodoListsDomainType = TodolistType & {
    filter: FilterValuesType
}


export type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {
    let dispatch = useDispatch();
    let todoLists = useSelector<StateType, Array<TodoListsDomainType>>(state => state.todoLists)


    const updateTodoList = (todoListID: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListID, title))
    }

    const removeTodolist = (todoListsID: string) => {
        dispatch(removeTodoListAC(todoListsID))
    }

    const changeFilter = (todoListID: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, value))
    }


    const addTodolist = (title: string) => {
        dispatch(setTodo([
            {id: '1', title: "What to learn", addedDate: '', order: 0},
        ]))
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
                        return (
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                    <TodoList
                                        key={t.id}
                                        title={t.title}
                                        changeFilter={changeFilter}
                                        filter={t.filter}
                                        todoListID={t.id}
                                        removeTodolist={removeTodolist}
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
