/**
 * Created by Adrian Pascu at 24-Sep-20
 */

import React, {MutableRefObject, useEffect, useRef, useState} from 'react'
import style from "./ListItem.module.css";
import typography from "../../../res/theme/typography.module.css";
import {Item} from "../../../models/Item";
import {ListAction, SaveEditItemPayload} from "../../../actions/ListAction";
import {useDispatch} from "react-redux";
import TextareaAutosize from 'react-textarea-autosize'
import {useDrag} from "react-dnd";
import {getEmptyImage} from 'react-dnd-html5-backend'

type ListItemProps = {
    index: number,
    //Send the reference to this element to the parent component
    sendRefToParent: (ref: HTMLElement | null, position: number) => void
    item: Item,
    requestContextMenu: (e: MouseEvent, index: number) => void
}

export const LIST_ITEM_DRAG_TYPE = 'list-item'

export type DraggedListItem = {
    type: string,
    item: Item,
    size: {
        width: number,
        height: number
    }
}


const ListItem = ({index, sendRefToParent, item, requestContextMenu}: ListItemProps) => {

    const editContentRef = useRef<HTMLTextAreaElement>(null)
    const [editedContent, setEditedContent] = useState(item.content)
    //Ref to the top-level html item of this ListItem
    const ref = useRef<HTMLElement | null>(null) as MutableRefObject<HTMLElement|null>
    const dispatch = useDispatch()
    const [{isDragging}, dragRef, previewRef] = useDrag({
        item: {
            type: LIST_ITEM_DRAG_TYPE,
            item,
            size: {
                width: ref.current?.getBoundingClientRect().width,
                height: ref.current?.getBoundingClientRect().height
            }
        } as DraggedListItem,
        collect: monitor => ({
            isDragging: monitor.isDragging()
        })
    })

    // Focus input on reveal
    useEffect(() => {
        if (item.isEditing) {
            editContentRef.current?.focus()
            editContentRef.current?.setSelectionRange(0, editedContent.length, "forward")
        }
    }, [item])

    // Hide the built in drag preview
    useEffect(() => {
        previewRef(getEmptyImage())
    }, [previewRef])

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
        if (current)
            ref.current = current;
        dragRef(current)
    }

    return (
        <article onContextMenu={e => requestContextMenu(e as any, index)}
                 ref={setRef}
                 style={{
                     visibility: isDragging ? 'hidden' : 'visible'
                 }}
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