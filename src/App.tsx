import './styles/App.css';
import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loaders
import { Cabinet } from './Cabinet';
import { MainView } from './MainView';
import { Header } from './Header';

function App() {
  const [currentView,setCurrentView] : [Element | null,Function] = useState(null);
  useEffect(()=>{
    setCurrentView(<MainView setCurrentView={setCurrentView}/>);
  },[]);
  return (
    <div className='App'>
      <Header setCurrentView={setCurrentView}/>
      {currentView}
    </div>
  );
}

export default App;
