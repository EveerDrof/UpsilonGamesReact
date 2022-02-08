import './styles/App.css';
import { useEffect, useState } from 'react';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loaders
import { MainView } from './MainView';
import { Header } from './Header';
import { mainColor, secondaryColor, thirdColor } from './Colors/colors';

function App() {
  const [currentView, setCurrentView]: [Element | null, Function] =
    useState(null);

  useEffect(() => {
    setCurrentView(<MainView setCurrentView={setCurrentView} />);
  }, []);
  return (
    <div className='App' style={{ backgroundColor: mainColor }}>
      <Header setCurrentView={setCurrentView} />
      {currentView}
    </div>
  );
}

export default App;
