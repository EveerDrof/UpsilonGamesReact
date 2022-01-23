import { useState } from 'react';
import { getPostAuthHeaders, picturesUrl } from '../constants';
import { AddingLine } from './AddingLine';
import { PostDataButton } from './PostDataButton';

export function ShortcutAddingForm() {
  const [gameName, setGameName] = useState('');
  const [gameShortcut, setGameShortcut] = useState('');
  const [isShortcut, setIsShortcut] = useState(false);
  function sendShortcut() {
    let endType = 'screenshot';
    if (isShortcut) {
      endType = 'shortcut';
    }
    let url = `${picturesUrl}${gameName}/${endType}`;
    fetch(url, {
      method: 'POST',
      headers: getPostAuthHeaders(),
      body: gameShortcut,
    }).then((resp) => alert(resp.status));
  }
  return (
    <div className='admin-adding-form-wrapper'>
      <AddingLine fieldName='Game name' setResult={setGameName} />
      <AddingLine
        fieldName='Picture'
        valueType='file'
        setResult={setGameShortcut}
      />
      <AddingLine
        fieldName='Is shortcut'
        valueType='checkbox'
        setResult={setIsShortcut}
      />
      <PostDataButton text='Post shorcut' sender={sendShortcut} />
    </div>
  );
}
