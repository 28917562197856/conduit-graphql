import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};


export type Article = {
   __typename?: 'Article',
  slug?: Maybe<Scalars['String']>,
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  tagList?: Maybe<Array<Maybe<Scalars['String']>>>,
  createdAt?: Maybe<Scalars['String']>,
  updatedAt?: Maybe<Scalars['String']>,
  favoritesCount?: Maybe<Scalars['Int']>,
  userId?: Maybe<Scalars['Int']>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Comment = {
   __typename?: 'Comment',
  createdAt?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>,
  author?: Maybe<User>,
};

export type Mutation = {
   __typename?: 'Mutation',
  register?: Maybe<User>,
  login?: Maybe<User>,
  updateUser?: Maybe<User>,
  followUser?: Maybe<User>,
  unfollowUser?: Maybe<User>,
  logout?: Maybe<Scalars['Boolean']>,
  addArticle?: Maybe<Article>,
  updateArticle?: Maybe<Article>,
  deleteArticle?: Maybe<Article>,
  addComment?: Maybe<Comment>,
  deleteComment?: Maybe<Comment>,
  favoriteArticle?: Maybe<Article>,
  unfavoriteArticle?: Maybe<Article>,
};


export type MutationRegisterArgs = {
  username: Scalars['String'],
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationLoginArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationUpdateUserArgs = {
  email?: Maybe<Scalars['String']>,
  username?: Maybe<Scalars['String']>,
  password?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
  bio?: Maybe<Scalars['String']>
};


export type MutationFollowUserArgs = {
  username: Scalars['String']
};


export type MutationUnfollowUserArgs = {
  username: Scalars['String']
};


export type MutationAddArticleArgs = {
  title: Scalars['String'],
  description: Scalars['String'],
  body: Scalars['String'],
  tagList?: Maybe<Array<Maybe<Scalars['String']>>>,
  userId: Scalars['Int']
};


export type MutationUpdateArticleArgs = {
  slug: Scalars['String'],
  title?: Maybe<Scalars['String']>,
  description?: Maybe<Scalars['String']>,
  body?: Maybe<Scalars['String']>
};


export type MutationDeleteArticleArgs = {
  slug: Scalars['String']
};


export type MutationAddCommentArgs = {
  slug: Scalars['String'],
  body: Scalars['String']
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Int']
};


export type MutationFavoriteArticleArgs = {
  slug: Scalars['String']
};


export type MutationUnfavoriteArticleArgs = {
  slug: Scalars['String']
};

export type Query = {
   __typename?: 'Query',
  users?: Maybe<Array<Maybe<User>>>,
  hi?: Maybe<Scalars['String']>,
  getProfile?: Maybe<User>,
  getArticles?: Maybe<Array<Maybe<Article>>>,
  getArticle?: Maybe<Article>,
  getComments?: Maybe<Array<Maybe<Comment>>>,
  getTags?: Maybe<Array<Maybe<Scalars['String']>>>,
};


export type QueryGetProfileArgs = {
  username: Scalars['String']
};


export type QueryGetArticlesArgs = {
  tag?: Maybe<Scalars['String']>,
  author?: Maybe<Scalars['String']>,
  favorited?: Maybe<Scalars['String']>,
  limit?: Maybe<Scalars['Int']>,
  offset?: Maybe<Scalars['Int']>
};


export type QueryGetArticleArgs = {
  slug: Scalars['String']
};


export type QueryGetCommentsArgs = {
  slug: Scalars['String']
};


export type User = {
   __typename?: 'User',
  email: Scalars['String'],
  token?: Maybe<Scalars['String']>,
  username: Scalars['String'],
  bio?: Maybe<Scalars['String']>,
  image?: Maybe<Scalars['String']>,
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  User: ResolverTypeWrapper<User>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Article: ResolverTypeWrapper<Article>,
  Comment: ResolverTypeWrapper<Comment>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  CacheControlScope: CacheControlScope,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  User: User,
  String: Scalars['String'],
  Int: Scalars['Int'],
  Article: Article,
  Comment: Comment,
  Mutation: {},
  Boolean: Scalars['Boolean'],
  CacheControlScope: CacheControlScope,
  Upload: Scalars['Upload'],
}>;

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = {   maxAge?: Maybe<Maybe<Scalars['Int']>>,
  scope?: Maybe<Maybe<CacheControlScope>> }> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ArticleResolvers<ContextType = any, ParentType extends ResolversParentTypes['Article'] = ResolversParentTypes['Article']> = ResolversObject<{
  slug?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  tagList?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  favoritesCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
  userId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>,
}>;

export type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Comment'] = ResolversParentTypes['Comment']> = ResolversObject<{
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  body?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  author?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  register?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationRegisterArgs, 'username' | 'email' | 'password'>>,
  login?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationLoginArgs, 'email' | 'password'>>,
  updateUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, MutationUpdateUserArgs>,
  followUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationFollowUserArgs, 'username'>>,
  unfollowUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUnfollowUserArgs, 'username'>>,
  logout?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>,
  addArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationAddArticleArgs, 'title' | 'description' | 'body' | 'userId'>>,
  updateArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationUpdateArticleArgs, 'slug'>>,
  deleteArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationDeleteArticleArgs, 'slug'>>,
  addComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationAddCommentArgs, 'slug' | 'body'>>,
  deleteComment?: Resolver<Maybe<ResolversTypes['Comment']>, ParentType, ContextType, RequireFields<MutationDeleteCommentArgs, 'id'>>,
  favoriteArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationFavoriteArticleArgs, 'slug'>>,
  unfavoriteArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<MutationUnfavoriteArticleArgs, 'slug'>>,
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  users?: Resolver<Maybe<Array<Maybe<ResolversTypes['User']>>>, ParentType, ContextType>,
  hi?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  getProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetProfileArgs, 'username'>>,
  getArticles?: Resolver<Maybe<Array<Maybe<ResolversTypes['Article']>>>, ParentType, ContextType, QueryGetArticlesArgs>,
  getArticle?: Resolver<Maybe<ResolversTypes['Article']>, ParentType, ContextType, RequireFields<QueryGetArticleArgs, 'slug'>>,
  getComments?: Resolver<Maybe<Array<Maybe<ResolversTypes['Comment']>>>, ParentType, ContextType, RequireFields<QueryGetCommentsArgs, 'slug'>>,
  getTags?: Resolver<Maybe<Array<Maybe<ResolversTypes['String']>>>, ParentType, ContextType>,
}>;

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  token?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  username?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Article?: ArticleResolvers<ContextType>,
  Comment?: CommentResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = ResolversObject<{
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>,
}>;


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;