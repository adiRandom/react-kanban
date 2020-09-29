/**
 * Created by Adrian Pascu at 24-Sep-20
 */

import React, {useEffect, useRef, useState} from 'react'
import style from "./ListItem.module.css";
import typography from "../../../res/theme/typography.module.css";
import {Item} from "../../../models/Item";
import {ListAction, SaveEditItemPayload} from "../../../actions/ListAction";
import {useDispatch} from "react-redux";
import TextareaAutosize from 'react-textarea-autosize'
import {useDrag, XYCoord} from "react-dnd";

type ListItemProps = {
    index: number,
    //Send the reference to this element to the parent component
    sendRefToParent: (ref: HTMLElement | null, position: number) => void
    item: Item,
    requestContextMenu: (e: MouseEvent, index: number) => void
}

export const LIST_ITEM_DRAG_TYPE = 'list-item'
type ListItemDragProps = {
    isDragging: boolean,
    pos: XYCoord
}

const ListItem = ({index, sendRefToParent, item, requestContextMenu}: ListItemProps) => {

    const editContentRef = useRef<HTMLTextAreaElement>(null)
    const [editedContent, setEditedContent] = useState(item.content)
    const dispatch = useDispatch()
    const [dragProps, dragRef] = useDrag({
        item: {
            type: LIST_ITEM_DRAG_TYPE,
            item
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
            pos: monitor.getClientOffset()
        }) as ListItemDragProps,
        end: () => {
            console.log("Drag ended")
        }

    })

    useEffect(() => {
        console.log(dragProps)
    }, [dragProps])

    // Focus input on reveal
    useEffect(() => {
        if (item.isEditing) {
            editContentRef.current?.focus()
            editContentRef.current?.setSelectionRange(0, editedContent.length, "forward")
        }
    }, [item])

    function updateItemContent() {
        dispatch({
            type: "SAVE_EDIT_ITEM",
            payload: {
                listId: item.parentId,
                itemId: item.id,
                content: editedContent
            } as SaveEditItemPayload
        } as ListAction)
    }

    function updateItemContentOnEnterPressed(e: KeyboardEvent) {
        if ((e as KeyboardEvent).key === "Enter")
            updateItemContent()
    }

    function setRef(current: HTMLElement | null) {
        sendRefToParent(current, index)
        dragRef(current)
    }

    return (
        <article onContextMenu={e => requestContextMenu(e as any, index)}
                 ref={setRef}
                 className={style.item} key={index}>
            {!item.isEditing && <p className={typography.body2}>{item.content}</p>}
            {item.isEditing &&
            <TextareaAutosize className={`${typography.body2} ${style.editContent}`} ref={editContentRef}
                              contentEditable
                              onKeyPress={e => updateItemContentOnEnterPressed(e as any)}
                              onBlur={updateItemContent}
                              onChange={e => setEditedContent(e.target.value)}>{editedContent}</TextareaAutosize>}
        </article>
    )
}

export default ListItem