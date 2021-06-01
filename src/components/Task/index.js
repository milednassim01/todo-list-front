import React from "react";
import {Checkbox} from "@material-ui/core";
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import CircleCheckedFilled from '@material-ui/icons/CheckCircle';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

const Index = ({text, checked, checkTask,taskId,onEdit,onDelete}) => {
    return (
        <div className="task">
            <div className="task-info">
                <Checkbox
                    icon={<CircleUnchecked/>}
                    checkedIcon={<CircleCheckedFilled/>}
                    checked={checked}
                    onChange={(event)=>checkTask(event,taskId)}
                    style={{
                        color: "#485882",
                    }}
                />
                <span style={{textDecoration:checked ? 'line-through' : 'none'}}>{text}</span>
            </div>
            <div className="task-actions">
                <EditIcon className="edit" onClick={()=>onEdit(text,taskId)}/>
                <DeleteIcon className="delete" onClick={()=>onDelete(taskId)}/>
            </div>
        </div>

    )

}

export default Index;