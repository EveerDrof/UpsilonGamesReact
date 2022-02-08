import { ChangeEvent, useEffect, useState } from 'react';
import Select from 'react-select';
import { AddingLine } from './AdminElements/AddingLine';
import { darkColor, mainColor } from './Colors/colors';
import {
  allTagsUrl,
  getTextData,
  searchGameUrl,
  selectGamesUrl,
  tagsUrl,
} from './constants';
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
      tags: selectedTags.map((t) => t.value),
    });
  }
  const selectStyles = {
    control: (base: any) => ({
      ...base,
      fontSize: '2.5vh',
    }),
    menu: (base: any) => ({
      ...base,
      fontSize: '2.5vh',
    }),
  };
  const searchTextData = getTextData().advancedSearch;
  return (
    <div id='search-view-wrapper' style={{ backgroundColor: mainColor }}>
      <div className='search-block'>
        <div className='search-parameters'>
          <div id='select-block'>
            <Select
              styles={selectStyles}
              options={tags}
              isMulti
              onChange={(options) => {
                setSelectedTags(options);
              }}
              placeholder={searchTextData.select}
            />
          </div>
          <AddingLine
            fieldName={searchTextData.minMark}
            valueType='number'
            setResult={setMinMark}
            isVertical={false}
          />
          <AddingLine
            fieldName={searchTextData.minPrice}
            valueType='number'
            setResult={setMinPrice}
            isVertical={false}
          />
          <AddingLine
            fieldName={searchTextData.maxPrice}
            valueType='number'
            setResult={setMaxPrice}
            isVertical={false}
          />
          <AddingLine
            fieldName={searchTextData.minDiscountPercent}
            valueType='number'
            setResult={setMinDiscountPercent}
            isVertical={false}
          />
          <AddingLine
            fieldName={searchTextData.namePart}
            isVertical={false}
            setResult={setNamePart}
          />
          <button id='selection-search-btn' onClick={search}>
            {searchTextData.search}
          </button>
        </div>
        <div id='selected-games'>
          <h1 style={{ color: darkColor }}>{searchTextData.result}</h1>
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
