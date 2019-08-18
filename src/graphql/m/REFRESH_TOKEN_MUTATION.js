import gql from 'graphql-tag';

export default gql`
    mutation {
        refreshToken {
            token
            userId
        }
    }
`;
