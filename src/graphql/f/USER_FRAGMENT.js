import gql from 'graphql-tag';

export default gql`
    fragment UserInfo on User {
        id
        arenaHandle
        name
        email
        decks {
            id
            list
        }
    }
`;
