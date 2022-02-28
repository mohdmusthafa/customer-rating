import { useState, useEffect } from 'react';
import { Rating } from 'semantic-ui-react';
import styles from '../../styles/Home.module.css'
import { useRouter } from 'next/router';
import PageHead from '../../components/PageHead';
import ThankYou from './thankyou';

function Review() {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState({})
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const data = {
            id: 'xx2',
            vehicle_no: "KLXXLXXXX",
            phone_no: "+917902559756",
            rating: null,
            timestamp: 102391030391
        }

        setReview(data);

        if (data.rating !== null) {
            router.push('/review/thankyou')
        }
    }, [])
    const handleRating = (e, { rating }) => {
        setRating(rating);
    }
    
    const handleSubmit = () => {
        const request = {
            id: id,
            rating: rating
        }

        console.log(request)
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

export default Review;