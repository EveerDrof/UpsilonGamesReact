import { useEffect, useState } from 'react';
import { CommentElement } from './CommentElement';
import { authGetHeader, commentsReviewsUrl, getTextData } from './constants';
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
        return data.json();
      })
      .then((json) => {
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
  const textData = getTextData();
  const searchTextData = textData.reviews.search;
  const commentsTextData = textData.comment;
  const sortTypeOptions = [
    { value: 'newest', label: searchTextData.newest },
    { value: 'oldest', label: searchTextData.oldest },
    { value: 'mostLiked', label: searchTextData.mostLiked },
    { value: 'highestDifference', label: searchTextData.highestDifference },
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
          {isRootCommentAddingFormOpened
            ? commentsTextData.closeAddingForm
            : commentsTextData.addComment}
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
              {commentsTextData.submitComment}
            </button>
          </div>
        ) : (
          <></>
        )}
        <Select
          options={sortTypeOptions}
          defaultValue={sortTypeOptions[0]}
          onChange={(val) => {
            setSortType(val!.value);
            loadComments(val!.value);
          }}
        />
      </div>
      {commentsBlocks}
    </div>
  );
}
