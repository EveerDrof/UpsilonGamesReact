import {
  darkColor,
  mainColor,
  secondaryColor,
  thirdColor,
} from './Colors/colors';
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
          className='additional-functionality-btn'
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
  let additionalStyle: any = {};
  if (type == 'cart') {
    additionalStyle.borderBottomLeftRadius = '0';
    additionalStyle.borderBottomRightRadius = '0';
  }
  return (
    <div>
      <div
        className='gameShortcut'
        style={{ backgroundColor: thirdColor, ...additionalStyle }}
        onClick={() => {
          setCurrentView(
            <GameRecordView
              gameRecord={gameRecord}
              setCurrentView={setCurrentView}
            />
          );
        }}
      >
        <h4 className='gameShortcutName' style={{ color: mainColor }}>
          {gameRecord.name}
        </h4>
        <img
          src={gameRecord.imageBlob}
          className='gameShortcutImage'
          alt='game screenshot or logo'
        ></img>
        <h4 className='gameShortcutPrice' style={{ color: mainColor }}>
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
        <h4 className='gameShortcutMark' style={{ color: mainColor }}>
          Mark : {gameRecord.averageMark}
        </h4>
      </div>
      {additionalFunctional}
    </div>
  );
}
