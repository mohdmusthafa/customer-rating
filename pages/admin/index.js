import { withAuthenticator } from "@aws-amplify/ui-react";
import PageHead from '../../components/PageHead';
import styles from '../../styles/Home.module.css';
function Admin({ user }) {
    return (
        <div className={styles.container}>
            <PageHead title='Admin' />
            {user.username}
        </div>
    )
}

export default withAuthenticator(Admin);