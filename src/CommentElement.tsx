import { Comment } from './utils';
import './styles/CommentElement.css';
import {
  authGetHeader,
  commentsReviewsUrl,
  commentsVotesUrl,
} from './constants';
import { useState } from 'react';
import { PostHeader } from './PostHeader';
import { mainColor, secondaryColor } from './Colors/colors';
export function CommentElement({
  commentRecord,
  backgroundColor,
  setCurrentView,
  reviewId,
  loadComments,
  sendComment,
}: {
  commentRecord: Comment;
  backgroundColor: string;
  setCurrentView: Function;
  reviewId: number;
  loadComments: (sort?: string) => void;
  sendComment: (
    reviewId: number,
    parentCommentId: number,
    newCommentText: string
  ) => void;
}) {
  const [isAddingFormOpened, setIsAddingFormOpened] = useState(false);
  const [isLiked, setIsLiked] = useState(commentRecord.isLiked);
  const [isDisliked, setIsDisliked] = useState(commentRecord.isDisliked);
  const [newCommentText, setNewCommentText] = useState('');
  function sendVote(voteType: boolean) {
    fetch(`${commentsVotesUrl}${commentRecord.id}?voteType=${voteType}`, {
      method: 'POST',
      headers: authGetHeader(),
    })
      .then((resp) => {
        if (resp.status == 201) {
          if (voteType) {
            setIsLiked(true);
          } else {
            setIsDisliked(true);
          }
        }
      })
      .then(() => {
        loadComments();
      });
  }
  function changeOldBC(bc: string) {
    bc = bc.substring(1, bc.length);
    console.log('New bc', bc);
    let colorsArr = bc.match(/.{1,2}/g);
    let childrenColor = '#';
    if (colorsArr == null) {
      return '#FFFFFF';
    }
    console.log('Colors arr : ', colorsArr);
    const levelGap = 25;
    for (let c of colorsArr) {
      let charToaAdd = '' + (parseInt(c, 16) + levelGap).toString(16);
      if (charToaAdd.length == 1) {
        charToaAdd = '0' + charToaAdd;
      }
      childrenColor += charToaAdd;
    }
    console.log('New color', childrenColor);
    return childrenColor;
  }
  let childComments = [];
  commentRecord.isLiked = isLiked;
  commentRecord.isDisliked = isDisliked;
  for (let c of commentRecord.children) {
    childComments.push(
      <CommentElement
        commentRecord={c}
        backgroundColor={changeOldBC(backgroundColor)}
        setCurrentView={setCurrentView}
        reviewId={reviewId}
        loadComments={loadComments}
        sendComment={sendComment}
      />
    );
  }
  return (
    <div
      className='comment-element-wrapper'
      style={{ backgroundColor: backgroundColor }}
    >
      <div className='comment-element'>
        <PostHeader
          post={commentRecord}
          setCurrentView={setCurrentView}
          isCommentsButtonOnOrAddComment={false}
          setIsAddingFormOpened={setIsAddingFormOpened}
          isAddingFormOpened={isAddingFormOpened}
          sendVote={sendVote}
        />
        <h1>{commentRecord.text}</h1>
      </div>
      {isAddingFormOpened ? (
        <div>
          <div>
            <textarea
              className='new-comment-input'
              onChange={(evt) => {
                setNewCommentText(evt.target.value);
              }}
            ></textarea>
          </div>
          <button
            style={{ backgroundColor: mainColor }}
            className='comment-send-btn'
            onClick={() => {
              sendComment(reviewId, commentRecord.id, newCommentText);
              setIsAddingFormOpened(false);
              loadComments();
            }}
          >
            Submit a comment
          </button>
        </div>
      ) : (
        <></>
      )}
      {childComments}
    </div>
  );
}
