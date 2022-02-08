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
      <h2
        style={{ color: darkColor, backgroundColor: grayColor }}
        className='steam-review'
      >
        {val.review}
      </h2>
    );
  });
  const querySummary = steamReviewsData.reviewsSiteObject.query_summary;
  return (
    <div>
      <div id='steam-review-header-block'>
        <h2 style={{ color: darkColor }}>{textData.steamReviewsHead} : </h2>
        <div id='steam-review-header-flex'>
          <div
            className='steam-review-header-column'
            style={{ backgroundColor: secondaryColor }}
          >
            <h2 style={{ color: darkColor }}>
              {textData.reviewSummary} : {querySummary.review_score_desc}
            </h2>
            <h2 style={{ color: darkColor }}>
              {textData.totalReviewsNumber} : {querySummary.total_reviews}
            </h2>
          </div>
          <div
            className='steam-review-header-column'
            style={{ backgroundColor: secondaryColor }}
          >
            <h2 style={{ color: darkColor }}>
              {textData.positiveReviewsNumber} : {querySummary.total_positive}
            </h2>
            <h2 style={{ color: darkColor }}>
              {textData.negativeReviewsNumber}: {querySummary.total_negative}
            </h2>
          </div>
        </div>
        <h2 style={{ color: darkColor }}>{textData.steamReviews} : </h2>
      </div>
      <div>{reviewsElements}</div>
    </div>
  );
}
