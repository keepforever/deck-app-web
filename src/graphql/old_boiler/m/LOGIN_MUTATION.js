import gql from "graphql-tag";
import USER_FRAGMENT from '../f/USER_FRAGMENT';

export default gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      payload {
        token
        user {
          ...UserInfo
        }
      }
      error {
        msg
        field
      }
    }
  }
  ${USER_FRAGMENT}
`;
