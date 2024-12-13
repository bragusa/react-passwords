import React, { useContext, useEffect, useRef, useState } from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';
import DBAdapter from '../../Data/DatabaseAdapter';
import './Login.scss';
import Wait from '../../Components/Wait/Wait';
import EyeShow from '../../Resources/Images/eye-password-show.svg';
import EyeHide from '../../Resources/Images/eye-password-hide.svg';
import AppContext from '../../Data/Context';
import Strings from '../../Resources/Strings';
import { useAppContext } from '../../OuterApp';

interface LoginProps {
  setAuth: React.Dispatch<React.SetStateAction<{ username: string; } | null>>;
}

const Login: React.FC<LoginProps> = ({ setAuth }) => {
  const { setAppName } = useAppContext();
  const { setIsAuthorized } = useAuth();
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const loginForm = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate(); // Hook for navigation
  const dbAdapter = DBAdapter();
  const [working, setWorking] = useState<boolean>(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigateToApp = (expiration: number | null) => {
    setIsAuthorized(true); // Save auth data to context
    if(expiration){
      sessionStorage.setItem('session_timeout', expiration+'');
    }
    navigate('/');
  };

  const checkForCookie = async ()=>{
    setWorking(true);
    setTimeout(async()=>{
      const auth = await dbAdapter.checkForCookie();
      if(auth.status==='success'){
        navigateToApp(null);
        return;
      }
      setWorking(false);
      if(loginForm.current){
        loginForm.current.style.opacity='1';
      }
    }, 500)
  }

  useEffect(()=>{ 
    checkForCookie();

    fetch('/secure/manifest.json')
    .then((response) => response.json())
    .then((data) => {setAppName(data.short_name)})
    .catch((error) => console.error('Error fetching manifest:', error));
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { username, password } = formData;

    if (!username || !password) {
      //setErrorMessage('Both fields are required.');
      return;
    }

    const auth = await dbAdapter.authenticateUser(username,password);

    if(auth.status === 'failed'){
      setErrorMessage('Invalid username or password.');
      return;
    }
    navigateToApp(auth.expires);
  };

  const appContext = useContext(AppContext);
  const protocol = window.location.protocol;
  
  return ( 
    <>
      <div className='Login-background'></div>
      <div className='Login' ref={loginForm}>
        {protocol === 'http:' ? <h2>{Strings.get('https_require')}</h2>:<>
        <h2>Welcome to {appContext?.appName}</h2>
        <h4 className='Login-heading'>
          {Strings.get('enter_your_credentials')}
        </h4>
        {/* <h2>Login</h2> */}
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleChange}
            autoCapitalize='off'
            autoComplete='username'
            maxLength={12}
          />
          <div className='Login-password'>
            <input
              type={showPassword?'text':'password'}
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleChange}
              maxLength={12}
            /><button style={{visibility: 'hidden', height: '1px'}} type='submit'>Login</button>
            <button className='Eye' onClick={(evt)=>{ evt.preventDefault(); setShowPassword(prev=>!prev)}}><img alt={Strings.get('show_password')} src={showPassword?EyeHide:EyeShow}/></button>
          </div>
          <button style={{float: 'left'}} type='submit'>{Strings.get('sign_in')}</button>
        </form></>}
      </div>
      {errorMessage && <p className='Error'>{errorMessage}</p>}
      <Wait spinner={true} active={working}/>
    </>
  );
};

export default Login;
