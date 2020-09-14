/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import React from "react";
import typography from "../../res/theme/typograph.module.css"
import uploadIcon from "../../res/icons/upload.png"
import style from './Settings.module.css'

const colors = ["#7999ED", "#DD6363", "#79ED85", "#DBDD63",
    "#D679ED", "#DDA563", "#79E6ED", "#9263DD"]
const Settings = () => {
    //TODO: Get selected color from store
    return (
        <section className={style.settings}>
            <h3 className={style.header}>Pick background</h3>
            <section className={style.colors}>
                {colors.map((color, index) =>
                    (<article className={style.color} key={index} style={{
                        backgroundColor: color
                    }
                    }/>)
                )}
            </section>
            <button className={style.uploadButton}>
                Upload
                <img className={style.uploadButtonIcon} src={uploadIcon} alt={"Upload"}/>
            </button>
        </section>
    )
}

export default Settings