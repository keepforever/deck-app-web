import gql from 'graphql-tag';

export default gql`
  fragment UserInfo on User {
    name
    email
    id
  }
`;
