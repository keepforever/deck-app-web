import gql from 'graphql-tag';
import USER_FRAGMENT from '../f/USER_FRAGMENT';

export default gql`
    mutation(
        $name: String!
        $email: String!
        $password: String!
        $isAdmin: Boolean!
        $arenaHandle: String!
    ) {
        signup(
            name: $name
            email: $email
            arenaHandle: $arenaHandle
            password: $password
            isAdmin: $isAdmin
        ) {
            token
            user {
                ...UserInfo
            }
        }
    }
    ${USER_FRAGMENT}
`;
