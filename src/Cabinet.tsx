import { useState } from "react";
import { CabinetView } from "./CabinetView";
import { LoginRegister } from "./LoginRegister";

export function Cabinet() {
    const [currentView, setCurrentView]: [Element | undefined, Function] = useState();
    if (!currentView) {
        let password = localStorage.getItem('password');
        if (password) {
            setCurrentView(<CabinetView />)
        } else {
            setCurrentView(<LoginRegister setCurrentView={setCurrentView}/>)
        }
    }
    return (
        <div style={{width:'100%',height:'100%'}}>
            {currentView}
        </div>)
}