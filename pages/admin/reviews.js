import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { List, Rating } from 'semantic-ui-react';
const Reviews = () => {
    const [reviews, setReviews] = useState([]);
    const apiName = "review"
    const fetchReviews = async () => {
        const body = {

        }
        const response = await API.post(apiName, '/reviews', {
            body: body
        })
        const items = response["Items"];
        setReviews(items)
    }
    useEffect(() => {
       fetchReviews();
    }, [])
    return (
        <div className="container">
            <h1>Reviews</h1>
            <div>
                <List divided relaxed>
                    { reviews.map(item => (
                        <List.Item key={item.id}>
                        <List.Content>
                            <List.Header>{item.vehicle_no}</List.Header>
                            <List.Description>{item.phone_no} <Rating defaultRating={item.rating} maxRating={5} disabled/></List.Description>
                        </List.Content>
                    </List.Item>
                    ))}
                </List>
            </div>
        </div>
    )
}

export default withAuthenticator(Reviews);