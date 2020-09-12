/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import React from "react";
import loadingIcon from '../../res/icons/loading-status.gif'
import doneIcon from "../../res/icons/done-status.png"
import style from "./Status.module.css"

const Status = () => {
    //TODO: Get state from redux
    const isLoading = false

    return (
        <div className={style.wrapper}>
            <img src={isLoading ? loadingIcon : doneIcon} alt={"Save status"} className={style.status}/>
        </div>
    )
}

export default Status