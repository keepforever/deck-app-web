import gql from 'graphql-tag';
import DECK_FRAGMENT from '../f/DECK_FRAGMENT';
import USER_FRAGMENT from '../f/USER_FRAGMENT';


export default gql`
  query ($first: Int!, $after: String ){
    decksConnection(
      first: $first,
      after: $after
    ){
      pageInfo{
        hasNextPage
        endCursor
      }
      edges{
        node{
          ...DeckInfo
          author{
            ...UserInfo
          }
        }
      }
      aggregate{
        count
      }
    }
  }
  ${DECK_FRAGMENT}
  ${USER_FRAGMENT}
`;
