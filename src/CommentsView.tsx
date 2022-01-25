import { useEffect, useState } from 'react';
import { CommentElement } from './CommentElement';
import { authGetHeader, commentsReviewsUrl } from './constants';
import { Review, Comment } from './utils';
import Select from 'react-select';
import './styles/CommentsView.css';
import { thirdColor } from './Colors/colors';

export function CommentsView({
  review,
  setCurrentView,
}: {
  review: Review;
  setCurrentView: Function;
}) {
  function getCommentBlocks(commentsRecords: Comment[]) {
    let commentsElements = [];
    for (let c of commentsRecords) {
      commentsElements.push(
        <CommentElement
          commentRecord={c}
          backgroundColor='#000000'
          setCurrentView={setCurrentView}
          reviewId={review.id}
          loadComments={loadComments}
          sendComment={sendComment}
        />
      );
    }
    return commentsElements;
  }

  const [comments, setComments]: [Comment[], Function] = useState([]);
  const [isRootCommentAddingFormOpened, setIsRootCommentAddingFormOpened]: [
    boolean,
    Function
  ] = useState(false);
  let [sortType, setSortType] = useState('newest');
  const [rootCommentText, setRootCommentText]: [string, Function] =
    useState('');
  function loadComments(specifiedSortType: string = '') {
    if (specifiedSortType !== '') {
      sortType = specifiedSortType;
    }
    let authType = 'unauthorized';
    let init: any = {};
    if (localStorage.getItem('name')) {
      authType = 'authorized';

      init.headers = authGetHeader();
    }
    fetch(
      `${commentsReviewsUrl}${review.id}/${authType}?commentsNumber=50&sort=${sortType}`,
      init
    )
      .then((data) => {
        console.log(data);
        return data.json();
      })
      .then((json) => {
        console.log('Comments', json);
        setComments([]);
        setComments([...json]);
      });
  }
  function sendComment(
    reviewId: number,
    parentCommentId: number,
    newCommentText: string
  ) {
    fetch(
      `${commentsReviewsUrl}${reviewId}?parentCommentId=${parentCommentId}&text=${newCommentText}`,
      { method: 'POST', headers: authGetHeader() }
    ).then(() => {
      loadComments(sortType);
    });
  }
  useEffect(() => {
    loadComments('newest');
  }, []);
  let commentsBlocks = getCommentBlocks(comments);
  const sortTypeOptions = [
    { value: 'newest', label: 'newest' },
    { value: 'oldest', label: 'oldest' },
    { value: 'mostLiked', label: 'mostLiked' },
    { value: 'highestDifference', label: 'highestDifference' },
  ];
  return (
    <div id='comments-view-wrapper'>
      <div id='comments-view-head'>
        <button
          id='root-comment-btn'
          style={{ backgroundColor: thirdColor }}
          onClick={() => {
            setIsRootCommentAddingFormOpened(!isRootCommentAddingFormOpened);
          }}
        >
          {isRootCommentAddingFormOpened ? 'Close adding form' : 'Add comment'}
        </button>
        {isRootCommentAddingFormOpened ? (
          <div id='root-comment-adding-form'>
            <textarea
              onChange={(val) => {
                setRootCommentText(val.target.value);
              }}
            ></textarea>
            <button
              id='root-comment-btn'
              style={{ backgroundColor: thirdColor }}
              onClick={() => {
                sendComment(review.id, -1, rootCommentText);
              }}
            >
              Send comment
            </button>
          </div>
        ) : (
          <></>
        )}
        <Select
          options={sortTypeOptions}
          defaultValue={sortTypeOptions[0]}
          onChange={(val) => {
            setSortType(val!.label);
            loadComments(val!.label);
          }}
        />
      </div>
      {commentsBlocks}
    </div>
  );
}
