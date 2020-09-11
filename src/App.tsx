import React from 'react';
import logo from './res/icons/logo.png'
import style from './App.module.css'
import  './res/theme/colors.css'
import  './res/theme/typograph.css'

function App() {
    return (
        <main>
            <section className={style.titleBar}>
                <img className={style.logo} src={logo} alt={"Logo"}/>
                <h1 className={style.title}>React Kanban</h1>
            </section>
        </main>
    );
}

export default App;
