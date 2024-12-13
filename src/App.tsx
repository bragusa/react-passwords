import React, {useContext, useState} from 'react';
import './App.scss';
import Wait from './Components/Wait/Wait';
import DBAdapter from './Data/DatabaseAdapter';
import signout from './Resources/Images/signout.png';
import AppContext from './Data/Context'

function App() {
  const [working, setWorking] = useState<boolean>(false);
  const dbAdapter = DBAdapter();
  const appContext = useContext(AppContext);
  return <>
    <div className="App">
      <header className="App-header">
        <h3>{appContext?.appName}</h3>
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

      </div>
    </div>
    <Wait spinner={true} active={working} />
  </>;
}

export default App;
