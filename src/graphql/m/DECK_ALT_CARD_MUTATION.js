import gql from 'graphql-tag';
import DECK_FRAGMENT from '../f/DECK_FRAGMENT';

export default gql`
    mutation($id: ID!, $altCard: String!) {
        deckAltCard(id: $id, altCard: $altCard) {
            ...DeckInfo
        }
    }
    ${DECK_FRAGMENT}
`;
