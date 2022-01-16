import { picturesUrl } from './constants';

export interface GameRecord {
  name: string;
  key?: number;
  averageMark: number;
  price: number;
  imageBlob: string;
}
export interface FullGameRecord {
  name: string;
  id: number;
  description: string;
  averageMark: number;
  price: number;
  imageBlob: string;
  tags: Tag[];
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

export function loadPictures(gamesList: any, setGameRecords: Function) {
  gamesList.forEach((game: any) => {
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
    });
}
