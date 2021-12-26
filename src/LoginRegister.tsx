import './styles/LoginRegister.css';
import { LoginRegisterForm } from './LoginRegisterForm';
export function LoginRegister({setCurrentView}:{setCurrentView:Function}) {
    return (
        <div id="login-register-box">
            <img id="left-picure" src='../pictures/auth.jpg' />
            <LoginRegisterForm setCurrentView={setCurrentView}/>
        </div>
    )

}