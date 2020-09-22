import React, {useEffect, useRef, useState} from 'react';
import logo from './res/icons/logo.png'
import style from './App.module.css'
import './res/theme/colors.css'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import SettingsButton from "./components/buttons/SettingsButton";
import LoadButton from "./components/buttons/LoadButton";
import ShareButton from "./components/buttons/ShareButton";
import Status from "./components/status/Status";
import editIcon from "./res/icons/edit.png"
import List from "./components/list/List";
import {ListModel} from "./models/ListModel";
import {Item} from "./models/Item";
import {useDispatch, useSelector} from "react-redux";
import {BackgroundType, Store} from "./store/Store";
import {BoardAction} from "./actions/BoardActions";
import typography from "./res/theme/typography.module.css"
import CreateList from "./components/CreateList/CreateList";
import {Board} from "./models/Board";
import {Dialog} from "./models/Dialog";

const DummyItems: Item[] = [
    {
        content: "Cur hilotae cadunt?Heu.Equiso de barbatus lanista, gratia zeta!Fidelis compater rare imperiums lanista est.",
        id: "1"
    },
    {
        content: "Festus liberis ducunt ad musa.Neuter, altus galluss cito reperire de teres, placidus bursa.Urchin, horror, and courage.A bright form of resurrection is the blessing.To the rich asparagus add chicken lard, rice, adobo sauce and fresh tuna.",
        id: "2"
    },
    {
        content: "Soft musics knows most justices.All special egos fear each other, only pictorial lamas have a dimension.Aye, black landlubber. go to fort charles.All the stars transform real, crazy ships.Decorate one jar of steak in one quarter cup of remoulade.",
        id: "3"
    }
]


function App() {

    // const lists: ListModel[] = [
    //     {
    //         items: DummyItems,
    //         id: "1",
    //         title: "My list"
    //     }, {
    //         items: DummyItems,
    //         id: "1",
    //         title: "My list"
    //     },
    //     {
    //         items: DummyItems,
    //         id: "1",
    //         title: "My list"
    //     }, {
    //         items: DummyItems,
    //         id: "1",
    //         title: "My list"
    //     },
    //     {
    //         items:DummyItems,
    //         id:"1",
    //         title:"My list"
    //     },
    //     {
    //         items:DummyItems,
    //         id:"1",
    //         title:"My list"
    //     },
    //     {
    //         items:DummyItems,
    //         id:"1",
    //         title:"My list"
    //     }
    //
    // ]

    const lists: ListModel[] = useSelector<Store>(state => state.lists) as ListModel[]

    const boardState = useSelector<Store>(state => state.board) as Board

    const [editingBoardTitle, setEditingBoardTitle] = useState(false)
    const [editBoardTitle, setEditBoardTitle] = useState(boardState.title)

    const editBoardTitleRef = useRef<HTMLInputElement>(null)
    const dispatch = useDispatch()

    const dialogState = useSelector<Store>(state=>state.dialog) as Dialog


    // Focus input on reveal
    useEffect(() => {
        if (editingBoardTitle) {
            editBoardTitleRef.current?.focus()
            editBoardTitleRef.current?.setSelectionRange(0, editBoardTitle.length, "forward")
        }
    }, [editingBoardTitle])

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
        <main style={{
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
            <section className={style.lists}>
                {lists.map(list =>
                    (<List className={style.list} key={list.id} {...list}/>)
                )}
                {/*Create list button*/}
                <CreateList/>
            </section>
        </main>
    );
}

export default App;
