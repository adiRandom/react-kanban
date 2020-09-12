/**
 * Created by Adrian Pascu at 12-Sep-20
 */

import React from "react";
import editIcon from "../../res/icons/edit.png"
import style from "./List.module.css"
import {ListModel} from "../../models/ListModel";
import typography from '../../res/theme/typograph.module.css'


const List = ({items, title, className}: ListModel & { className?: string }) => {

    //TODO: Pull state from redux


    return (
        <section className={`${style.list} ${className}`}>
            <header className={style.listHeader}>
                <h3 className={style.listTitle}>{title}</h3>
                <button className={style.listTitleEditButton}>
                    <img className={style.listTitleEditButtonIcon} src={editIcon} alt={"Edit"}/>
                </button>
            </header>
            <section className={style.items}>
                {items.map((item, index) => (
                    <article className={style.item} key={index}>
                        <p className={typography.body2}>{item.content}</p>
                    </article>
                ))}
            </section>
        </section>
    )
}

export default List;