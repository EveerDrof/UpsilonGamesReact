import {
  authGetHeader,
  getTextData,
  votesReviewUrl,
  votesUrl,
} from './constants';
import './styles/PostHeader.css';
import dateFormat from 'dateformat';
import { CommentsView } from './CommentsView';
import { Review } from './utils';
import { mainColor } from './Colors/colors';
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
  const textData = getTextData().comment;
  return (
    <div className='header-line'>
      <h2 className='review-header'>{user.name}</h2>
      <h2 className='header-time'>{formatedDate}</h2>
      <div className='votes-block'>
        <button
          style={{ backgroundColor: mainColor }}
          className={isLiked ? 'vote-set' : 'vote-btn'}
          onClick={() => {
            sendVote(true);
          }}
        >
          +
        </button>
        <p className='votes-counter'>{likesNumber}</p>
        <button
          style={{ backgroundColor: mainColor }}
          className={isDisliked ? 'vote-set' : 'vote-btn'}
          onClick={() => {
            sendVote(false);
          }}
        >
          -
        </button>
        <p className='votes-counter'>{dislikesNumber}</p>
      </div>
      {isCommentsButtonOnOrAddComment ? (
        <button
          style={{ backgroundColor: mainColor }}
          className='add-comment-btn'
          onClick={() => {
            setCurrentView(
              <CommentsView review={post} setCurrentView={setCurrentView} />
            );
          }}
        >
          {textData.comment}
        </button>
      ) : (
        <button
          className='add-comment-btn'
          style={{ backgroundColor: mainColor }}
          onClick={() => {
            if (setIsAddingFormOpened) {
              setIsAddingFormOpened(!isAddingFormOpened);
            }
          }}
        >
          {isAddingFormOpened ? textData.closeAddingForm : textData.addComment}
        </button>
      )}
    </div>
  );
}
