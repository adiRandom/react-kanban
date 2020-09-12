import React from 'react';
import logo from './res/icons/logo.png'
import style from './App.module.css'
import './res/theme/colors.css'
import './res/theme/typograph.css'
import SettingsButton from "./components/buttons/SettingsButton";
import LoadButton from "./components/buttons/LoadButton";
import ShareButton from "./components/buttons/ShareButton";
import Status from "./components/status/Status";

function App() {
    return (
        <main>
            <section className={style.titleBar}>
                <img className={style.logo} src={logo} alt={"Logo"}/>
                <h1 className={style.title}>React Kanban</h1>
            </section>
            <section className={style.buttonsSection}>
                <SettingsButton/>
                <LoadButton/>
                <ShareButton/>
                <Status/>
            </section>
        </main>
    );
}

export default App;
