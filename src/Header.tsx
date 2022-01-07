import { useState } from 'react';
import ReactSearchBox from 'react-search-box';
import { Cabinet } from './Cabinet';
import { searchGameUrl } from './constants';
import { LibraryView } from './LibraryView';
import { LoginRegister } from './LoginRegister';
import { MainView } from './MainView';
import './styles/Header.css';
import { GameRecord } from './utils';
export function Header({ setCurrentView }: { setCurrentView: Function }) {

  const [searchData, setSearchData]: [GameRecord[], Function] = useState([]);
  let [searchGamesNames, setSearchGamesNames]: [{key: string, value: string }[], Function]
    = useState([]);
  function getSearchData(namePart: string) {
    let url = `${searchGameUrl}?tags=&maxPrice=999999&minPrice=-1&minMark=0&namePart=${namePart}`;
    fetch(url).then(data => data.json()).then(json => {
      setSearchData({ ...json });
      searchGamesNames=[];
      if (json) {
        json.forEach((val: GameRecord) => {
          searchGamesNames.push({ key: val.name, value: val.name });
        });
      }
      console.log('Data for search', searchGamesNames);
      setSearchGamesNames([...searchGamesNames]);
    });
  }
  function logout() {
    localStorage.removeItem('password');
    localStorage.removeItem('name');
    setCurrentView(<LoginRegister setCurrentView={setCurrentView} />)
  }
  return <div id='header'>
    <button className='header-btn'>Logo</button>
    <button className='header-btn'>Select city</button>
    <button className='header-btn' onClick={() => {
      setCurrentView(<MainView setCurrentView={setCurrentView} />)
    }}>Main</button>
    <div className='header-search-field'>
      <ReactSearchBox
        placeholder={'Search'}
        data={searchGamesNames}
        onChange={
          (val: string) => {
            getSearchData(val);
          }
        }
        onSelect={() => { }}
      />
    </div>
    <button className='header-btn'>Wishlist</button>
    <button className='header-btn' onClick={() => { setCurrentView(<LibraryView setCurrentView={setCurrentView} />) }} >Library</button>
    <button className='header-btn' onClick={() => { setCurrentView(<Cabinet />) }}>Cabinet</button>
    {localStorage.getItem('password') ? <button className='header-btn' onClick={logout}>Logout</button> : <></>}
  </div>;
}
