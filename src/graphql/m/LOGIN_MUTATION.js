import gql from 'graphql-tag';
import USER_FRAGMENT from '../f/USER_FRAGMENT';

export default gql`
    mutation($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                ...UserInfo
            }
            
        }
    }
    ${USER_FRAGMENT}
`;
