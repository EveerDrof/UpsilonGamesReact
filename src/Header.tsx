import ReactSearchBox from 'react-search-box';
import { Cabinet } from './Cabinet';
import { LibraryView } from './LibraryView';
import { LoginRegister } from './LoginRegister';
import { MainView } from './MainView';
import './styles/Header.css';
export function Header({ setCurrentView }: { setCurrentView: Function }) {
  function logout() {
    localStorage.removeItem('password');
    localStorage.removeItem('name');
    setCurrentView(<LoginRegister setCurrentView={setCurrentView} />)
  }
  return <div id='header'>
    <button className='header-btn'>Burger</button>
    <button className='header-btn'>Select city</button>
    <button className='header-btn'>Logo</button>
    <button className='header-btn' onClick={() => {
      setCurrentView(<MainView setCurrentView={setCurrentView} />)
    }}>Main</button>
    <div className='header-search-field'>
      <ReactSearchBox
        placeholder={'Search'}
        data={[]}
        onSelect={() => { console.log('aaa') }}
        onChange={function (value: string): void {
          console.log()
        }}
      />
    </div>
    <button className='header-btn'>Wishlist</button>
    <button className='header-btn' onClick={() => {setCurrentView(<LibraryView setCurrentView={setCurrentView}/>)}} >Library</button>
    <button className='header-btn' onClick={() => {setCurrentView(<Cabinet />) }}>Cabinet</button>
    {localStorage.getItem('password') ? <button className='header-btn' onClick={logout}>Logout</button> : <></>}
  </div>;
}
