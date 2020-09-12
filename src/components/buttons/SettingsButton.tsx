/**
 * Created by Adrian Pascu at 11-Sep-20
 */

import React from 'react'
import settingsIcon from '../../res/icons/settings.png'
import buttonStyle from './Button.module.css'

const SettingsButton = () => {
    return (
        <button className={buttonStyle.button}>
            <img className={buttonStyle.buttonIcon} src={settingsIcon} alt={"Settings"}/>
        </button>
    )
}

export default SettingsButton;