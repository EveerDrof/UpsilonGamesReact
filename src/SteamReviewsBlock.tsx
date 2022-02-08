import { JsxElement } from 'typescript';
import { darkColor, grayColor, secondaryColor } from './Colors/colors';
import { ForeignReviewsDataSteam } from './utils';
import './styles/SteamReviewsBlock.css';
import { getTextData } from './constants';

export function SteamReviewsBlock({
  steamReviewsData,
}: {
  steamReviewsData: ForeignReviewsDataSteam;
}) {
  const textData = getTextData().steamReviewData;
  let reviewsElements: JSX.Element[] = [];
  let reviews = steamReviewsData.reviewsSiteObject.reviews;
  reviews?.forEach((val) => {
    reviewsElements.push(
      <h3
        style={{ color: darkColor, backgroundColor: grayColor }}
        className='steam-review'
      >
        {val.review}
      </h3>
    );
  });
  const querySummary = steamReviewsData.reviewsSiteObject.query_summary;
  return (
    <div>
      <div id='steam-review-header-block'>
        <h1 style={{ color: darkColor }}>{textData.steamReviewsHead} : </h1>
        <div id='steam-review-header-flex'>
          <div
            className='steam-review-header-column'
            style={{ backgroundColor: secondaryColor }}
          >
            <h1 style={{ color: darkColor }}>
              {textData.reviewSummary} : {querySummary.review_score_desc}
            </h1>
            <h1 style={{ color: darkColor }}>
              {textData.totalReviewsNumber} : {querySummary.total_reviews}
            </h1>
          </div>
          <div
            className='steam-review-header-column'
            style={{ backgroundColor: secondaryColor }}
          >
            <h1 style={{ color: darkColor }}>
              {textData.positiveReviewsNumber} : {querySummary.total_positive}
            </h1>
            <h1 style={{ color: darkColor }}>
              {textData.negativeReviewsNumber}: {querySummary.total_negative}
            </h1>
          </div>
        </div>
        <h1 style={{ color: darkColor }}>{textData.steamReviews} : </h1>
      </div>
      <div>{reviewsElements}</div>
    </div>
  );
}
