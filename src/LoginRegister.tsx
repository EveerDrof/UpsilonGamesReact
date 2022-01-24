import './styles/LoginRegister.css';
import { LoginRegisterForm } from './LoginRegisterForm';
import { mainColor } from './Colors/colors';
export function LoginRegister({
  setCurrentView,
}: {
  setCurrentView: Function;
}) {
  return (
    <div
      id='login-register-box'
      style={{ backgroundImage: `url(/pictures/auth2.2.jpg)` }}
    >
      <LoginRegisterForm setCurrentView={setCurrentView} />
    </div>
  );
}
