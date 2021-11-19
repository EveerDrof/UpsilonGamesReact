import './styles/GameShortcut.css';
export function GameShortcut({
  price,
  name,
  averageMark,
  imageBlob,
}: {
  price: number;
  name: string;
  averageMark: number;
  imageBlob: string;
}) {
  return (
    <div className='gameShortcut'>
      <h4 className='gameShortcutName'>{name}</h4>
      <img src={imageBlob} className='gameShortcutImage'alt='game screenshot or logo'></img>
      <h4 className='gameShortcutPrice'>Price : {price}</h4>
      <h4 className='gameShortcutMark'>Mark : {averageMark}</h4>
    </div>
  );
}
