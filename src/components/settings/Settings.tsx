/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import React, {SyntheticEvent, useRef} from "react";
import uploadIcon from "../../res/icons/upload.png"
import style from './Settings.module.css'
import ANIMATIONS from "../../res/animations/Animations";
import CSSTransition from "react-transition-group/CSSTransition";
import "../../res/animations/RevealAnimation.css"
import COLORS from "../../res/theme/BackgroundColors";
import {useDispatch} from "react-redux";
import {BoardAction, syncToBackend} from "../../actions/BoardActions";
import {BackgroundType} from "../../store/Store";
import ReactKanbanApi from "../../api/ReactKanbanApi";


type SettingsProps = {
    isVisible: boolean
}

const Settings = ({isVisible}: SettingsProps) => {

    const dispatch = useDispatch()
    const fileInput = useRef<HTMLInputElement>(null)

    function changeBackgroundColor(color: string) {
        dispatch({
            type: 'CHANGE_BACKGROUND',
            payload: {
                backgroundType: BackgroundType.COLOR,
                background: color
            }
        } as BoardAction)

        const api = ReactKanbanApi.getInstance()
        dispatch(syncToBackend(api?.changeBackgroundColor,color))
    }

    function displayFilePicker() {
        fileInput.current?.click()
    }

    function uploadBackgroundImage(e: SyntheticEvent<HTMLInputElement>) {
        const file = (e.target as HTMLInputElement).files?.item(0)
        if (file) {
            const url = URL.createObjectURL(file)
            dispatch({
                type: "CHANGE_BACKGROUND",
                payload: {
                    background: url,
                    backgroundType: BackgroundType.IMAGE
                }
            } as BoardAction)
            const api = ReactKanbanApi.getInstance()
            dispatch(syncToBackend(api?.changeBackgroundImage,file))
        }
    }

    return (
        <CSSTransition timeout={100} classNames={ANIMATIONS.revealAnimation} in={isVisible} mountOnEnter unmountOnExit>
            <section className={style.settings}>
                <h3 className={style.header}>Pick background</h3>
                <section className={style.colors}>
                    {COLORS.map((color, index) =>
                        (<article className={style.color} key={index} style={{
                            backgroundColor: color
                        }
                        } onClick={() => changeBackgroundColor(color)}/>)
                    )}
                </section>
                <button className={style.uploadButton} onClick={displayFilePicker}>
                    Upload
                    <img className={style.uploadButtonIcon} src={uploadIcon} alt={"Upload"}/>
                    <input onChange={uploadBackgroundImage} type='file' ref={fileInput} className={style.fileInput} accept={"image/*"}/>
                </button>
            </section>
        </CSSTransition>
    )
}

export default Settings