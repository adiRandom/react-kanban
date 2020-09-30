import React, {useEffect, useRef, useState} from 'react';
import logo from './res/icons/logo.png'
import style from './App.module.css'
import './res/theme/colors.css'
import SettingsButton from "./components/buttons/SettingsButton";
import LoadButton from "./components/buttons/LoadButton";
import ShareButton from "./components/buttons/ShareButton";
import Status from "./components/status/Status";
import editIcon from "./res/icons/edit.png"
import List from "./components/list/List";
import {ListModel} from "./models/ListModel";
import {useDispatch, useSelector} from "react-redux";
import {BackgroundType, Store} from "./store/Store";
import {BoardAction} from "./actions/BoardActions";
import typography from "./res/theme/typography.module.css"
import CreateList from "./components/CreateList/CreateList";
import {Board} from "./models/Board";
import {Dialog, DialogType} from "./models/Dialog";
import ContextMenu from "./components/ContextMenu/ContextMenu";
import {DialogAction} from "./actions/DialogActions";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import DragLayer from './components/list/ListItem/util/DragLayer';



function App() {

    const lists: ListModel[] = useSelector<Store>(state => state.lists) as ListModel[]

    const boardState = useSelector<Store>(state => state.board) as Board

    const [editingBoardTitle, setEditingBoardTitle] = useState(false)
    const [editBoardTitle, setEditBoardTitle] = useState(boardState.title)

    const editBoardTitleRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()

    const dialogState = useSelector<Store>(state => state.dialog) as Dialog


    // Focus input on reveal
    useEffect(() => {
        if (editingBoardTitle) {
            editBoardTitleRef.current?.focus()
            editBoardTitleRef.current?.setSelectionRange(0, editBoardTitle.length, "forward")
        }
    }, [editingBoardTitle])

    function disposeDialogs() {
        dispatch({
            type: "DISPOSE_DIALOGS"
        } as DialogAction)
    }

    function updateBoardTitle() {
        dispatch({
            type: "RENAME_BOARD",
            payload: editBoardTitle
        } as BoardAction)
        setEditingBoardTitle(false)
    }

    function updateBoardTitleOnEnterPressed(e: KeyboardEvent) {
        if ((e as KeyboardEvent).key === "Enter")
            updateBoardTitle()
    }


    return (

        <main onClick={disposeDialogs} style={{
            background: boardState.backgroundType === BackgroundType.COLOR ? boardState.background : `url(${boardState.background})`,
            backgroundSize: boardState.backgroundType === BackgroundType.IMAGE ? "cover" : "initial"
        }}>
            <section className={style.titleBar}>
                <img className={style.logo} src={logo} alt={"Logo"}/>
                <h1 className={style.title}>React Kanban</h1>
            </section>
            <section className={style.buttonsSection}>
                <SettingsButton/>
                <LoadButton/>
                <ShareButton/>
                <Status/>
            </section>
            <header className={style.boardTitleWrapper} style={{
                borderBottomWidth: editingBoardTitle ? 0 : "0.5px"
            }}>
                {!editingBoardTitle && <h2 className={style.boardTitle}>{boardState.title}</h2>}
                {!editingBoardTitle &&
                <button className={style.editBoardTitleButton} onClick={() => setEditingBoardTitle(true)}>
                    <img src={editIcon} alt={"Edit"} className={style.editBoardTitleButtonIcon}/>
                </button>}
                {editingBoardTitle &&
                <input className={`${typography.h2} ${style.editTitle}`} ref={editBoardTitleRef}
                       onKeyPress={e => updateBoardTitleOnEnterPressed(e as any)} value={editBoardTitle}
                       onBlur={updateBoardTitle}
                       onChange={e => setEditBoardTitle(e.target.value)}/>}
            </header>
            <DndProvider backend={HTML5Backend}>
                <section className={style.lists}>
                    {lists.map(list =>
                        (<List className={style.list} key={list.id} {...list}/>)
                    )}
                    {/*Create list button*/}
                    <CreateList/>
                </section>
                <DragLayer/>
            </DndProvider>
            { /* Check if all needed values are set */ dialogState.type === DialogType.CONTEXT && dialogState.contextX && dialogState.contextY && dialogState.contextTargetListId && dialogState.contextTargetItemId &&
            <ContextMenu x={dialogState.contextX} y={dialogState.contextY} listId={dialogState.contextTargetListId}
                         itemId={dialogState.contextTargetItemId}/>}

        </main>

    );
}

export default App;
