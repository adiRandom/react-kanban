/**
 * Created by Adrian Pascu at 29-Sep-20
 */

import React from "react";
import {useDragLayer, XYCoord} from "react-dnd";
import DraggedListItem from "../DraggedListItem";
import {DraggedListItem as DraggedListItemType} from "../ListItem"
import style from "./DragLayer.module.css"

type DragLayerProps = {
    initialOffset: XYCoord,
    currentOffset: XYCoord,
    item: DraggedListItemType,
    isDragging: boolean
}

const DragLayer = () => {
    const {isDragging, currentOffset, item} = useDragLayer(monitor => ({
        currentOffset: monitor.getSourceClientOffset(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        item: monitor.getItem(),
        isDragging: monitor.isDragging()
    }) as DragLayerProps)


    if (!isDragging)
        return null
    else return (
        <div className={style.dragContainer} style={{
            transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
            width: item.size.width,
            height: item.size.height,
        }}>
            <DraggedListItem item={item.item}/>
        </div>
    )
}

export default DragLayer