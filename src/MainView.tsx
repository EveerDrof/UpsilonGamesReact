import { useState, useEffect } from 'react';
import { GamesList } from './GamesList';
import { Jumper } from './Jumper';
import { getTextData, mainMenuGamesTopUrl, picturesUrl } from './constants';
import { Carousel } from 'react-responsive-carousel';
import {
  fetchAndSetSelectedGames,
  GameRecord,
  getIsMobile,
  loadGamewRecords as loadGameRecords,
} from './utils';
import { darkColor } from './Colors/colors';

export function MainView({ setCurrentView }: { setCurrentView: Function }) {
  const textData = getTextData();
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
  const isMobile = getIsMobile();
  let carouselItems: JSX.Element[] = [
    <div
      key={1}
      style={{ backgroundImage: isMobile ? '' : 'url(/pictures/hl.jpg)' }}
      className='carouselElement'
    >
      <h1
        className='carousel-header'
        style={{ color: isMobile ? darkColor : 'white' }}
      >
        {textData.main.sales}
      </h1>
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
      <h1
        className='carousel-header'
        style={{ color: isMobile ? darkColor : 'white' }}
      >
        {textData.main.topRatedGames}
      </h1>
      <GamesList setCurrentView={setCurrentView} gamesRecords={topRatedGames} />
    </div>,
  ];
  let jumper = <></>;
  if (showJumper) {
    jumper = <Jumper />;
  }

  return (
    <div className='App'>
      <div id='main-carousel'>
        <Carousel verticalSwipe='natural'>{carouselItems}</Carousel>
      </div>
      {mainMenuGamesRecords !== undefined ? (
        <GamesList
          gamesRecords={mainMenuGamesRecords}
          setCurrentView={setCurrentView}
        />
      ) : (
        <></>
      )}
      {jumper}
    </div>
  );
}
