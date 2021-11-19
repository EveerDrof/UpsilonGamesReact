import { GameShortcut } from './GameShortcut';
import './styles/GamesList.css';
export interface gameRecord {
  name: string;
  key?: number;
  averageMark: number;
  price: number;
  imageBlob: string;
}
export function GamesList({ gamesRecords }: { gamesRecords: gameRecord[] | undefined }) {
  console.log(gamesRecords);
  if (gamesRecords) {
    return (
      <div className='gamesList'>
        {gamesRecords.map((val, index) => (
          <GameShortcut
            name={val.name}
            key={index}
            imageBlob={val.imageBlob}
            averageMark={val.averageMark}
            price={val.price}
          />
        ))}
      </div>
    );
  } else {
    return <></>
  }
}