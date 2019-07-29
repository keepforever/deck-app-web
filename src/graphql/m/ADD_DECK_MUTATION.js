import gql from 'graphql-tag';
import DECK_FRAGMENT from '../f/DECK_FRAGMENT';

export default gql`
    mutation($title: String!, $list: String!, $token: String!) {
        createDeck(title: $title, list: $list, token: $token) {
            ...DeckInfo
        }
    }
    ${DECK_FRAGMENT}
`;
