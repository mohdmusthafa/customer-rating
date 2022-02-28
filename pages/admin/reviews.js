import { withAuthenticator } from '@aws-amplify/ui-react';
import { List, Rating } from 'semantic-ui-react';
const Reviews = () => {
    const reviews = [
        {
            id: 'xx1',
            vehicle_no: 'KLXXA0123',
            phone_no: "7902559756",
            rating: 3
        }
        ,{
            id: 'xx2',
            vehicle_no: 'KLXXA0123',
            phone_no: "7902559756",
            rating: 5
        }
    ]
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