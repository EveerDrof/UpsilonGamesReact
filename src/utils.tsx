export interface GameRecord {
    name: string;
    key?: number;
    averageMark: number;
    price: number;
    imageBlob: string;
};
export interface FullGameRecord {
    name: string;
    id: number;
    description: string;
    averageMark: number;
    price: number;
    imageBlob: string;
};
export interface User{
    id: number,
    name: string
}
export interface Review{
    reviewText:string,
    userId:User,
    id:number,
    dislikesNumber:number,
    likesNumber:number
}
export interface Vote{
    id:number,
    vote:boolean
}