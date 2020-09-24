/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import React from "react";
import buttonStyle from "./Button.module.css"
import loadIcon from "../../res/icons/load.png";
import style from "./LoadButton.module.css"
import typography from '../../res/theme/typography.module.css'
import {useDispatch, useSelector} from "react-redux";
import {Store} from "../../store/Store";
import {DialogType} from "../../models/Dialog";
import {DialogAction} from "../../actions/DialogActions";

const LoadButton = () => {

    const dispatch = useDispatch()
    const isVisible = useSelector<Store>(state => state.dialog.type === DialogType.LOAD)

    function requestDialog() {

        dispatch({
            payload: DialogType.LOAD,
            type: "SHOW_DIALOG"
        } as DialogAction)
    }

    // Prevent dialog disposal when clicking inside the dialog
    function preventClickPropagation(e: MouseEvent) {
        e.stopPropagation()
    }

    return (
        <div onClick={e=>preventClickPropagation(e as any)} className={buttonStyle.buttonWrapper}>
            <button onClick={requestDialog} className={buttonStyle.button}>
                <img className={buttonStyle.buttonIcon} src={loadIcon} alt={"Load"}/>
            </button>
            {isVisible && <div className={style.inputContainer}>
                <input placeholder={"Enter board code"} className={`${typography.body2} ${style.input}`}/>
            </div>}
        </div>
    )
}

export default LoadButton