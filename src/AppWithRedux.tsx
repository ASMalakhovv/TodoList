import './components/Button/Button.css'
import {AddItemForm} from "./components/AddItemForm";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/icons/Menu';
import {
    changeTodoListFilterAC, changeTodoListTitle,
    createTodoListThunk, deleteTodoListThunk, getTodoListsThunk, TodolistDomainType,
} from "./state/todolists-reducer";
import TodoListWithReducer from "./TodoListWithReducer";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {StateType} from "./redux/store";
import {useCallback, useEffect} from "react";
import {RequestStatusType} from "./state/app-reducer";
import {ErrorSnackbar} from "./components/ErrorSnackbar/ErrorSnackbar";


export type FilterValuesType = 'all' | 'active' | 'completed'

export const useAppSelector: TypedUseSelectorHook<StateType> = useSelector

function AppWithRedux() {

    const status = useAppSelector<RequestStatusType>((state) => state.app.status)

    useEffect(() => {
        dispatch(getTodoListsThunk)
    }, [])


    console.log('AppWithRedux')
    const dispatch = useDispatch()
    const todoLists = useSelector<StateType, Array<TodolistDomainType>>(state => state.todoLists)

    const updateTodoList = useCallback((todoListID: string, title: string) => {
        dispatch(changeTodoListTitle(todoListID, title))
    }, [dispatch])

    const removeTodolist = useCallback((todoListsID: string) => {
        dispatch(deleteTodoListThunk(todoListsID))
    }, [dispatch])

    const changeFilter = useCallback((todoListID: string, value: FilterValuesType) => {
        dispatch(changeTodoListFilterAC({id: todoListID, filter: value}))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(createTodoListThunk(title))
    }, [dispatch]);

    return (
        < div className="App">
            <ErrorSnackbar/>
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
            {status === 'loading' && <LinearProgress color="secondary"/>}
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
                                        entityStatus={t.entityStatus}
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
