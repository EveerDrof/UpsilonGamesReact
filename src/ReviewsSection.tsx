import { useEffect, useState } from "react";
import { reviewsUrl } from "./constants";
import { ReviewAddingForm } from "./ReviewAddingForm";
import './styles/ReviewsSection.css'
import { FullGameRecord, Review } from "./utils";
import { ReviewHeader } from "./ReviewHeader";
import Select from 'react-select';
export function ReviewsSection({ game, isGameInLibrary }: {
    game: FullGameRecord,
    isGameInLibrary: boolean
}) {
    const [reviews, setReviews]: [Review[], Function] = useState([]);
    function loadReviews(sortType :string= 'newest') {
        let url = `${reviewsUrl}?gameName=${game.name}&sort=${sortType}&userId=-1&reviewsNumber=10`;
        fetch(url, {}).then(data => data.json()).then((json) => {
            setReviews(json);
        });
    }
    useEffect(() => {
        loadReviews('newest');
    }, []);
    let reviewsBlocks: JSX.Element[] = [];
    if (reviews && reviews.length !== 0) {
        console.log('Reviews ',reviews);
        reviews.forEach((val) => {
            console.log('Review',val);
            reviewsBlocks.push(
                <div className='review-block'>
                    <ReviewHeader reviewId={val.id} commentaryId={-1} likes={val.likesNumber}
                        dislikes={val.dislikesNumber} userName={val.userId.name}
                        userId={val.userId.id}
                        creationDate={val.creationDate}
                        loadReviews={loadReviews} key={val.id}
                    />
                    <p style={{ whiteSpace: 'pre-line' }}>
                        {val.reviewText}
                    </p>
                </div>);
        });
    }
    let sortOptions = [
        { value: 'newest', label: 'newest' },
        { value: 'oldest', label: 'oldest' },
        { value: 'mostLiked', label: 'mostLiked' },
        { value: 'highestDifference', label: 'highestDifference' },
    ];
    return (
        <div id='reviews-section'>
            {isGameInLibrary ?
                <ReviewAddingForm loadReviews={loadReviews} gameName={game.name} />
                :
                <></>
            }
            <Select id='sort-select' options={sortOptions} defaultValue={sortOptions[0]}
                onChange={(val) => {loadReviews(val!.label); }} />
            <div id='reviews-layout'>
                {reviewsBlocks}
            </div>
        </div>
    );
}