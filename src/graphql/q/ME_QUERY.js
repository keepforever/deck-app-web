import gql from 'graphql-tag';
import USER_FRAGMENT from '../f/USER_FRAGMENT';

export default gql`
    query {
        me {
            ...UserInfo
        }
    }
    ${USER_FRAGMENT}
`;
