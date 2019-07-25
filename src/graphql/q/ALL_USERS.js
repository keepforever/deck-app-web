import gql from 'graphql-tag';
import USER_FRAGMENT from '../f/USER_FRAGMENT';
// import DECK_FRAGMENT from '../f/DECK_FRAGMENT';

export default gql`
    query {
        feedUsers {
            ...UserInfo
        }
    }
    ${USER_FRAGMENT}
`;
