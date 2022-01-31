import './components/Button/Button.css'
import {AddItemForm} from "./components/AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTodoListAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC,
} from "./state/todolists-reducer";
import TodoListWithReducer from "./TodoListWithReducer";
import {useDispatch, useSelector} from "react-redux";
import {StateType} from "./redux/store";
import {useCallback} from "react";


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

function AppWithRedux() {
    console.log('AppWithRedux')
    const dispatch = useDispatch()
    const todoLists = useSelector<StateType, Array<TodoListsType>>(state => state.todoLists)


    const updateTodoList = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodoListTitleAC(todoListID, title))
    },[dispatch])

    const removeTodolist = useCallback((todoListsID: string) => {
        let action = removeTodoListAC(todoListsID)
        dispatch(action)
    },[dispatch])

    const changeFilter = useCallback((todoListID: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC(todoListID, value))
    },[dispatch])

    const addTodolist = useCallback((title: string) => {
        let action = addTodoListAC(title)
        dispatch(action)
    },[dispatch]);

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
                                    <TodoListWithReducer
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

export default AppWithRedux;
