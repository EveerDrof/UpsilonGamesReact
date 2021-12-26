import { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { picturesUrl } from "./constants";
import { GameRecord } from "./utils";
import './styles/GameRecordView.css'
import './styles/App.css'

export function GameRecordView({ gameRecord }: { gameRecord: GameRecord }) {
    // const [screeshotIds, setScreeshotId]: [{ id: number }[] | null, Function] = useState(null);
    const [screeshotsBlobs, setScreeshotsBlobs]: [string[], Function] = useState([]);
    let idsUrl = picturesUrl + gameRecord.name + '/screenshotIDs';
    useEffect(() => {
        fetch(idsUrl, {
            method: 'GET'
        }).then(response => response.json())
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
            <Carousel verticalSwipe='natural' dynamicHeight={false}>{screenshotsCarouselItems}</Carousel>
        </div>
    );
}