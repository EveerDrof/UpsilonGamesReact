import { grayColor, mainColor, thirdColor } from './Colors/colors';
import { authGetHeader, deleteFromCartUrl, getTextData } from './constants';
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
  const textData = getTextData();
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
          {textData.gameShortcut.delete}
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
        style={{
          background: `linear-gradient(to top,${grayColor}  0%, ${thirdColor} 100%)`,
          ...additionalStyle,
        }}
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
          {discountFound ? gameRecord.discountPrice : ''}
          {'  '}
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
          {' ₽'}
        </h4>
        <h4 className='gameShortcutMark' style={{ color: mainColor }}>
          {textData.gameShortcut.mark} : {gameRecord.averageMark}
        </h4>
      </div>
      {additionalFunctional}
    </div>
  );
}
