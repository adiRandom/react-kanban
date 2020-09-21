/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import React, {useState} from "react";
import buttonStyle from "./Button.module.css"
import loadIcon from "../../res/icons/load.png";
import style from "./LoadButton.module.css"
import typography from '../../res/theme/typography.module.css'

const LoadButton = () => {

    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className={buttonStyle.buttonWrapper}>
            <button onClick={() => setIsVisible(!isVisible)} className={buttonStyle.button}>
                <img className={buttonStyle.buttonIcon} src={loadIcon} alt={"Load"}/>
            </button>
            {isVisible && <div className={style.inputContainer}>
                <input className={`${typography.body2} ${style.input}`}/>
            </div>}
        </div>
    )
}

export default LoadButton