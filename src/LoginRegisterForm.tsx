import { useState } from "react";
import { CabinetView } from "./CabinetView";
import { usersGetLoggedUserDataUrl, usersRegisterUrl } from "./constants";
import "./styles/LoginRegisterForm.css";
export function LoginRegisterForm({ setCurrentView }: { setCurrentView: Function }) {
    function onBtnFormSwtiecherClick(event: any) {
        if (event.target.id === 'register-btn') {
            setFormType('register');
        } else {
            setFormType('login');
        }
    }
    function sendCredentialsToServer() {
        let name = (document.getElementById('nameInput') as HTMLInputElement).value;
        let password = (document.getElementById('passwordInput') as HTMLInputElement).value;
        let payload = JSON.stringify({ name, password });
        console.log(payload);
        if (formType === 'register') {
            let repeatedPassword = (document.getElementById('repeatPasswordInput') as HTMLInputElement).value;
            if (repeatedPassword !== password) {
                alert(`Passwords didn't match`);
                return;
            }
            fetch(usersRegisterUrl, {
                method: 'POST', body: payload,
                headers: { 'Content-Type': 'application/json' }
            }).then(response => {
                if (response.status == 201) {
                    localStorage.setItem('name', name);
                    localStorage.setItem('password', password);
                    setCurrentView(<CabinetView />);
                }
            })
        } else {
            fetch(usersGetLoggedUserDataUrl, {
                method: 'GET',
                headers: { 'Authorization': 'Basic ' + btoa(`${name}:${password}`) }
            }).then(
                response => {
                    if (response.status == 200) {
                        localStorage.setItem('name', name);
                        localStorage.setItem('password', password);
                        setCurrentView(<CabinetView />);
                    } else {
                        alert('Wrong user name or password');
                    }
                }
            )

        }
    }
    const [formType, setFormType]: [string, Function] = useState('login');
    return (
        <div id='login-register-form'>
            <div id='form-switcher'>
                <button id='register-btn'
                    className={formType === 'register' ? 'active-form-btn' : 'switch-btn'}
                    onClick={onBtnFormSwtiecherClick}
                >Register</button>
                <button
                    onClick={onBtnFormSwtiecherClick}
                    id='login-btn'
                    className={formType === 'login' ? 'active-form-btn' : 'switch-btn'}
                >Login</button>
            </div>
            <div id="form">
                <h4 className="label">User name</h4>
                <input id='nameInput' />
                <h4 className="label">Pasword</h4>
                <input id='passwordInput' type={'password'} />
                {formType === 'register' ? <>
                    <h4 className="label">Repeat Password</h4>
                    <input id='repeatPasswordInput' type={"password"} />
                </> : <></>}
            </div>
            <button onClick={sendCredentialsToServer}>Send</button>
        </div>
    );
}