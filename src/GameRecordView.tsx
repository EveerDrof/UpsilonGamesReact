import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import {
  addToCartUrl,
  authGetHeader,
  gameInLibraryUrl,
  gamesUrl,
  markUrl,
  picturesUrl,
} from './constants';
import { FullGameRecord, GameRecord } from './utils';
import './styles/GameRecordView.css';
import './styles/App.css';

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ReviewsSection } from './ReviewsSection';
import { LoadingScreen } from './LoadingScreen';
import {
  darkColor,
  mainColor,
  secondaryColor,
  thirdColor,
} from './Colors/colors';

export function GameRecordView({
  gameRecord,
  setCurrentView,
}: {
  gameRecord: GameRecord;
  setCurrentView: Function;
}) {
  const [isLoaded, setIsLoaded]: [Boolean, Function] = useState(false);
  const [screeshotsBlobs, setScreeshotsBlobs]: [string[], Function] = useState(
    []
  );
  let [longGameData, setLongGameData]: [FullGameRecord | undefined, Function] =
    useState();
  const [fetchedUserMark, setFetchedUserMark]: [number, Function] =
    useState(-1);
  const [gameStatusInLibrary, setGameStatusInLibrary]: [string, Function] =
    useState('notInLibrary');
  let userMark = 0;
  let idsUrl = picturesUrl + gameRecord.name + '/screenshotIDs';
  function uploadAddGameToCartInfo() {
    fetch(`${addToCartUrl}?gameName=${gameRecord.name}`, {
      method: 'POST',
      headers: authGetHeader(),
    });
  }
  function fetchAndSetGameMark() {
    return fetch(`${markUrl}?gameId=${longGameData?.id}&userId=-1`)
      .then((data) => data.json())
      .then((mark) => {
        longGameData!.averageMark = mark;
        let newVar = { ...longGameData };
        setLongGameData(newVar);
        console.log('Setting');
        console.log(longGameData);
      })
      .then(() => true);
  }
  function sendMarkToServer(mark: number) {
    let url =
      markUrl +
      `?mark=${mark}&userId=${localStorage.getItem('userId')}&gameId=${
        longGameData?.id
      }`;
    return fetch(url, { method: 'POST', headers: authGetHeader() })
      .then(() => {
        fetchAndSetUserMark();
      })
      .then(() => true);
  }
  function fetchAndSetUserMark() {
    let url = `${markUrl}?gameId=${
      longGameData?.id
    }&userId=${localStorage.getItem('userId')}`;
    return fetch(url)
      .then((data) => data.json())
      .then((json) => {
        setFetchedUserMark(json);
        fetchAndSetGameMark();
      })
      .then(() => true);
  }
  function checkIfGameInLibrary() {
    console.log('Check if game in library');
    return fetch(`${gameInLibraryUrl}${gameRecord.name}`, {
      headers: authGetHeader(),
    })
      .then((response) => {
        if (response.status === 200) {
          setGameStatusInLibrary('inLibrary');
          return 'inLibrary';
        }
        return response.text();
      })
      .then((gameStatus) => {
        console.log('Game state', gameStatus);
        setGameStatusInLibrary(gameStatus);
      })
      .then(() => true);
  }
  function fetchLongData() {
    return fetch(gamesUrl + gameRecord.name + '/long', {})
      .then((data) => data.json())
      .then((json) => {
        longGameData = json;
        setLongGameData(json as FullGameRecord);
        longGameData!.id = json.id;
        fetchAndSetUserMark();
      })
      .then(() => true);
  }
  function fetchIds() {
    fetch(idsUrl, {})
      .then((response) => response.json())
      .then((data) => {
        for (let i = 0; i < data.length; i++) {
          fetch(picturesUrl + data[i].id)
            .then((response) => response.blob())
            .then((blob) => {
              let objectURL = URL.createObjectURL(blob);
              if (!screeshotsBlobs.includes(objectURL)) {
                screeshotsBlobs.push(objectURL);
                setScreeshotsBlobs([...screeshotsBlobs]);
              }
            });
        }
      })
      .then(() => true);
  }
  useEffect(() => {
    setIsLoaded(true);
    Promise.all([
      fetchLongData(),
      fetchIds(),
      fetchAndSetUserMark(),
      checkIfGameInLibrary(),
    ]).then(setIsLoaded(true));
  }, []);
  let screenshotsCarouselItems: JSX.Element[] = [];
  console.log(screeshotsBlobs);
  for (let i = 0; i < (screeshotsBlobs as []).length; i++) {
    let picUrl = screeshotsBlobs[i];
    screenshotsCarouselItems.push(
      <img key={i} src={picUrl} className='screenshot'></img>
    );
  }
  let buyingBtn;
  switch (gameStatusInLibrary) {
    case 'inLibrary':
      buyingBtn = (
        <button id='in-library-btn' style={{ backgroundColor: secondaryColor }}>
          In library
        </button>
      );
      break;
    case 'inCart':
      buyingBtn = <button id='in-cart-btn'>In cart</button>;
      break;
    default:
      buyingBtn = (
        <button
          id='buy-btn'
          onClick={() => {
            uploadAddGameToCartInfo();
            setGameStatusInLibrary('inCart');
          }}
        >
          Buy
        </button>
      );
      break;
  }
  console.log('Status', gameStatusInLibrary);
  let tagsList: JSX.Element[] = [];
  longGameData?.tags.forEach((tag) => {
    tagsList.push(
      <h4
        className='tag'
        style={{ backgroundColor: secondaryColor, color: darkColor }}
      >
        {tag.name}
      </h4>
    );
  });
  console.log('Bool is ', isLoaded);
  if (!isLoaded) {
    return <LoadingScreen />;
  }
  let discountFound = gameRecord.discountPrice != gameRecord.price;
  return (
    <div style={{ backgroundColor: thirdColor }}>
      <div id='top-info'>
        <div id='screenshots-carousel'>
          <Carousel verticalSwipe='natural' dynamicHeight={false}>
            {screenshotsCarouselItems}
          </Carousel>
        </div>
        <div id='right-info-column'>
          <h1>{gameRecord.name}</h1>
          <h1>
            Price : {gameRecord.discountPrice}{' '}
            {discountFound ? (
              <span
                style={{
                  textDecoration: 'line-through',
                  color: 'rgba(0, 0, 0, 0.5)',
                }}
              >
                {gameRecord.price}
              </span>
            ) : (
              <></>
            )}
          </h1>
          {localStorage.getItem('name') ? buyingBtn : <></>}
          <div id='mark-circle-bar'>
            {longGameData ? (
              <div>
                <CircularProgressbar
                  value={longGameData!.averageMark}
                  maxValue={100}
                  text={`${longGameData!.averageMark}`}
                  styles={buildStyles({
                    textColor: mainColor,
                    textSize: '35px',
                    pathColor: mainColor,
                  })}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
          {localStorage.getItem('password') ? (
            <div>
              {gameStatusInLibrary === 'inLibrary' ? (
                <>
                  <h1 id='your-mark-text'>
                    Your mark{' '}
                    {fetchedUserMark >= 0 ? fetchedUserMark : 'Rate this sgame'}
                  </h1>
                  <div id='mark-setter-column'>
                    <div id='mark-setter-line'>
                      <input
                        type={'range'}
                        onChange={(val) => {
                          userMark = parseInt(val.target.value);
                          document.getElementById('user-mark-text')!.innerHTML =
                            '' + userMark;
                        }}
                      />
                      <h1 id='user-mark-text'>{userMark}</h1>
                    </div>
                    <button
                      id='mark-setter-button'
                      style={{ backgroundColor: secondaryColor }}
                      onClick={() => {
                        sendMarkToServer(userMark);
                      }}
                    >
                      Upload mark
                    </button>
                  </div>
                </>
              ) : (
                <></>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
        <h2 style={{ textAlign: 'center' }}>Tags : </h2>
        <div id='tag-wrapper'>{tagsList}</div>
        {longGameData ? (
          <p id='description' style={{ backgroundColor: mainColor }}>
            Description : <br /> {longGameData.description}
          </p>
        ) : (
          <></>
        )}
      </div>{' '}
      {longGameData ? (
        <ReviewsSection
          game={longGameData}
          isGameInLibrary={gameStatusInLibrary === 'inLibrary'}
          setCurrentView={setCurrentView}
        />
      ) : (
        <></>
      )}
    </div>
  );
}
