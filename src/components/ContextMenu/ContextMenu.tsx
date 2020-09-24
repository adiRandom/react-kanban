/**
 * Created by Adrian Pascu at 22-Sep-20
 */

import React from "react";
import editIcon from '../../res/icons/edit.svg'
import deleteIcon from '../../res/icons/delete.svg'
import style from './ContextMenu.module.css'
import {useDispatch} from "react-redux";
import {ListAction} from "../../actions/ListAction";
import {DialogAction} from "../../actions/DialogActions";

type ContextMenuProps = {
    //Position of the context menu
    x?: number,
    y?: number,
    //Context menu target
    listId?: string
    itemId?: string
}


const ContextMenu = ({x, y, itemId, listId}: ContextMenuProps) => {

    const dispatch = useDispatch()


    // Function to be called whenever an element from the dialog is clicked to prevent its disposal
    function preventClickPropagation(e: MouseEvent) {
        e.stopPropagation()
    }

    function edit() {
        dispatch({
            type: "START_EDIT_ITEM",
            payload: {
                itemId,
                listId
            }
        } as ListAction)
        dispatch({
            type: "DISPOSE_DIALOGS"
        } as DialogAction)
    }

    function deleteItem() {
        dispatch({
            type: "DELETE_ITEM",
            payload: {
                itemId,
                listId
            }
        } as ListAction)
        dispatch({
            type: "DISPOSE_DIALOGS"
        } as DialogAction)
    }


    return (
        <section onClick={e => preventClickPropagation(e as any)} className={`${style.contextMenuContainer}`} style={{
            top: y,
            left: x
        }}>
            <button onClick={edit} className={style.contextMenuButton}>
                <img className={style.contextMenuButtonIcon} alt={"Edit"} src={editIcon}/>Edit
            </button>
            <button onClick={deleteItem} className={style.contextMenuButton}>
                <img className={style.contextMenuButtonIcon} alt={"Delete"}
                     src={deleteIcon}/>Delete
            </button>
        </section>
    )
}

export default ContextMenu;
