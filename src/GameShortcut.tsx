import { authGetHeader, deleteFromCartUrl } from './constants';
import { GameRecordView } from './GameRecordView';
import './styles/GameShortcut.css';
import { GameRecord } from './utils';
export function GameShortcut({
  gameRecord,
  setCurrentView,
  type,
  updateRootElement,
  gamesRecords,
}: {
  gameRecord: GameRecord;
  setCurrentView: Function;
  type?: string;
  updateRootElement?: Function;
  gamesRecords: GameRecord[];
}) {
  function requestDeleteFromCartAndUpdate() {
    gamesRecords.filter((val) => {
      return val.name !== gameRecord.name;
    });
    let headers = { ...authGetHeader(), method: 'POST' };
    fetch(`${deleteFromCartUrl}?gameName=${gameRecord.name}`, {
      method: 'POST',
      headers,
    }).then(() => {
      if (updateRootElement) {
        updateRootElement();
      }
    });
  }
  let additionalFunctional = <></>;
  switch (type) {
    case 'cart':
      additionalFunctional = (
        <button
          onClick={() => {
            requestDeleteFromCartAndUpdate();
          }}
        >
          Delete
        </button>
      );
      break;
    default:
      additionalFunctional = <></>;
      break;
  }
  let discountFound = gameRecord.discountPrice != gameRecord.price;
  return (
    <div>
      <div
        className='gameShortcut'
        onClick={() => {
          setCurrentView(
            <GameRecordView
              gameRecord={gameRecord}
              setCurrentView={setCurrentView}
            />
          );
        }}
      >
        <h4 className='gameShortcutName'>{gameRecord.name}</h4>
        <img
          src={gameRecord.imageBlob}
          className='gameShortcutImage'
          alt='game screenshot or logo'
        ></img>
        <h4 className='gameShortcutPrice'>
          Price : {discountFound ? gameRecord.discountPrice : ''}{' '}
          <span
            style={
              discountFound
                ? {
                    textDecoration: 'line-through',
                    color: 'rgba(0, 0, 0, 0.5)',
                  }
                : {}
            }
          >
            {gameRecord.price}
          </span>
        </h4>
        <h4 className='gameShortcutMark'>Mark : {gameRecord.averageMark}</h4>
      </div>
      {additionalFunctional}
    </div>
  );
}
