import { useEffect, useState } from 'react';
import {
  authGetHeader,
  reviewsAuthorizedUrl,
  reviewsUnauthorizedUrl,
  votesUrl,
} from './constants';
import { ReviewAddingForm } from './ReviewAddingForm';
import './styles/ReviewsSection.css';
import { FullGameRecord, Review } from './utils';
import { PostHeader } from './PostHeader';
import Select from 'react-select';
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
    console.log('Reviews ', reviews);
    reviews.forEach((val) => {
      console.log('Review', val);
      function sendVote(voteType: boolean) {
        let url = `${votesUrl}review?reviewId=${val.id}&vote=${voteType}`;
        fetch(url, { method: 'POST', headers: authGetHeader() }).then(() => {
          loadReviews(sortType);
        });
      }
      reviewsBlocks.push(
        <div className='review-block'>
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
  let sortOptions = [
    { value: 'newest', label: 'newest' },
    { value: 'oldest', label: 'oldest' },
    { value: 'mostLiked', label: 'mostLiked' },
    { value: 'highestDifference', label: 'highestDifference' },
  ];
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
          setSortType(val!.label);
          loadReviews(val!.label);
        }}
      />
      <div id='reviews-layout'>{reviewsBlocks}</div>
    </div>
  );
}
