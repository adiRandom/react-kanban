/**
 * Created by Adrian Pascu at 11-Sep-20
 */

import React, {useState} from 'react'
import settingsIcon from '../../res/icons/settings.png'
import buttonStyle from './Button.module.css'
import Settings from "../settings/Settings";

const SettingsButton = () => {

    const [isMenuVisible, setIsMenuVisible] = useState(false)

    return (
        <div className={buttonStyle.buttonWrapper}>
            <button className={buttonStyle.button} onClick={() => setIsMenuVisible(!isMenuVisible)}>
                <img className={buttonStyle.buttonIcon} src={settingsIcon} alt={"Settings"}/>
            </button>
            {isMenuVisible && <Settings/>}
        </div>
    )
}

export default SettingsButton;