import { useEffect, useState } from 'react';
import './styles/GameShortcut.css';
export function GameShortcut({
  price,
  name,
  avgMark,
  imageBlob,
}: {
  price: number;
  name: string;
  avgMark: number;
  imageBlob: string;
}) {
  return (
    <div className='gameShortcut'>
      <h4 className='gameShortcutName'>{name}</h4>
      <img src={imageBlob} className='gameShortcutImage'alt='game screenshot or logo'></img>
      <h4 className='gameShortcutPrice'>{price}</h4>
      <h4 className='gameShortcutMark'>{avgMark}</h4>
    </div>
  );
}
