/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import React, {useEffect, useState} from "react";
import loadingIcon from '../../res/icons/loading-status.gif'
import doneIcon from "../../res/icons/done-status.png"
import style from "./Status.module.css"
import typography from '../../res/theme/typography.module.css'
import CSSTransition from "react-transition-group/CSSTransition";
import "../../res/animations/RevealAnimation.css"
import ANIMATIONS from "../../res/animations/Animations";

const Status = () => {
    //TODO: Get state from redux
    const isLoading = false


    // Display the saved badge
    const [savingInProgress, setSavingInProgress] = useState(false)
    const [showBadge, setShowBadge] = useState(false)
    useEffect(() => {
        if (isLoading)
            setSavingInProgress(true)
        else if (savingInProgress) {
            setShowBadge(true)
            setSavingInProgress(false)
        }
    }, [isLoading])

    useEffect(() => {
        if (showBadge) {
            setTimeout(() => setShowBadge(false), 1000)
        }
    }, [showBadge])


    return (
        <div className={style.wrapper}>
            <div className={style.iconWrapper}>
                <img src={isLoading ? loadingIcon : doneIcon} alt={"Save status"} className={style.status}/>
            </div>
            <CSSTransition timeout={100} classNames={ANIMATIONS.revealAnimation} mountOnEnter unmountOnExit in={showBadge}>
                <div className={`${typography.body1} ${style.badge}`}>Saved</div>
            </CSSTransition>
        </div>
    )
}

export default Status