/**
 * Created by Adrian Pascu at 24-Sep-20
 */

import React, {useEffect, useRef, useState} from 'react'
import style from "./ListItem.module.css";
import typography from "../../res/theme/typography.module.css";
import {Item} from "../../models/Item";
import {ListAction, SaveEditItemPayload} from "../../actions/ListAction";
import {useDispatch} from "react-redux";
import TextareaAutosize from 'react-textarea-autosize'

type ListItemProps = {
    index: number,
    //Send the ref to this element to the parent component
    setRef: (ref: HTMLElement | null, position: number) => void
    item: Item,
    requestContextMenu: (e: MouseEvent, index: number) => void
}

const ListItem = ({index, setRef, item, requestContextMenu}: ListItemProps) => {

    const editContentRef = useRef<HTMLTextAreaElement>(null)
    const [editedContent, setEditedContent] = useState(item.content)
    const dispatch = useDispatch()

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

    return (
        <article onContextMenu={e => requestContextMenu(e as any, index)} ref={current => setRef(current, index)}
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