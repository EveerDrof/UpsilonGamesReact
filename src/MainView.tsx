import { useState, useEffect } from 'react';
import { GamesList } from './GamesList';
import { Jumper } from './Jumper';
import { mainMenuGamesTopUrl, picturesUrl } from './constants';
import { Carousel } from 'react-responsive-carousel';
import {
  fetchAndSetSelectedGames,
  GameRecord,
  loadGamewRecords as loadGameRecords,
} from './utils';

export function MainView({ setCurrentView }: { setCurrentView: Function }) {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [showJumper, setShowJumper] = useState(false);
  const [mainMenuGamesRecords, setMainMenuGamesRecords]: any = useState();
  const [discountedGames, setDiscountedGames]: [GameRecord[], Function] =
    useState([]);
  const [topRatedGames, setTopRatedGames]: [GameRecord[], Function] = useState(
    []
  );
  const handleScroll = (e: any) => {
    const body = e.srcElement.body;
    if (body) {
      if (body.getBoundingClientRect().bottom <= window.innerHeight * 2) {
        setShowJumper(true);
      } else {
        setShowJumper(false);
      }
    }
  };

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
    window.addEventListener('scroll', handleScroll);
    loadGameRecords(mainMenuGamesTopUrl, setMainMenuGamesRecords, null);
    fetchAndSetSelectedGames(setDiscountedGames, {
      minDiscountPercent: 1,
      sortType: 'discount',
    });
    fetchAndSetSelectedGames(setTopRatedGames, {
      sortType: 'mark',
    });
  }, []);
  let carouselItems: JSX.Element[] = [
    <div
      key={1}
      style={{ backgroundImage: isMobile ? '' : 'url(/pictures/hl.jpg)' }}
      className='carouselElement'
    >
      <h1 className='carousel-header'>Discounts</h1>
      <GamesList
        setCurrentView={setCurrentView}
        gamesRecords={discountedGames}
      />
    </div>,
    <div
      key={2}
      style={{ backgroundImage: isMobile ? '' : 'url(/pictures/ds.jpg)' }}
      className='carouselElement'
    >
      <h1 className='carousel-header'>Top rated games</h1>
      <GamesList setCurrentView={setCurrentView} gamesRecords={topRatedGames} />
    </div>,
  ];
  let jumper = <></>;
  if (showJumper) {
    jumper = <Jumper />;
  }

  return (
    <div className='App'>
      <Carousel verticalSwipe='natural'>{carouselItems}</Carousel>
      {mainMenuGamesRecords !== undefined ? (
        <GamesList
          gamesRecords={mainMenuGamesRecords}
          setCurrentView={setCurrentView}
          isShowingAnimations={true}
        />
      ) : (
        <></>
      )}
      {jumper}
    </div>
  );
}
