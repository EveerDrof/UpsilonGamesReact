import { useEffect, useState } from 'react';
import {
  authGetHeader,
  getTextData,
  reviewsAuthorizedUrl,
  reviewsUnauthorizedUrl,
  searchGameUrl,
  votesUrl,
} from './constants';
import { ReviewAddingForm } from './ReviewAddingForm';
import './styles/ReviewsSection.css';
import { FullGameRecord, Review } from './utils';
import { PostHeader } from './PostHeader';
import Select from 'react-select';
import { grayColor } from './Colors/colors';
export function ReviewsSection({
  game,
  isGameInLibrary,
  setCurrentView,
}: {
  game: FullGameRecord;
  isGameInLibrary: boolean;
  setCurrentView: Function;
}) {
  const [reviews, setReviews]: [Review[], Function] = useState([]);
  const [sortType, setSortType]: [string, Function] = useState('newest');
  function loadReviews(sortType: string = 'newest') {
    let startUrl;
    if (localStorage.getItem('password')) {
      startUrl = reviewsAuthorizedUrl;
    } else {
      startUrl = reviewsUnauthorizedUrl;
    }
    let url = `${startUrl}?gameName=${game.name}&sort=${sortType}&neededUserId=-1&reviewsNumber=10`;
    let authData: any = {};
    if (localStorage.getItem('name')) {
      authData.headers = authGetHeader();
    } else {
      authData = null;
    }
    fetch(url, authData)
      .then((data) => data.json())
      .then((json) => {
        setReviews(json);
      });
  }
  useEffect(() => {
    loadReviews('newest');
  }, []);
  let reviewsBlocks: JSX.Element[] = [];
  if (reviews && reviews.length !== 0) {
    reviews.forEach((val) => {
      function sendVote(voteType: boolean) {
        let url = `${votesUrl}review?reviewId=${val.id}&vote=${voteType}`;
        fetch(url, { method: 'POST', headers: authGetHeader() }).then(() => {
          loadReviews(sortType);
        });
      }
      reviewsBlocks.push(
        <div className='review-block' style={{ backgroundColor: grayColor }}>
          <PostHeader
            post={val}
            setCurrentView={setCurrentView}
            isCommentsButtonOnOrAddComment={true}
            sendVote={sendVote}
          />
          <p style={{ whiteSpace: 'pre-line' }}>{val.text}</p>
        </div>
      );
    });
  }
  const textData = getTextData().reviews.search;
  let sortOptions = [
    { value: 'newest', label: textData.newest },
    { value: 'oldest', label: textData.oldest },
    { value: 'mostLiked', label: textData.mostLiked },
    { value: 'highestDifference', label: textData.highestDifference },
  ];
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
  return (
    <div id='reviews-section'>
      {isGameInLibrary ? (
        <ReviewAddingForm loadReviews={loadReviews} gameName={game.name} />
      ) : (
        <></>
      )}
      <Select
        id='sort-select'
        options={sortOptions}
        defaultValue={sortOptions[0]}
        onChange={(val) => {
          setSortType(val!.value);
          loadReviews(val!.value);
        }}
        styles={selectStyles}
      />
      <div id='reviews-layout'>{reviewsBlocks}</div>
    </div>
  );
}
