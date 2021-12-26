import { GameShortcut } from './GameShortcut';
import './styles/GamesList.css';
import { GameRecord } from './utils';
export function GamesList({ gamesRecords, setCurrentView }: { gamesRecords: GameRecord[] | undefined,
   setCurrentView: Function }) {
  console.log(gamesRecords);
  if (gamesRecords) {
    return (
      <div className='gamesList'>
        {gamesRecords.map((val, index) => (
          <GameShortcut
            gameRecord={val}
            setCurrentView={setCurrentView}
          />
        ))}
      </div>
    );
  } else {
    return <></>
  }
}