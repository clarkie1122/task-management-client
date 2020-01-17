import { gql } from 'apollo-boost';

export const typeDefs = gql`
  extend type User {
    id: Number!
    username: String!
  }

  extend type Mutation {
    SetCurrentUser(user: User!): User!
  }
`;

const GET_CURRENT_USER = gql`
  {
    currentUser @client
  }
`;

export const resolvers = {
    Mutation: {
        setCurrentUser: (_root, { user }, { cache }) => {
            cache.writeQuery({
                query: GET_CURRENT_USER,
                data: { currentUser: user }
            });

            return user;
        }
    }
};