/**
 * Created by Adrian Pascu at 24-Sep-20
 */

import React from 'react'
import style from "./ListItem.module.css";
import typography from "../../../res/theme/typography.module.css";
import {Item} from "../../../models/Item";

type DraggedListItemProps = {
    item: Item,
}


const DraggedListItem = ({item}: DraggedListItemProps) => {

    return (
        <article className={style.draggedItem}>
            <p className={typography.body2}>{item.content}</p>
        </article>
    )
}

export default DraggedListItem