import { ChangeEvent, useEffect, useState } from 'react';
import Select from 'react-select';
import { allTagsUrl, selectGamesUrl, tagsUrl } from './constants';
import { GamesList } from './GamesList';
import './styles/SearchView.css';
import { FullGameRecord, loadPictures, Tag } from './utils';
export function SearchView({ setCurrentView }: { setCurrentView: Function }) {
  const [minMark, setMinMark] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(99999);
  const [namePart, setNamePart] = useState('');
  const [tags, setTags]: [Tag[], Function] = useState([]);
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
    const tagsString = selectedTags.map((t) => t.value).join();
    const url =
      `${selectGamesUrl}?tags=${tagsString}&minMark=${minMark}&minPrice=${minPrice}&` +
      `namePart=${namePart}&maxPrice=${maxPrice}`;
    fetch(url)
      .then((data) => data.json())
      .then((json) => {
        if (json) {
          if (json.length == 0) {
            setGames([]);
          }
          loadPictures(json, setGames);
        } else {
          setGames([]);
        }
      });
  }

  return (
    <div id='search-view-wrapper'>
      <div className='search-block'>
        <div className='search-parameters'>
          <h1>Min mark</h1>
          <input
            type='number'
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setMinMark(Number.parseInt(evt.target.value));
            }}
          />
          <h1>Min price</h1>
          <input
            type='number'
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setMinPrice(Number.parseFloat(evt.target.value));
            }}
          />
          <h1>Max price</h1>
          <input
            type='number'
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setMaxPrice(Number.parseFloat(evt.target.value));
            }}
          />
          <h1>Name part</h1>
          <input
            type='text'
            onChange={(evt: ChangeEvent<HTMLInputElement>) => {
              setNamePart(evt.target.value);
            }}
          />
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
