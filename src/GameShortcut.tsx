import { GameRecordView } from './GameRecordView';
import './styles/GameShortcut.css';
import { GameRecord } from './utils';
export function GameShortcut({ gameRecord, setCurrentView }: {
  gameRecord: GameRecord, setCurrentView: Function
}) {
  console.log('IMG is '+ gameRecord.imageBlob);
  return (
    <div className='gameShortcut' onClick={()=>{setCurrentView(<GameRecordView gameRecord={gameRecord}/>)}}>
      <h4 className='gameShortcutName'>{gameRecord.name}</h4>
      <img src={gameRecord.imageBlob} className='gameShortcutImage' alt='game screenshot or logo'></img>
      <h4 className='gameShortcutPrice'>Price : {gameRecord.price}</h4>
      <h4 className='gameShortcutMark'>Mark : {gameRecord.averageMark}</h4>
    </div>
  );
}
