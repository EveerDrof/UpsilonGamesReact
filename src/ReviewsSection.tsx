import { useEffect, useState } from "react";
import { reviewsUrl } from "./constants";
import { ReviewAddingForm } from "./ReviewAddingForm";
import './styles/ReviewsSection.css'
import { FullGameRecord, Review } from "./utils";
import { ReviewHeader } from "./ReviewHeader";
export function ReviewsSection({ game }: { game: FullGameRecord }) {
    const [reviews, setReviews]: [Review[], Function] = useState([]);
    function loadReviews() {
        let url = `${reviewsUrl}?gameName=${game.name}&sort=newest&userId=-1&reviewsNumber=10`;
        fetch(url, {}).then(data => data.json()).then((json) => {
            console.log('Json is ', json);
            setReviews(json);
        });
    }
    useEffect(() => {
        loadReviews();
    }, []);
    let reviewsBlocks: JSX.Element[] = [];
    reviews.forEach((val) => {
        console.log('Val', val);
        reviewsBlocks.push(
            <div className='review-block'>
                <ReviewHeader reviewId={val.id} commentaryId={-1} likes={val.likesNumber}
                    dislikes={val.dislikesNumber} userName={val.userId.name}
                    userId={val.userId.id} 
                    loadReviews={loadReviews} key={val.id}
                />
                <p style={{ whiteSpace: 'pre-line' }}>
                    {val.reviewText}
                </p>
            </div>);
    });
    return (
        <div>
            <ReviewAddingForm loadReviews={loadReviews} gameName={game.name} />
            <div id='reviews-layout'>
                {reviewsBlocks}
            </div>
        </div>
    );
}