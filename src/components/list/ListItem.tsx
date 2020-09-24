/**
 * Created by Adrian Pascu at 24-Sep-20
 */

import React from 'react'
import style from "./ListItem.module.css";
import typography from "../../res/theme/typography.module.css";
import {Item} from "../../models/Item";

type ListItemProps = {
    index: number,
    //Send the ref to this element to the parent component
    setRef:(ref:HTMLElement|null,position:number)=>void
    item: Item,
    requestContextMenu: (e: MouseEvent, index: number) => void
}

const ListItem = ({index, setRef, item, requestContextMenu}: ListItemProps) => {
    return (
        <article onContextMenu={e => requestContextMenu(e as any, index)} ref={current => setRef(current,index)}
                 className={style.item} key={index}>
            <p className={typography.body2}>{item.content}</p>
        </article>
    )
}

export default ListItem