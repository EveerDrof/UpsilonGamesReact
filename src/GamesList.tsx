import { GameShortcut } from './GameShortcut';
import './styles/GamesList.css';
interface gameRecord {
  name: string;
  key?: number;
  avgMark: number;
  price: number;
  imageBlob: string;
}
export function GamesList({ gamesRecords }: { gamesRecords: gameRecord[] }) {
  return (
    <div className='gamesList'>
      {gamesRecords.map((val, index) => (
        <GameShortcut
          name={val.name}
          key={index}
          imageBlob={val.imageBlob}
          avgMark={val.avgMark}
          price={val.price}
        />
      ))}
    </div>
  );
}
