import { authGetHeader, votesReviewUrl, votesUrl } from './constants';
import './styles/PostHeader.css';
import dateFormat from 'dateformat';
import { CommentsView } from './CommentsView';
import { Review } from './utils';
export function PostHeader({
  post,
  setCurrentView,
  isCommentsButtonOnOrAddComment,
  setIsAddingFormOpened,
  isAddingFormOpened,
  sendVote,
}: {
  setCurrentView: Function;
  post: Review;
  isCommentsButtonOnOrAddComment: boolean;
  sendVote: Function;
  setIsAddingFormOpened?: Function;
  isAddingFormOpened?: boolean;
}) {
  let {
    id,
    likesNumber,
    dislikesNumber,
    userId: user,
    creationDate,
    isLiked,
    isDisliked,
  } = { ...post };
  let formatedDate = dateFormat(new Date(creationDate), 'yyyy/m/d HH:MM:ss');
  console.log(`Post `, post);
  return (
    <div className='header-line'>
      <h2 className='review-header'>{user.name}</h2>
      <h2 className='header-time'>{formatedDate}</h2>
      <div className='votes-block'>
        <button
          className={isLiked ? 'vote-set' : 'vote-btn'}
          onClick={() => {
            sendVote(true);
          }}
        >
          +
        </button>
        <p>{likesNumber}</p>
        <button
          className={isDisliked ? 'vote-set' : 'vote-btn'}
          onClick={() => {
            sendVote(false);
          }}
        >
          -
        </button>
        <p>{dislikesNumber}</p>
      </div>
      {isCommentsButtonOnOrAddComment ? (
        <button
          onClick={() => {
            setCurrentView(
              <CommentsView review={post} setCurrentView={setCurrentView} />
            );
          }}
        >
          Comments
        </button>
      ) : (
        <button
          onClick={() => {
            if (setIsAddingFormOpened) {
              setIsAddingFormOpened(!isAddingFormOpened);
            }
          }}
        >
          {isAddingFormOpened ? 'Close adding form' : 'Add a comment'}
        </button>
      )}
    </div>
  );
}
