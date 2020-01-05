import { gql } from "apollo-server-express";

export let typeDefs = gql`
  type User {
    email: String!
    token: String
    username: String!
    bio: String
    image: String
  }

  type Article {
    slug: String
    title: String
    description: String
    body: String
    tagList: [String]
    createdAt: String
    updatedAt: String
    favoritesCount: Int
    userId: Int
  }

  type Comment {
    createdAt: String
    body: String
    author: User
  }

  type Query {
    users: [User]
    hi: String
    getProfile(username: String!): User
    getArticles(
      tag: String
      author: String
      favorited: String
      limit: Int
      offset: Int
    ): [Article]
    getArticle(slug: String!): Article
    getComments(slug: String!): [Comment]
    getTags: [String]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): User
    login(email: String!, password: String!): User
    updateUser(
      email: String
      username: String
      password: String
      image: String
      bio: String
    ): User
    followUser(username: String!): User
    unfollowUser(username: String!): User
    logout: Boolean
    addArticle(
      title: String!
      description: String!
      body: String!
      tagList: [String]
      userId: Int!
    ): Article
    updateArticle(
      slug: String!
      title: String
      description: String
      body: String
    ): Article
    deleteArticle(slug: String!): Article
    addComment(slug: String!, body: String!): Comment
    deleteComment(id: Int!): Comment
    favoriteArticle(slug: String!): Article
    unfavoriteArticle(slug: String!): Article
  }
`;
