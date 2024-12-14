import React, {useEffect, useState} from 'react';
import './App.scss';
import Wait from './Components/Wait/Wait';
import DBAdapter from './Data/DatabaseAdapter';
import signout from './Resources/Images/signout.png';
import { useAppContext } from './OuterApp';
import { FadeInFromRight } from './Motion/PageNavigation';

export interface User {
  username?: string | null;
  name?: string | null;
}

function App() {
  const [working, setWorking] = useState<boolean>(false);
  const dbAdapter = DBAdapter();
  const { userData, appName, setUserData } = useAppContext();    

  useEffect(() => {
    //subtract 60000 - 1 minute
    const checkforTimeout = async () =>{
      const timeout = sessionStorage.getItem('session_timeout');

      if(timeout){
        const now = new Date().getTime();
        if(now>parseInt(timeout)-60000){ //within 1 minute of logout
          sessionStorage.removeItem('session_timeout');
          // eslint-disable-next-line react-hooks/exhaustive-deps
          const logout = await dbAdapter.logout();
          if(logout.status==='success'){
            window.location.reload();
            return;
          }
          setWorking(false);  
        }
      }
      setTimeout(checkforTimeout, 30000); // 5 minutes
    }

    const fetchData = async () => {
      try {
        checkforTimeout();
        
        const userData: Array<User> = await dbAdapter.fetchData('users', '');
        setUserData(userData[0]);
  
        setWorking(false);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    }
    fetchData();

  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(()=>{
    console.dir(userData);
  
    // we now have a valid user. kick off additional data loads
  }, [userData])
  
  return <FadeInFromRight>
      <div className="App">
        <header className="App-header">
          <h3>{appName} <small style={{fontSize: '50%'}}>- {userData?.name}</small></h3>
          <button className='SignOut' onClick={async ()=>{
              setWorking(true);
              setTimeout( async ()=>{
                const logout = await dbAdapter.logout();
                if(logout.status==='success'){
                  window.location.reload();
                  return;
                }
                setWorking(false);  
              }, 100);
              
            }} ><img alt='Sign Out' src={signout}/></button>
        </header>
        <div className="App-body">
            This is where you should start to add your custom application code. Add new components and pages to the src folder and start in App.tsx.
        </div>
      </div>
      <Wait spinner={true} active={working} />
  </FadeInFromRight>;
}

export default App;
