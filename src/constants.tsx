const picturesDir = '../pictures/';
const serverUrl = 'http://127.0.0.1:9005/';
// const serverUrl = 'http://upsilon.ddns.net/server/';
const gamesUrl = serverUrl + 'games/';
const mainMenuGamesTopUrl = serverUrl + 'games/allshort/';
const picturesUrl = serverUrl + 'pictures/';
const usersUrl = serverUrl + 'users/'
const usersRegisterUrl = usersUrl + 'register/'
const usersGetLoggedUserDataUrl = usersUrl + 'loggedUserData/';
const markUrl = serverUrl + 'marks/';
const reviewsUrl = serverUrl + 'reviews/';
const votesUrl = serverUrl + 'votes/';
const votesReviewUrl = votesUrl+'review/';
const storeUrl = serverUrl+'store/';
const cartUrl = storeUrl+'cart/';
const libraryUrl = storeUrl + 'library/';
const addToCartUrl = cartUrl;
const buyCartUrl = storeUrl+'buyCart/';
const gameInLibraryUrl = storeUrl+'checkGameInLibrary/';
const deleteFromCartUrl = storeUrl + 'cart/remove';
const searchGameUrl = gamesUrl + 'selection/';
const tagsUrl = serverUrl+'tags/';
const allTagsUrl  = tagsUrl+'all-tags/';
const selectGamesUrl = gamesUrl+'selection/';
function authGetHeader() {
    return { 'Authorization': 'Basic ' + btoa(`${localStorage.getItem('name')}:${localStorage.getItem('password')}`) };
}
export {
    picturesDir, serverUrl, mainMenuGamesTopUrl, picturesUrl, usersUrl, usersRegisterUrl,
    usersGetLoggedUserDataUrl, gamesUrl, markUrl, authGetHeader, reviewsUrl,votesUrl,
    votesReviewUrl,cartUrl,libraryUrl,addToCartUrl,buyCartUrl,gameInLibraryUrl,
    deleteFromCartUrl,searchGameUrl,tagsUrl,allTagsUrl,selectGamesUrl
};