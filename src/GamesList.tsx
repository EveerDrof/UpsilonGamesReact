import { GameShortcut } from './GameShortcut';
import './styles/GamesList.css';
import { GameRecord } from './utils';
export function GamesList({
  gamesRecords,
  setCurrentView,
  type,
  updateRootElement,
}: {
  gamesRecords: GameRecord[] | undefined;
  setCurrentView: Function;
  type?: string;
  updateRootElement?: Function;
}) {
  if (gamesRecords && gamesRecords.length > 0) {
    return (
      <div className='gamesList'>
        {gamesRecords.map((val, index) => (
          <GameShortcut
            gameRecord={val}
            setCurrentView={setCurrentView}
            type={type}
            updateRootElement={updateRootElement}
            gamesRecords={gamesRecords}
          />
        ))}
      </div>
    );
  } else {
    return <></>;
  }
}
