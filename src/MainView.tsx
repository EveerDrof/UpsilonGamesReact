import { useState, useEffect } from "react";
import { GamesList } from './GamesList';
import { Jumper } from './Jumper';
import { mainMenuGamesTopUrl, picturesUrl } from './constants';
import { Carousel } from 'react-responsive-carousel';
import { GameRecord } from './utils'

export function MainView({ setCurrentView }: { setCurrentView: Function }) {
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
                    json = { data: json };
                    json.data.forEach((game: any) => {
                        let picUrl = picturesUrl + game.name + '/shortcut';
                        fetch(picUrl).then(response => response.blob()).then(blob => {
                            game.imageBlob = URL.createObjectURL(blob);
                            setMainMenuGamesRecords({ ...json as Array<GameRecord> });
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
            <Carousel verticalSwipe='natural'>{carouselItems}</Carousel>
            {mainMenuGamesRecords !== undefined ?
                <GamesList gamesRecords={mainMenuGamesRecords.data} setCurrentView={setCurrentView} /> : <></>
            }
            {jumper}
        </div>
    );
}