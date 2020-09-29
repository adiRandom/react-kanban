/**
 * Created by Adrian Pascu at 29-Sep-20
 */

import React, {useEffect} from "react";
import {useDragLayer, XYCoord} from "react-dnd";
import {Item} from "../../../../models/Item";

type DragLayerProps = {
    initialOffset: XYCoord,
    currentOffset: XYCoord,
    item: Item,
    isDragging: boolean
}

const DragLayer = () => {
    const {isDragging, initialOffset, currentOffset, item} = useDragLayer(monitor => ({
        currentOffset: monitor.getSourceClientOffset(),
        initialOffset: monitor.getInitialSourceClientOffset(),
        item: monitor.getItem(),
        isDragging: monitor.isDragging()
    }) as DragLayerProps)
    //
    // useEffect(() => {
    //     console.log(currentOffset)
    // })

    if (!isDragging)
        return null
    else return (
        <div className={"Dragging"} style={{
            transform: `translate(${currentOffset.x}px, ${currentOffset.y}px)`,
            width: '200px',
            height: '200px',
            background: "green",
            position: 'fixed',
            top: 0,
            left: 0,
            pointerEvents: "none"
        }}>
            Dragging around
        </div>
    )
}

export default DragLayer