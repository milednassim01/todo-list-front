import React, {useEffect, useState} from 'react';
import {Task, Toolbar} from "../../components";
import {BottomNavigation, BottomNavigationAction, Fab, Tooltip} from "@material-ui/core";
import ListIcon from '@material-ui/icons/List';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import AddIcon from '@material-ui/icons/Add';
import {useDispatch, useSelector} from "react-redux";
import {create, getTasks, remove, update} from "../../redux/slices/tasks";
import DialogModal from "../../components/DialogModal";

const Index = () => {
    const [value, setValue] = useState(0);
    const [open, setOpen] = useState(false);
    const [values, setValues] = useState({'title': ''});
    const [filtered, setFiltered] = useState(false);
    const [taskId, setTaskId] = useState()
    const dispatch = useDispatch();
    const {tasks} = useSelector(
        (state) => state.tasks
    );
    const [localTasks, setTasks] = useState(tasks);
    useEffect(() => {
        dispatch(getTasks())
    }, [dispatch])
    useEffect(() => {
        setTasks(tasks)
    }, [tasks])
    const addTask = () => {
        taskId ?
            dispatch(update(values, taskId)) :
            dispatch(create(values))
        return setOpen(false);
    }
    const removeTask = (taskId) => {
        dispatch(remove(taskId));
    }
    const handleChange = (e) => {
        setValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };
    const updateCheck = (event, id) => {
        dispatch(update({'checked': event.target.checked}, id))
    }
    const filterTasks = () => {
        let filteredTasks = tasks.filter(task => task.checked);
        setTasks(filteredTasks);
        setFiltered(true)
    }
    const OnEditText = (text, id) => {
        setOpen(true)
        setTaskId(id)
        setValues({
            'title': text
        })
    }
    return <>
        <Toolbar/>
        <div className="home-container">
            <BottomNavigation
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                showLabels
            >
                <BottomNavigationAction icon={<ListIcon/>} onClick={() => {
                    setTasks(tasks);
                    setFiltered(false)
                }}/>
                <BottomNavigationAction icon={<PlaylistAddCheckIcon/>} onClick={filterTasks}/>
            </BottomNavigation>
            <div className="tasks">
                {localTasks?.map(task => {
                    return <Task text={task.title} checked={task.checked} checkTask={updateCheck} taskId={task.id}
                                 onEdit={OnEditText} onDelete={removeTask}/>
                })}
            </div>
            {!filtered &&
            <Tooltip title="Add" aria-label="add" className="add-button" onClick={() => {
                setOpen(true);
                setValues({'title': ''});
                setTaskId()
            }}>
                <Fab color="secondary">
                    <AddIcon/>
                </Fab>
            </Tooltip>
            }
        </div>
        <DialogModal onClose={setOpen} open={open} handleChange={handleChange} handleSubmit={addTask}
                     selectedValue={values.title}/>
    </>
}

export default Index