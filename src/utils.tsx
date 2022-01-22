import { picturesUrl, selectGamesUrl } from './constants';

export interface GameRecord {
  name: string;
  key?: number;
  averageMark: number;
  price: number;
  imageBlob: string;
  discountPrice: number;
}
export interface FullGameRecord extends GameRecord {
  tags: Tag[];
  id: number;
  description: string;
}
export interface Tag {
  id: number;
  name: string;
}
export interface User {
  id: number;
  name: string;
}
export interface Post {
  text: string;
  userId: User;
  id: number;
  dislikesNumber: number;
  likesNumber: number;
  creationDate: number;
  isDisliked: boolean;
  isLiked: boolean;
}
export interface Review extends Post {}
export interface Comment extends Post {
  children: Comment[];
}
export interface Vote {
  id: number;
  vote: boolean;
}

export function loadPictures(
  gamesList: GameRecord[],
  setGameRecords: Function
) {
  if (gamesList) {
    if (gamesList.length > 0) {
      gamesList.forEach((game: GameRecord) => {
        let picUrl = picturesUrl + game.name + '/shortcut';
        fetch(picUrl)
          .then((response) => response.blob())
          .then((blob) => {
            game.imageBlob = URL.createObjectURL(blob);
            console.log('List', gamesList);
            setGameRecords([...(gamesList as Array<GameRecord>)]);
          });
      });
    }
  }
}
export function loadGamewRecords(
  url: string,
  setGameRecords: Function,
  headers: any
) {
  let requestInfo = {};
  if (headers != null) {
    requestInfo = { headers: headers };
  }
  fetch(url, requestInfo)
    .then((response) => response.json())
    .then((json) => {
      if (json) {
        loadPictures(json, setGameRecords);
      } else {
        setGameRecords({});
      }
    })
    .catch((reason) => {
      alert('You have to login');
      setGameRecords([]);
    });
}
export function removeUserStorageData() {
  localStorage.removeItem('name');
  localStorage.removeItem('password');
  localStorage.removeItem('userId');
}
interface selctedGamesInputParameter {
  tags?: string[];
  minMark?: number;
  minPrice?: number;
  namePart?: string;
  maxPrice?: number;
  minDiscountPercent?: number;
  sortType?: string;
}
export function fetchAndSetSelectedGames(
  setGames: Function,
  options: selctedGamesInputParameter
) {
  let {
    maxPrice,
    minDiscountPercent,
    minMark,
    minPrice,
    namePart,
    tags,
    sortType,
  } = {
    ...options,
  };
  if (!maxPrice) {
    maxPrice = 99999999;
  }
  if (!minDiscountPercent) {
    minDiscountPercent = -1;
  }
  if (!minMark) {
    minMark = -2;
  }
  if (!minPrice) {
    minPrice = -1;
  }
  if (!namePart) {
    namePart = '';
  }
  let tagsString = '';
  if (tags) {
    tagsString = tags.join();
  }
  if (!sortType) {
    sortType = '';
  }
  let url =
    `${selectGamesUrl}?tags=${tagsString}&minMark=${minMark}&minPrice=${minPrice}` +
    `&namePart=${namePart}&maxPrice=${maxPrice}&minDiscountPercent=${minDiscountPercent}` +
    `&sortType=${sortType}`;
  fetch(url)
    .then((data) => data.json())
    .then((json) => {
      if (json && json.length > 0) {
        loadPictures(json, setGames);
      } else {
        setGames({});
      }
    });
}
