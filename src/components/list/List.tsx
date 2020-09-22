/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import React, {useState, Fragment, useRef, useEffect} from "react";
import editIcon from "../../res/icons/edit.png"
import style from "./List.module.css"
import {ListModel} from "../../models/ListModel";
import typography from '../../res/theme/typography.module.css'
import {BoardAction} from "../../actions/BoardActions";
import {useDispatch} from "react-redux";
import {ListAction} from "../../actions/ListAction";
import addIcon from "../../res/icons/baseline_add_black_48dp.png"
import ContextMenu from "../ContextMenu/ContextMenu";
import {DialogAction} from "../../actions/DialogActions";

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

    const [editingListTitle, setEditingListTitle] = useState(false)

    const [editedTitle, setEditedTitle] = useState(title)
    const editListTitleRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()
    const rootRef = useRef<HTMLDivElement>(null)
    //Array to hold references to all items
    const itemsRefs: (HTMLElement | null)[] = [];

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
        //If ref is not yet available, display a regular context menu
        if (rootRef && itemsRefs[index]) {
            e.preventDefault();

            //Compute the position of the context menu
            const item = itemsRefs[index]!!;
            const list = rootRef.current!!
            const {x} = item.getBoundingClientRect()
            const listWidth = list.offsetWidth;

            const posX = x + listWidth;
            const posY = e.pageY;

            dispatch({
                type: "SHOW_DIALOG",
                payload: {
                    x: posX,
                    y: posY
                }
            } as DialogAction)

        }
    }


    return (
        <section ref={rootRef} className={`${style.list} ${className}`}>
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
            <section className={style.items}>
                {items.map((item, index) => (
                    <article onContextMenu={e => requestContextMenu(e as any, index)} ref={current => itemsRefs
                        .push(current)} className={style.item} key={index}>
                        <p className={typography.body2}>{item.content}</p>
                    </article>
                ))}
                <AddItem parentId={id}/>
            </section>
        </section>
    )
}

export default List;