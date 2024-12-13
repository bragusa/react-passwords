import { createContext } from 'react';

interface AppContext {
  appName: string
}

const MyContext = createContext<AppContext | null>(null);

export default MyContext;