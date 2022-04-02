const picturesDir = '../pictures/';
// const serverUrl = 'http://127.0.0.1:9005/';
const serverUrl = 'http://upsilongames.ddns.net/server/';
const gamesUrl = serverUrl + 'games/';
const mainMenuGamesTopUrl = serverUrl + 'games/allshort/';
const picturesUrl = serverUrl + 'pictures/';
const usersUrl = serverUrl + 'users/';
const usersRegisterUrl = usersUrl + 'register/';
const usersGetLoggedUserDataUrl = usersUrl + 'loggedUserData/';
const markUrl = serverUrl + 'marks/';
const reviewsUrl = serverUrl + 'reviews/';
const reviewsAuthorizedUrl = reviewsUrl + 'authorized/';
const reviewsUnauthorizedUrl = reviewsUrl + 'unauthorized/';
const votesUrl = serverUrl + 'votes/';
const votesReviewUrl = votesUrl + 'review/';
const storeUrl = serverUrl + 'store/';
const cartUrl = storeUrl + 'cart/';
const libraryUrl = storeUrl + 'library/';
const addToCartUrl = cartUrl;
const buyCartUrl = storeUrl + 'buyCart/';
const gameInLibraryUrl = storeUrl + 'checkGameInLibrary/';
const deleteFromCartUrl = storeUrl + 'cart/remove';
const searchGameUrl = gamesUrl + 'selection/';
const tagsUrl = serverUrl + 'tags/';
const allTagsUrl = tagsUrl + 'all-tags/';
const selectGamesUrl = gamesUrl + 'selection/';
const commentsUrl = serverUrl + 'comments/';
const commentsReviewsUrl = commentsUrl + 'review/';
const commentsVotesUrl = votesUrl + 'comment/';
function authGetHeader() {
  return {
    Authorization:
      'Basic ' +
      btoa(
        `${localStorage.getItem('name')}:${localStorage.getItem('password')}`
      ),
  };
}
function getTextData() {
  switch (localStorage.getItem('language')) {
    case 'РУС':
      return {
        header: {
          main: 'Главная',
          cabinet: 'Кабинет',
          search: 'Поиск',
          advancedSearch: 'Продвинутый поиск',
        },
        main: {
          topRatedGames: 'Лучшие игры',
          sales: 'Скидки',
        },
        gameShortcut: {
          mark: 'Оценка',
          delete: 'Удалить',
        },
        gameRecordView: {
          price: 'Цена',
          mark: 'Оценка',
          description: 'Описание',
          tags: 'Теги',
          buy: 'Добавить в корзину',
          uploadMark: 'Отправить оценку',
          yourMark: 'Ваша оценка',
          rateThisGame: 'Оцените эту игру',
          inLibrary: 'В библиотеке',
          inCart: 'В корзине',
        },
        steamReviewData: {
          steamReviewsHead: 'Данные Steam',
          steamReviews: 'Отзывы Steam',
          reviewSummary: 'Сводка по отзывам',
          totalReviewsNumber: 'Всего отзывов',
          positiveReviewsNumber: 'Число позитивных отзывов',
          negativeReviewsNumber: 'Число отрицательных отзывов',
        },
        cabinet: {
          greeting: 'Привет',
          buyItems: 'Добавить игры в корзине в библиотеку',
          cart: 'Корзина',
          cartIsEmpty: 'Корзина пуста',
          library: 'Библиотека',
          libraryIsEmpty: 'Библиотека пуста',
        },
        reviews: {
          search: {
            newest: 'Новейшее',
            oldest: 'Старейшее',
            mostLiked: 'Больше всех лайков',
            highestDifference: 'Самые положительные',
          },
          sendBtn: 'Отправить',
        },
        comment: {
          comment: 'Коммент',
          submitComment: 'Добавить комментарий',
          closeAddingForm: 'Закрыть форму',
          addComment: 'Добавить комментарий',
        },
        advancedSearch: {
          minMark: 'Мин оценка',
          minPrice: 'Мин цена',
          maxPrice: 'Макс цена',
          minDiscountPercent: 'Мин процент скидки',
          namePart: 'Часть имени',
          search: 'Поиск',
          select: 'Выбрать теги',
          result: 'Результат',
        },
        auth: {
          userName: 'Имя пользователя',
          password: 'Пароль',
          register: 'Заергистрироваться',
          login: 'Войти',
          send: 'Отправить',
          repeatPassword: 'Повторить пароль',
        },
      };
    default:
    case 'ENG':
      return {
        header: {
          main: 'Main',
          cabinet: 'Cabinet',
          search: 'Search',
          advancedSearch: 'Advanced search',
        },
        main: {
          topRatedGames: 'Top rated games',
          sales: 'Discounts',
        },
        gameShortcut: {
          mark: 'Mark',
          delete: 'Delete',
        },
        gameRecordView: {
          price: 'Price',
          mark: 'Mark',
          description: 'Description',
          tags: 'Tags',

          buy: 'Add to cart',
          uploadMark: 'Upload mark',
          yourMark: 'Your mark',
          rateThisGame: 'Rate this game',
          inLibrary: 'In library',
          inCart: 'In cart',
        },
        steamReviewData: {
          steamReviewsHead: 'Steam data',
          steamReviews: 'Steam reviews',
          reviewSummary: 'Reviesw summary',
          totalReviewsNumber: 'Total reviews number',
          positiveReviewsNumber: 'Positive reviews number',
          negativeReviewsNumber: 'Negative reviews number',
        },
        cabinet: {
          greeting: 'Hi',
          buyItems: 'Add items in cart to library',
          cart: 'Cart',
          cartIsEmpty: 'Cart is empty',
          library: 'Library',
          libraryIsEmpty: 'Library is empty',
        },
        reviews: {
          search: {
            newest: 'Newest',
            oldest: 'Oldest',
            mostLiked: 'most liked',
            highestDifference: 'most positive',
          },
          sendBtn: 'Send',
        },
        comment: {
          comment: 'Comment',
          submitComment: 'Submit a comment',
          closeAddingForm: 'Close addingForm',
          addComment: 'Add a comment',
        },
        advancedSearch: {
          minMark: 'Min mark',
          minPrice: 'Min price',
          maxPrice: 'Max price',
          minDiscountPercent: 'Min discount percent',
          namePart: 'Name part',
          search: 'Search',
          select: 'Select tags',
          result: 'Result',
        },
        auth: {
          userName: 'User name',
          password: 'Password',
          register: 'Register',
          login: 'Login',
          send: 'Send',
          repeatPassword: 'Repeat password',
        },
      };
  }
}
export function getPostAuthHeaders() {
  return {
    ...authGetHeader(),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };
}
export {
  picturesDir,
  serverUrl,
  mainMenuGamesTopUrl,
  picturesUrl,
  usersUrl,
  usersRegisterUrl,
  usersGetLoggedUserDataUrl,
  gamesUrl,
  markUrl,
  authGetHeader,
  reviewsUrl,
  votesUrl,
  votesReviewUrl,
  cartUrl,
  libraryUrl,
  addToCartUrl,
  buyCartUrl,
  gameInLibraryUrl,
  deleteFromCartUrl,
  searchGameUrl,
  tagsUrl,
  allTagsUrl,
  selectGamesUrl,
  commentsUrl,
  commentsReviewsUrl,
  commentsVotesUrl,
  reviewsAuthorizedUrl,
  reviewsUnauthorizedUrl,
  getTextData,
};
