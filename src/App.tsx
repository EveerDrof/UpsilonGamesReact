import './styles/App.css';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loaders
import { Header } from './Header';
import { GamesList } from './GamesList';
import { Jumper } from './Jumper';
function App() {
  const [picture1, setPicture1] = useState('');
  const [picture2, setPicture2] = useState('');
  const [picture3, setPicture3] = useState('');
  const [showJumper, setShowJumper] = useState(false);
  const handleScroll = (e: any) => {
    const body = e.srcElement.body;
    if (body) {
      if (body.getBoundingClientRect().bottom <= window.innerHeight + 500) {
        setShowJumper(true);
      } else {
        setShowJumper(false);
      }
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    fetch(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Half-Life_lambda_logo.svg/548px-Half-Life_lambda_logo.svg.png'
    )
      .then((response) => response.blob())
      .then((blob) => {
        const obj = URL.createObjectURL(blob);
        setPicture1(obj);
      });
    fetch('https://upload.wikimedia.org/wikipedia/commons/8/8f/Ultramarine.png')
      .then((response) => response.blob())
      .then((blob) => {
        const obj = URL.createObjectURL(blob);
        setPicture2(obj);
      });
    fetch(
      'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Overwatch_circle_logo.svg/900px-Overwatch_circle_logo.svg.png'
    )
      .then((response) => response.blob())
      .then((blob) => {
        const obj = URL.createObjectURL(blob);
        setPicture3(obj);
      });
  }, []);
  const gamesRecords = [];
  for (let i = 0; i < 5; i++) {
    gamesRecords.push({
      name: 'aaaa',
      avgMark: 9.5,
      price: 249,
      imageBlob: picture1,
    });
    gamesRecords.push({
      name: 'Warhammer Spacemarine',
      avgMark: 7.5,
      price: 700,
      imageBlob: picture2,
    });
    gamesRecords.push({
      name: 'Overwatch',
      avgMark: 8,
      price: 2000,
      imageBlob: picture3,
    });
  }
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
      <GamesList gamesRecords={gamesRecords} />
      {jumper}
    </div>
  );
}

export default App;
