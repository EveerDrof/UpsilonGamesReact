import './styles/App.css';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loaders
import { Header } from './Header';
import { GamesList } from './GamesList';
import { Jumper } from './Jumper';
import { mainMenuGamesTopUrl, picturesUrl } from './constants';
import { gameRecord } from './GamesList'

function App() {
  const [showJumper, setShowJumper] = useState(false);
  const [mainMenuGamesRecords, setMainMenuGamesRecords]: any = useState();
  const handleScroll = (e: any) => {
    const body = e.srcElement.body;
    if (body) {
      if (body.getBoundingClientRect().bottom <= window.innerHeight + 100) {
        setShowJumper(true);
      } else {
        setShowJumper(false);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    fetch(mainMenuGamesTopUrl)
      .then((response) => response.json())
      .then((json) => {
        if (json) {
          json={data:json};
          json.data.forEach((game: any) => {
            let picUrl = picturesUrl + game.name + '/shortcut';
            console.log(picUrl);
            fetch(picUrl).then(response => response.blob()).then(blob => {
              game.imageBlob = URL.createObjectURL(blob);
              setMainMenuGamesRecords({...json as Array<gameRecord>});
            });
          });
        }
      });
  }, []);
  let carouselItems: JSX.Element[] = [
    <div
      key={1}
      style={{ backgroundImage: 'url(/pictures/hl.jpg)' }}
      className='carouselElement'
    >
      <h1>Скидки</h1>
      <button className='carouselButton'>Магазин</button>
    </div>,
    <div
      key={2}
      style={{ backgroundImage: 'url(/pictures/ds.jpg)' }}
      className='carouselElement'
    >
      <h1>Списки лучших игр</h1>
      <button className='carouselButton'>Посмотреть</button>
    </div>,
  ];
  let jumper = <></>;
  if (showJumper) {
    jumper = <Jumper />;
  }
  return (
    <div className='App'>
      <Header />
      <Carousel verticalSwipe='natural'>{carouselItems}</Carousel>
      {mainMenuGamesRecords !== undefined ?
      <GamesList gamesRecords={mainMenuGamesRecords.data} />:<></>
      }
      {jumper}
    </div>
  );
}

export default App;
