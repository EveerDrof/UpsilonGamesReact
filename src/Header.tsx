import { useEffect, useState } from 'react';
import { Cabinet } from './Cabinet';
import { gamesUrl, searchGameUrl } from './constants';
import { LoginRegister } from './LoginRegister';
import { MainView } from './MainView';
import './styles/Header.css';
import { GameRecord, removeUserStorageData } from './utils';
import Select, { InputActionMeta, SingleValue } from 'react-select';
import { GameRecordView } from './GameRecordView';
import { LoadingScreen } from './LoadingScreen';
import { SearchView } from './SearchView';
import { darkColor, secondaryColor } from './Colors/colors';

const advancedSearchName = 'Advanced Search';

export function Header({ setCurrentView }: { setCurrentView: Function }) {
  let [searchGamesNames, setSearchGamesNames]: [
    { key: string; value: string; label: string }[],
    Function
  ] = useState([]);
  function getSearchData(namePart: string) {
    let url =
      `${searchGameUrl}?tags=&maxPrice=999999&minPrice=-1&minMark=-2&namePart=${namePart}` +
      `&minDiscountPercent=-2&sortType=`;
    fetch(url)
      .then((data) => data.json())
      .then((json) => {
        searchGamesNames = [];
        searchGamesNames.push({
          key: advancedSearchName,
          value: advancedSearchName,
          label: advancedSearchName,
        });
        if (json) {
          if (json.length >= 0) {
            json.forEach((val: GameRecord) => {
              searchGamesNames.push({
                key: val.name,
                value: val.name,
                label: val.name,
              });
            });
          }
        }
        console.log('Data for search', searchGamesNames);

        setSearchGamesNames([...searchGamesNames]);
      });
  }
  useEffect(() => {
    getSearchData('');
  }, []);
  function logout() {
    removeUserStorageData();
    setCurrentView(<LoginRegister setCurrentView={setCurrentView} />);
  }
  const selectStyles = {
    control: (base: any) => ({
      ...base,
      fontSize: '2.5vh',
    }),
    menu: (base: any) => ({
      ...base,
      fontSize: '2.5vh',
    }),
  };
  return (
    <div id='header' style={{ backgroundColor: secondaryColor }}>
      <button className='header-btn' style={{ color: darkColor }}>
        <svg
          width='24'
          height='31'
          viewBox='0 0 24 31'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M15.994 0L4.12148 15L5.15935 20L9.12148 22.5L15.1215 20.5L23.1215 4L20.6215 23L7.03335e-06 30.5L0.62149 10L15.994 0Z'
            fill='white'
          />
        </svg>
      </button>
      <button
        style={{ color: darkColor }}
        className='header-btn'
        onClick={() => {
          setCurrentView(<MainView setCurrentView={setCurrentView} />);
        }}
      >
        Main
      </button>
      <div className='header-search-field'>
        <Select
          styles={selectStyles}
          placeholder={'Search'}
          options={searchGamesNames}
          onInputChange={(newValue: string, actionMeta: InputActionMeta) => {
            if (newValue) {
              if (newValue === advancedSearchName) {
                setCurrentView(<SearchView setCurrentView={setCurrentView} />);
              } else {
                getSearchData(newValue);
              }
            }
          }}
          onChange={(
            newValue: SingleValue<{ key: string; value: string; label: string }>
          ) => {
            if (newValue) {
              if (newValue.label === advancedSearchName) {
                setCurrentView(<SearchView setCurrentView={setCurrentView} />);
              } else {
                fetch(`${gamesUrl}${newValue?.value}/short`)
                  .then((data) => data.json())
                  .then((json) => {
                    setCurrentView(<LoadingScreen />);
                    setCurrentView(
                      <GameRecordView
                        gameRecord={{ ...json }}
                        setCurrentView={setCurrentView}
                      />
                    );
                  });
              }
            }
          }}
        />
      </div>
      <button
        style={{ color: darkColor }}
        className='header-btn'
        onClick={() => {
          setCurrentView(<Cabinet />);
        }}
      >
        Cabinet
      </button>
      {localStorage.getItem('password') ? (
        <button
          className='header-btn'
          onClick={logout}
          style={{ color: darkColor }}
        >
          Logout
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
