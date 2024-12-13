import { createContext } from 'react';
import { User } from '../App';

interface AppContext {
  appName: string;
  setAppName: React.Dispatch<React.SetStateAction<string>>;
  userData: User;
  setUserData: React.Dispatch<React.SetStateAction<User>>;
}

const MyContext = createContext<AppContext | null>(null);

export default MyContext;