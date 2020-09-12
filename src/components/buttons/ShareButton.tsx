/**
 * Created by Adrian Pascu at 12-Sep-20
 */

/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import React from "react";
import buttonStyle from "./Button.module.css"
import shareIcon from "../../res/icons/share.png";

const ShareButton = ()=>{
    return (
        <button className={buttonStyle.button}>
            <img className={buttonStyle.buttonIcon} src={shareIcon} alt={"Load"}/>
        </button>
    )
}

export default ShareButton