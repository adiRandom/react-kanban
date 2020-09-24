/**
 * Created by Adrian Pascu at 11-Sep-20
 */

import React, {useState} from 'react'
import settingsIcon from '../../res/icons/settings.png'
import buttonStyle from './Button.module.css'
import Settings from "../settings/Settings";
import {useDispatch, useSelector} from "react-redux";
import {Store} from "../../store/Store";
import {DialogType} from "../../models/Dialog";
import {DialogAction} from "../../actions/DialogActions";


const SettingsButton = () => {

    const dispatch = useDispatch()
    const isVisible = useSelector<Store>(state => state.dialog.type === DialogType.SETTINGS) as boolean

    // Prevent dialog disposal when clicking inside the dialog
    function preventClickPropagation(e: MouseEvent) {
        e.stopPropagation()
    }

    function requestDialog() {
        dispatch({
            payload: DialogType.SETTINGS,
            type: "SHOW_DIALOG"
        } as DialogAction)
    }

    return (
        <div className={buttonStyle.buttonWrapper} onClick={e => preventClickPropagation(e as any)}>
            <button className={buttonStyle.button} onClick={requestDialog}>
                <img className={buttonStyle.buttonIcon} src={settingsIcon} alt={"Settings"}/>
            </button>
            <Settings isVisible={isVisible}/>
        </div>
    )
}

export default SettingsButton;