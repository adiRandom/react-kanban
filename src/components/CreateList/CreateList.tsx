/**
 * Created by Adrian Pascu at 21-Sep-20
 */

import React from "react";
import addIcon from "../../res/icons/add_black.png"
import style from "./CreateList.module.css"
import {useDispatch, useSelector} from "react-redux";
import {ListAction} from "../../actions/ListAction";
import getId from "../../utils/functions/IdGenerator";
import ReactKanbanApi from "../../api/ReactKanbanApi";
import {Store} from "../../store/Store";
import {getEmptyList} from "../../utils/functions/EmptyModelGenerators";

const CreateList = () => {

    const dispatch = useDispatch()
    const boardId = useSelector<Store>(state => state.board.id) as string

    function onClick() {
        //    Create list

        //Create an id for the new list

        const id = getId(32)

        dispatch({
            type: "CREATE_LIST",
            payload: id
        } as ListAction)

        // Sync the new list to the backend
        ReactKanbanApi.getInstance()?.createList(boardId, getEmptyList(id))
    }

    return (
        <section onClick={onClick} className={style.container}>
            <img alt={"add"} className={style.addIcon} src={addIcon}/>
            <h3>Create a list</h3>
        </section>
    )
}

export default CreateList;