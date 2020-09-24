/**
 * Created by Adrian Pascu at 22-Sep-20
 */

import React, {useEffect, useRef} from "react";
import editIcon from '../../res/icons/edit.svg'
import deleteIcon from '../../res/icons/delete.svg'
import style from './ContextMenu.module.css'
import {useDispatch} from "react-redux";
import {DialogAction} from "../../actions/DialogActions";
import {DialogType} from "../../models/Dialog";

type ContextMenuProps = {
    //Position of the context menu
    x?: number,
    y?: number,
    //Context menu target
    listId?: string
    itemId?: string
}


const ContextMenu = ({x, y}: ContextMenuProps) => {


    // Function to be called whenever an element from the dialog is clicked to prevent its disposal
    function preventClickPropagation(e: MouseEvent) {
        e.stopPropagation()
    }

    function edit(e: MouseEvent) {
        console.log("Editing")
    }


    return (
        <section onClick={e=>preventClickPropagation(e as any)} className={`${style.contextMenuContainer}`} style={{
            top: y,
            left: x
        }}>
            <button onClick={e=>edit(e as any)} className={style.contextMenuButton}>
                <img className={style.contextMenuButtonIcon} alt={"Edit"} src={editIcon}/>Edit
            </button>
            <button className={style.contextMenuButton}>
                <img className={style.contextMenuButtonIcon} alt={"Delete"}
                     src={deleteIcon}/>Delete
            </button>
        </section>
    )
}

export default ContextMenu;
