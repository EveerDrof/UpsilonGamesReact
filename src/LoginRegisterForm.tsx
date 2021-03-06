import { useState } from 'react';
import { CabinetView } from './CabinetView';
import { mainColor, thirdColor } from './Colors/colors';
import {
  authGetHeader,
  getTextData,
  usersGetLoggedUserDataUrl,
  usersRegisterUrl,
} from './constants';
import './styles/LoginRegisterForm.css';
import { removeUserStorageData } from './utils';
export function LoginRegisterForm({
  setCurrentView,
}: {
  setCurrentView: Function;
}) {
  function onBtnFormSwtiecherClick(event: any) {
    if (event.target.id === 'register-btn') {
      setFormType('register');
    } else {
      setFormType('login');
    }
  }
  function fetchUserDataAndSetLocalStorage(name: string, password: string) {
    localStorage.setItem('name', name);
    localStorage.setItem('password', password);
    fetch(usersGetLoggedUserDataUrl, {
      method: 'GET',
      headers: authGetHeader(),
    })
      .then((response) => {
        if (response.status == 200) {
          setCurrentView(<CabinetView setCurrentView={setCurrentView} />);
        } else {
          removeUserStorageData();
          alert('Wrong user name or password');
        }
        return response.json();
      })
      .then((json) => {
        localStorage.setItem('userId', json.id);
      });
  }
  function sendCredentialsToServer() {
    let name = (document.getElementById('nameInput') as HTMLInputElement).value;
    let password = (
      document.getElementById('passwordInput') as HTMLInputElement
    ).value;
    let payload = JSON.stringify({ name, password });
    if (formType === 'register') {
      let repeatedPassword = (
        document.getElementById('repeatPasswordInput') as HTMLInputElement
      ).value;
      if (repeatedPassword !== password) {
        alert(`Passwords didn't match`);
        return;
      }
      fetch(usersRegisterUrl, {
        method: 'POST',
        body: payload,
        headers: { 'Content-Type': 'application/json' },
      }).then((response) => {
        if (response.status == 201) {
          fetchUserDataAndSetLocalStorage(name, password);
        } else {
          response.text().then((text) => alert(text));
        }
      });
    } else {
      fetchUserDataAndSetLocalStorage(name, password);
    }
  }
  const textData = getTextData().auth;
  const [formType, setFormType]: [string, Function] = useState('login');
  return (
    <div id='login-register-form'>
      <div id='form-switcher'>
        <button
          id='register-btn'
          style={{ backgroundColor: mainColor }}
          className={formType === 'register' ? 'active-form-btn' : 'switch-btn'}
          onClick={onBtnFormSwtiecherClick}
        >
          {textData.register}
        </button>
        <button
          style={{ backgroundColor: mainColor }}
          onClick={onBtnFormSwtiecherClick}
          id='login-btn'
          className={formType === 'login' ? 'active-form-btn' : 'switch-btn'}
        >
          {textData.login}
        </button>
      </div>
      <div id='form'>
        <h4 className='label'>{textData.userName}</h4>
        <input id='nameInput' />
        <h4 className='label'>{textData.password}</h4>
        <input id='passwordInput' type={'password'} />
        {formType === 'register' ? (
          <>
            <h4 className='label'>{textData.repeatPassword}</h4>
            <input id='repeatPasswordInput' type={'password'} />
          </>
        ) : (
          <></>
        )}
      </div>
      <button onClick={sendCredentialsToServer}>{textData.send}</button>
    </div>
  );
}
