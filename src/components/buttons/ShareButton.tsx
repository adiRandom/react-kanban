/**
 * Created by Adrian Pascu at 12-Sep-20
 */


import React, {useEffect, useState} from "react";
import buttonStyle from "./Button.module.css"
import shareIcon from "../../res/icons/share.png";
import typography from '../../res/theme/typograph.module.css'
import style from './ShareButton.module.css'
import {CSSTransition} from "react-transition-group";
import "../../res/animations/MessageAnimation.css"
import {useSelector} from "react-redux";
import {Store} from "../../store/Store"
import ANIMATIONS from "../../res/animations/Animations";

const SHARE_MESSAGE_WITH_CLIPBOARD = "Board code copied to clipboard"
const SHARE_MESSAGE_NO_CLIPBOARD = (id: string) => `Share this code: ${id}`

const ShareButton = () => {

    const [isVisible, setIsVisible] = useState(false)
    const boardId = useSelector<Store>(state => state.board.id) as string
    const [message, setMessage] = useState(SHARE_MESSAGE_WITH_CLIPBOARD)

    //After the message is visible, make it disappear after a short period

    useEffect(() => {
        if (isVisible)
            setTimeout(() => setIsVisible(false), 2000)
    })

    function share() {
        navigator.permissions.query({name: "clipboard-write" as any}).then(result => {
            if (result.state === "granted" || result.state === "prompt") {
                navigator.clipboard.writeText(boardId)
                setMessage(SHARE_MESSAGE_WITH_CLIPBOARD)
                setIsVisible(true)
            } else {
                setMessage(SHARE_MESSAGE_NO_CLIPBOARD(boardId))
                setIsVisible(true)
            }
        })
    }

    return (
        <div className={buttonStyle.buttonWrapper}>
            <button onClick={share} className={buttonStyle.button}>
                <img className={buttonStyle.buttonIcon} src={shareIcon} alt={"Load"}/>
            </button>
            <CSSTransition in={isVisible} timeout={500} classNames={ANIMATIONS.messageAnimation} unmountOnExit mountOnEnter>
                <article className={style.message}>
                    <p className={typography.body1}>{message}</p>
                </article>
            </CSSTransition>
        </div>
    )
}

export default ShareButton