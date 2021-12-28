const picturesDir = '../pictures/';
const serverUrl = 'http://localhost:9005/';
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
function authGetHeader() {
    return { 'Authorization': 'Basic ' + btoa(`${localStorage.getItem('name')}:${localStorage.getItem('password')}`) };
}
export {
    picturesDir, serverUrl, mainMenuGamesTopUrl, picturesUrl, usersUrl, usersRegisterUrl,
    usersGetLoggedUserDataUrl, gamesUrl, markUrl, authGetHeader, reviewsUrl,votesUrl,votesReviewUrl
};