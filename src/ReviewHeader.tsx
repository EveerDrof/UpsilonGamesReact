import { useEffect, useState } from 'react';
import { authGetHeader, votesReviewUrl, votesUrl } from './constants';
import './styles/ReviewHeader.css';
import dateFormat from "dateformat";
export function ReviewHeader({ reviewId, likes, dislikes, userName, loadReviews,creationDate}:
    {
        reviewId: number, commentaryId: number, likes: number, dislikes: number, userName: string,
        loadReviews: Function, userId: number,creationDate:number
    }) {
    const [vote, setVote]: [string, Function] = useState('');
    function loadVote() {
        fetch(`${votesReviewUrl}?reviewId=${reviewId}&userId=${localStorage.getItem('userId')}`).then(response => {
            if (response.status === 200) {
                response.json().then((json) => {
                    setVote('' + json.vote);
                });
            }
        });
    }
    function sendVoteAndUpdate(voteType: boolean) {
        let url = `${votesUrl}review?reviewId=${reviewId}&vote=${voteType}`;
        fetch(url, { method: 'POST', headers: authGetHeader() }).then(() => { loadReviews() }).then(
            () => { loadVote(); }
        );
    }
    useEffect(() => {
        loadVote();
    }, []);
    let customDateFormat ={year:'numeric',day:'numeric'};
    let formatedDate = dateFormat(new Date(creationDate),'yyyy/m/d hh:MM:ss');
    
    console.log('Vote is ', vote);
    return (
        <div className="header-line">
            <h2 className='review-header'>
                {userName}
            </h2>
            <h2 className='header-time'>
                {formatedDate}
            </h2>
            <div className='votes-block'>
                <button className={vote === 'true' ? 'vote-set' : 'vote-btn'}
                    onClick={() => { sendVoteAndUpdate(true); }}>+</button>
                <p>{likes}</p>
                <button className={vote === 'false' ? 'vote-set' : 'vote-btn'}
                    onClick={() => { sendVoteAndUpdate(false); }}>-</button>
                <p>{dislikes}</p>
            </div>
        </div>
    );
}