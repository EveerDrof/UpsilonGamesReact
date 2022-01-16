import { useEffect, useState } from 'react';
import { Cabinet } from './Cabinet';
import { gamesUrl, searchGameUrl } from './constants';
import { LibraryView } from './LibraryView';
import { LoginRegister } from './LoginRegister';
import { MainView } from './MainView';
import './styles/Header.css';
import { GameRecord, removeUserStorageData } from './utils';
import Select, { InputActionMeta, SingleValue } from 'react-select';
import { GameRecordView } from './GameRecordView';
import { LoadingScreen } from './LoadingScreen';
import { SearchView } from './SearchView';

const advancedSearchName = 'Advanced Search';

export function Header({ setCurrentView }: { setCurrentView: Function }) {
  let [searchGamesNames, setSearchGamesNames]: [
    { key: string; value: string; label: string }[],
    Function
  ] = useState([]);
  function getSearchData(namePart: string) {
    let url = `${searchGameUrl}?tags=&maxPrice=999999&minPrice=-1&minMark=0&namePart=${namePart}`;
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
          json.forEach((val: GameRecord) => {
            searchGamesNames.push({
              key: val.name,
              value: val.name,
              label: val.name,
            });
          });
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
  return (
    <div id='header'>
      <button className='header-btn'>Logo</button>
      <button className='header-btn'>Select city</button>
      <button
        className='header-btn'
        onClick={() => {
          setCurrentView(<MainView setCurrentView={setCurrentView} />);
        }}
      >
        Main
      </button>
      <div className='header-search-field'>
        <Select
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
      <button className='header-btn'>Wishlist</button>
      <button
        className='header-btn'
        onClick={() => {
          setCurrentView(<LibraryView setCurrentView={setCurrentView} />);
        }}
      >
        Library
      </button>
      <button
        className='header-btn'
        onClick={() => {
          setCurrentView(<Cabinet />);
        }}
      >
        Cabinet
      </button>
      {localStorage.getItem('password') ? (
        <button className='header-btn' onClick={logout}>
          Logout
        </button>
      ) : (
        <></>
      )}
    </div>
  );
}
