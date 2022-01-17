import { useState } from 'react';
import { gamesUrl, getPostAuthHeaders } from '../constants';
import { AddingLine } from './AddingLine';
import { PostDataButton } from './PostDataButton';
import '../styles/AdminElements/GameAddingForm.css';
export function GameAddingForm() {
  const [gameName, setGameName] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [gamePrice, setGamePrice] = useState(0);
  const [gameDiscount, setGameDiscount] = useState(0);
  function postGameData() {
    fetch(`${gamesUrl}`, {
      method: 'POST',
      headers: getPostAuthHeaders(),
      body: JSON.stringify({
        name: gameName,
        description: gameDescription,
        price: gamePrice,
        discountPrice: gameDiscount,
      }),
    })
      .then((resp) => {
        if (resp.status == 201) {
          alert('Added');
        } else {
          alert(`Error ${resp.status}`);
        }
      })
      .then();
  }
  return (
    <div className='admin-adding-form-wrapper'>
      <h1>Add new game</h1>
      <AddingLine fieldName='Game name' setResult={setGameName} />
      <AddingLine fieldName='Description' setResult={setGameDescription} />
      <AddingLine
        type='number'
        fieldName='Game price'
        setResult={setGamePrice}
      />
      <AddingLine
        type='number'
        fieldName='Game discount'
        setResult={setGameDiscount}
      />
      <PostDataButton sender={postGameData} text='Post game' />
    </div>
  );
}
