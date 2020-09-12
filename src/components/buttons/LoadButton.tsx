/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import React from "react";
import buttonStyle from "./Button.module.css"
import loadIcon from "../../res/icons/load.png";

const LoadButton = ()=>{
    return (
        <button className={buttonStyle.button}>
            <img className={buttonStyle.buttonIcon} src={loadIcon} alt={"Load"}/>
        </button>
    )
}

export default LoadButton