/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import React, {Fragment, MutableRefObject, useEffect, useRef, useState} from "react";
import editIcon from "../../res/icons/edit.png"
import style from "./List.module.css"
import {ListModel} from "../../models/ListModel";
import typography from '../../res/theme/typography.module.css'
import {useDispatch} from "react-redux";
import {ListAction, MoveItemPayload} from "../../actions/ListAction";
import addIcon from "../../res/icons/baseline_add_black_48dp.png"
import {DialogAction} from "../../actions/DialogActions";
import {DialogType} from "../../models/Dialog";
import {
    useWindowHeight,
} from '@react-hook/window-size'
import ListItem, {DraggedListItem, LIST_ITEM_DRAG_TYPE} from "./ListItem/ListItem";
import {DropTargetMonitor, useDrop} from "react-dnd";

const AddItem = ({parentId}: { parentId: string }) => {

    const dispatch = useDispatch()

    function onClick() {
        dispatch({
            type: "ADD_ITEM",
            payload: parentId
        } as ListAction)
    }

    return (
        <button className={style.addItemButton} onClick={onClick}>
            <img className={style.addItemIcon} src={addIcon} alt={"Add"}/>
            Add item
        </button>
    )
}

const List = ({items, title, className, id}: ListModel & { className?: string }) => {

    const [editingListTitle, setEditingListTitle] = useState(true)

    const [editedTitle, setEditedTitle] = useState(title)
    const editListTitleRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const listRef = useRef<HTMLDivElement>(null)
    //Array to hold references to all items
    const itemsRefs: (HTMLElement | null)[] = [];

    const windowHeight = useWindowHeight()


    //Use to compute position of context menu by getting the visible rect box of items.
    const intersectionObserver: MutableRefObject<IntersectionObserver | null> = useRef<IntersectionObserver | null>(null)

    const [, dropRef] = useDrop(
        {
            accept: LIST_ITEM_DRAG_TYPE,
            drop: listItemDropped,
            hover: listItemHover
        }
    )

    //Init intersectionObserver
    useEffect(() => {
        if (listRef.current)
            intersectionObserver.current = new IntersectionObserver(computeContextMenuPositionAndDisplay, {
                root: listRef.current
            })
    }, [listRef])

    // Focus input on reveal
    useEffect(() => {
        if (editingListTitle) {
            editListTitleRef.current?.focus()
            editListTitleRef.current?.setSelectionRange(0, editedTitle.length, "forward")
        }
    }, [editingListTitle])

    function updateListTitle() {
        dispatch({
            type: "RENAME_LIST",
            payload: {
                id,
                title: editedTitle
            }
        } as ListAction)
        setEditingListTitle(false)
    }

    function updateListTitleOnEnterPressed(e: KeyboardEvent) {
        if ((e as KeyboardEvent).key === "Enter")
            updateListTitle()
    }

    function requestContextMenu(e: MouseEvent, index: number) {
        //If reference is not yet available, display a regular context menu
        if (listRef && itemsRefs[index]) {
            e.preventDefault();


            //Get the visible rect box of this item using the intersection observer api

            intersectionObserver.current?.disconnect()
            intersectionObserver.current?.observe(itemsRefs[index]!!)


            //Dispose action to set the current dialog visible as the context menu and set it target
            dispatch({
                type: "SHOW_DIALOG",
                payload: DialogType.CONTEXT
            } as DialogAction)
            dispatch({
                type: "SET_CONTEXT_TARGET",
                payload: {
                    targetListId: id,
                    targetItemId: items[index].id
                }
            } as DialogAction)

        }
    }

    function listItemDropped(item: DraggedListItem) {
        dispatch({
            type: "MOVE_ITEM",
            payload: {
                //TODO: Let the user choose pos
                pos: 0,
                itemListId: item.item.id,
                sourceListId: item.item.parentId,
                targetListId: id
            } as MoveItemPayload
        } as ListAction)
    }

    function listItemHover(item: DraggedListItem, monitor: DropTargetMonitor) {

    }

    // Intersection observer callback to compute the position of the context menu
    function computeContextMenuPositionAndDisplay(entries: IntersectionObserverEntry[]) {

        for (let entry of entries) {
            if (listRef.current) {
                const {x, height, y} = entry.intersectionRect
                const listWidth = listRef.current.offsetWidth;
                const posX = x + listWidth;
                const posY = y + height / 2 - (windowHeight / 100 * 5) /* 5vh to align the context menu middle point with the items middle point */;


                dispatch({
                    type: 'SET_CONTEXT_POSITION',
                    payload: {
                        x: posX,
                        y: posY,
                    }
                } as DialogAction)
            }

        }
    }


    return (
        <section ref={listRef} className={`${style.list} ${className}`}>
            <header className={style.listHeader}>
                {!editingListTitle &&
                <Fragment>
                    <h3 className={style.listTitle}>{title}</h3>
                    <button className={style.listTitleEditButton} onClick={() => setEditingListTitle(true)}>
                        <img className={style.listTitleEditButtonIcon} src={editIcon} alt={"Edit"}/>
                    </button>
                </Fragment>}
                {editingListTitle &&
                <input className={`${typography.h3} ${style.editTitle}`} ref={editListTitleRef}
                       onKeyPress={e => updateListTitleOnEnterPressed(e as any)} value={editedTitle}
                       onBlur={updateListTitle}
                       onChange={e => setEditedTitle(e.target.value)}/>}
            </header>
            <section className={style.items} ref={dropRef}>
                {items.map((item, index) => (
                    <ListItem index={index} sendRefToParent={(element, pos) => itemsRefs[pos] = element} item={item}
                              requestContextMenu={requestContextMenu}/>
                ))}
                <AddItem parentId={id}/>
            </section>
        </section>
    )
}

export default List;