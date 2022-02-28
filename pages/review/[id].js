import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { Rating } from 'semantic-ui-react';
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';
import PageHead from '../../components/PageHead';
import ThankYou from './thankyou';

function Review() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState({});
    
    const router = useRouter();
    const { id } = router.query;

    const apiName = "review"

    const preFetch = async () => {
        const response = await API.get(apiName, `/review/${id}`);
        setReview(response);
        if (response.rating !== null) {
            router.push('/review/thankyou')
        }
    }

    useEffect(() => {
        if(!router.isReady) return;
        preFetch()
    }, [router.isReady]);

    const handleRating = (e, { rating }) => {
        setRating(rating);
    }
    
    const handleSubmit = async () => {
        const request = {
            rating: rating,
            timestamp: review.timestamp
        }

        const response = await API.put(apiName, `/review/${id}`, {
            body: request
        })

        console.log(response)
        router.push('/review/thankyou')
    }

    return (
        <div className={styles.container}>
            <PageHead />
            <h1>Give Us Feedback</h1>
            <p>Your Feedback is important to us. Please rate our service</p>
            <Rating maxRating={5} icon='star' size='massive' onRate={handleRating} /> 
            {rating ? (
                <div>
                    <button onClick={handleSubmit} className={styles.submit_btn}>Submit</button>
                </div>
            ) : null}
            
        </div>
    )
}

export default Review