import gql from "graphql-tag";
import USER_FRAGMENT from '../f/USER_FRAGMENT';

export default gql`
  mutation (
    $name: String!,
    $email: String!,
    $password: String!
    $isAdmin: Boolean!
  ) {
    userSignup(
      name: $name,
      email: $email,
      password: $password,
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
