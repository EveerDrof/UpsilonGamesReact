import { ChangeEvent, useEffect, useState } from 'react';
import Select from 'react-select';
import { AddingLine } from './AdminElements/AddingLine';
import { allTagsUrl, selectGamesUrl, tagsUrl } from './constants';
import { GamesList } from './GamesList';
import './styles/SearchView.css';
import {
  fetchAndSetSelectedGames,
  FullGameRecord,
  loadPictures,
  Tag,
} from './utils';
export function SearchView({ setCurrentView }: { setCurrentView: Function }) {
  const [minMark, setMinMark] = useState(-2);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999);
  const [namePart, setNamePart] = useState('');
  const [tags, setTags]: [Tag[], Function] = useState([]);
  const [minDiscountPercent, setMinDiscountPercent] = useState(0);
  const [selectedTags, setSelectedTags]: [
    { label: string; value: string }[],
    Function
  ] = useState([]);
  const [games, setGames]: [FullGameRecord[], Function] = useState([]);
  useEffect(() => {
    fetch(allTagsUrl)
      .then((data) => data.json())
      .then((json: Tag[]) => {
        let tags: { label: string; value: string }[] = [];
        json.forEach((t: Tag) => {
          tags.push({ label: t.name, value: t.name });
        });
        setTags(tags);
      });
  }, []);
  function search() {
    fetchAndSetSelectedGames(setGames, {
      minDiscountPercent: minDiscountPercent,
      minMark: minMark,
      minPrice: minPrice,
      maxPrice: maxPrice,
      namePart: namePart,
      tags: tags.map((t) => t.name),
    });
  }

  return (
    <div id='search-view-wrapper'>
      <div className='search-block'>
        <div className='search-parameters'>
          <AddingLine
            fieldName='Min mark'
            type='number'
            setResult={setMinMark}
          />
          <AddingLine
            fieldName='Min price'
            type='number'
            setResult={setMinPrice}
          />
          <AddingLine
            fieldName='Max price'
            type='number'
            setResult={setMaxPrice}
          />
          <AddingLine
            fieldName='Min discount percent'
            type='number'
            setResult={setMinDiscountPercent}
          />
          <AddingLine fieldName='Name part' setResult={setNamePart} />
          <div id='select-block'>
            <Select
              options={tags}
              isMulti
              onChange={(options) => {
                console.log('Selcted options', options);
                setSelectedTags(options);
              }}
            />
          </div>
          <button onClick={search}>Search</button>
        </div>
        <div id='selected-games'>
          <h1>Result</h1>
          {games.length > 0 ? (
            <GamesList gamesRecords={games} setCurrentView={setCurrentView} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
