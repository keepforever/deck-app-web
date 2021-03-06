import gql from 'graphql-tag';
import DECK_FRAGMENT from '../f/DECK_FRAGMENT';

export default gql`
    mutation($id: ID!, $altList: String!) {
        deckAltList(id: $id, altList: $altList) {
            ...DeckInfo
        }
    }
    ${DECK_FRAGMENT}
`;
