import { useEffect, useState } from "react";
import { reviewsUrl } from "./constants";
import { ReviewAddingForm } from "./ReviewAddingForm";
import './styles/ReviewsSection.css'
import { Review } from "./utils";
export function ReviewsSection({ gameName }: { gameName: string }) {
    const [reviews, setReviews]: [Review[], Function] = useState([]);
    function loadReviews() {
        let url = `${reviewsUrl}?gameName=${gameName}&sort=newest&userId=-1&reviewsNumber=10`;
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
        reviewsBlocks.push(
            <div className='review-block'>
                <h2 className='review-header'>
                    {val.userId.name}
                </h2>
                <p>
                    {val.reviewText}
                </p>
            </div>);
    });
    return (
        <div>
            <ReviewAddingForm loadReviews={loadReviews} gameName={gameName}/>
            <div id='reviews-layout'>
                {reviewsBlocks}
            </div>
        </div>
    );
}