/**
 * Created by Adrian Pascu at 21-Sep-20
 */

import React from "react";
import addIcon from "../../res/icons/add_black.png"
import style from "./CreateList.module.css"
import {useDispatch} from "react-redux";
import {ListAction} from "../../actions/ListAction";

const CreateList = () => {

    const dispatch = useDispatch()

    function onClick() {
        //    Create list
        dispatch({
            type: "CREATE_LIST",
        } as ListAction)
    }

    return (
        <section onClick={onClick} className={style.container}>
            <img alt={"add"} className={style.addIcon} src={addIcon}/>
            <h3>Create a list</h3>
        </section>
    )
}

export default CreateList;