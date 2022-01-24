import { useState } from 'react';
import { secondaryColor } from './Colors/colors';
import { authGetHeader, reviewsUrl } from './constants';
import './styles/ReviewAddingForm.css';
export function ReviewAddingForm({
  loadReviews,
  gameName,
}: {
  loadReviews: Function;
  gameName: string;
}) {
  const [isExpanded, setIsExpanded]: [boolean, Function] = useState(false);
  return (
    <div id='review-adding-form-wrapper'>
      <button
        style={{ backgroundColor: secondaryColor }}
        id='review-adding-btn'
        onClick={() => {
          setIsExpanded(!isExpanded);
        }}
      >
        {isExpanded ? '-' : '+'}
      </button>
      {isExpanded ? (
        <div id='review-adding-form'>
          <textarea id='review-text-area'></textarea>
          <br />
          <button
            style={{ backgroundColor: secondaryColor }}
            id='send-review-btn'
            onClick={() => {
              let text = (
                document.getElementById(
                  'review-text-area'
                ) as HTMLTextAreaElement
              ).value;
              fetch(`${reviewsUrl}?gameName=${gameName}`, {
                method: 'POST',
                body: text,
                headers: authGetHeader(),
              }).then(() => {
                loadReviews();
              });
            }}
          >
            Send
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}
