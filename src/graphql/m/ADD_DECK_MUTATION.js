import gql from 'graphql-tag';
import DECK_FRAGMENT from '../f/DECK_FRAGMENT';

export default gql`
    mutation($title: String!, $list: String!, $sideBoardList: String!) {
        createDeck(title: $title, list: $list, sideBoardList: $sideBoardList) {
            ...DeckInfo
        }
    }
    ${DECK_FRAGMENT}
`;
