import ReactSearchBox from 'react-search-box';
import './styles/Header.css';
export function Header() {
  return <div id='header'>
    <h2>Burger</h2>
    <h2>Select city</h2>
    <h2>Logo</h2>
    <ReactSearchBox 
      placeholder={'Search'} 
      data={[]}
      onSelect={() => { console.log('aaa') }} 
      onChange={function (value: string): void {
        console.log()
      }} 
    />
    <h2>Wishlist</h2>
    <h2>Cart</h2>
    <h2>Cabinet</h2>
  </div>;
}
