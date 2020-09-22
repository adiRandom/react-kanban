/**
 * Created by Adrian Pascu at 22-Sep-20
 */

import React from "react";
import editIcon from '../../res/icons/edit.svg'
import deleteIcon from '../../res/icons/delete.svg'
import style from './ContextMenu.module.css'

type ContextMenuProps = {
    //Position of the context menu
    x?: number,
    y?: number,
    //Context menu target
    listId?: string
    itemId?: string
}


const ContextMenu = ({x, y}: ContextMenuProps) => {
    return (
        <section className={`${style.contextMenuContainer}`} style={{
            top: y,
            left: x
        }}>
            <button className={style.contextMenuButton}>
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
