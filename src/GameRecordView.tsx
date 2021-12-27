import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { authGetHeader, gamesUrl, markUrl, picturesUrl } from "./constants";
import { FullGameRecord, GameRecord } from "./utils";
import './styles/GameRecordView.css'
import './styles/App.css'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { ReviewsSection } from "./ReviewsSection";

export function GameRecordView({ gameRecord }: { gameRecord: GameRecord }) {
    const [screeshotsBlobs, setScreeshotsBlobs]: [string[], Function] = useState([]);
    let [longGameData, setLongGameData]: [FullGameRecord | undefined, Function] = useState();
    const [fetchedUserMark, setFetchedUserMark]: [number, Function] = useState(-1);
    let userMark = 0;
    let idsUrl = picturesUrl + gameRecord.name + '/screenshotIDs';
    function fetchAndSetGameMark() {
        fetch(`${markUrl}?gameId=${longGameData?.id}&userId=-1`).then(data => data.json()).then(
            (mark) => {
                longGameData!.averageMark = mark;
                let newVar = { ...longGameData }
                setLongGameData(newVar);
                console.log('Setting');
                console.log(longGameData);
            }
        )
    }
    function sendMarkToServer(mark: number) {
        let url = markUrl + `?mark=${mark}&userId=${localStorage.getItem('userId')}&gameId=${longGameData?.id}`;
        fetch(url, { method: 'POST', headers: authGetHeader() }).then(() => {
            fetchAndSetUserMark();

        });
    }
    function fetchAndSetUserMark() {
        let url = `${markUrl}?gameId=${longGameData?.id}&userId=${localStorage.getItem('userId')}`;
        fetch(url).then(data => data.json()).then((json => {
            setFetchedUserMark(json);
            fetchAndSetGameMark();
        }));
    }
    useEffect(() => {

        fetch(gamesUrl + gameRecord.name + '/long', {}).then(data => data.json()).then(
            (json) => {
                longGameData = json;
                setLongGameData(json as FullGameRecord);
                longGameData!.id = json.id;
                fetchAndSetUserMark();
            });

        fetch(idsUrl, {}).then(response => response.json())
            .then(data => {
                console.log(data);
                for (let i = 0; i < data.length; i++) {
                    fetch(picturesUrl + data[i].id).then(response => response.blob()).then(
                        (blob) => {
                            let objectURL = URL.createObjectURL(blob);
                            if (!screeshotsBlobs.includes(objectURL)) {
                                screeshotsBlobs.push(objectURL);
                                setScreeshotsBlobs([...screeshotsBlobs]);
                            }
                        }
                    );
                }
            });
        fetchAndSetUserMark();
    }, []);
    let screenshotsCarouselItems: JSX.Element[] = [];
    console.log(screeshotsBlobs);
    for (let i = 0; i < (screeshotsBlobs as []).length; i++) {
        let picUrl = screeshotsBlobs[i];
        screenshotsCarouselItems.push(
            <img key={i} src={picUrl} className="screenshot" ></img>);
    }

    return (
        <div>
            <div id='top-info'>
                <div id='screenshots-carousel'>
                    <Carousel verticalSwipe='natural' dynamicHeight={false}>{screenshotsCarouselItems}</Carousel>
                </div>
                <div id='right-info-column'>
                    <h1>{gameRecord.name}</h1>
                    <h1>Price : {gameRecord.price}</h1>
                    <button id="buy-btn">Buy</button>
                    <div id='mark-circle-bar'>
                        {longGameData ?
                            <CircularProgressbar value={longGameData!.averageMark} maxValue={100} text={`${longGameData!.averageMark}`} />
                            :
                            <></>
                        }

                    </div>
                    {longGameData ?
                        <p id='description'>Description : <br /> {longGameData.description}</p>
                        : <></>
                    }

                    {localStorage.getItem('password') ?
                        <div>
                            <h1>{fetchedUserMark >= 0 ? fetchedUserMark : 'Rate this sgame'}</h1>
                            <div id='mark-setter-column'>
                                <div id='mark-setter-line'>
                                    <input type={'range'} onChange={(val) => {
                                        userMark = parseInt(val.target.value);
                                        document.getElementById('user-mark-text')!.innerHTML = '' + userMark;
                                    }} />
                                    <h1 id='user-mark-text'>{userMark}</h1>
                                </div>
                                <button id='mark-setter-button' onClick={() => { sendMarkToServer(userMark); }}>Upload mark</button>
                            </div>
                        </div>
                        :
                        <></>
                    }
                </div>
            </div >
            {longGameData ?
                <ReviewsSection gameName={longGameData.name} />
                :
                <></>}
        </div>
    );
}