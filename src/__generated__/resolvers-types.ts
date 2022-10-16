import { GraphQLResolveInfo } from 'graphql';
import { Member, Product, Review, ReviewLike, ReviewHate } from 'src/entity';
import { MyContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Member = {
  __typename?: 'Member';
  email: Scalars['String'];
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** 리뷰 생성 */
  createReview: Review;
  /** 리뷰 싫어요 생성 */
  createReviewHate: Review;
  /** 리뷰 좋아요 생성 */
  createReviewLike: Review;
  /** 리뷰 삭제 */
  deleteReview: Scalars['ID'];
  /** 리뷰 싫어요 삭제 */
  deleteReviewHate: Scalars['ID'];
  /** 리뷰 좋아요 삭제 */
  deleteReviewLike: Scalars['ID'];
};


export type MutationCreateReviewArgs = {
  input: ReviewCreateInput;
};


export type MutationCreateReviewHateArgs = {
  input: ReviewHateCreateInput;
};


export type MutationCreateReviewLikeArgs = {
  input: ReviewLikeCreateInput;
};


export type MutationDeleteReviewArgs = {
  reviewId: Scalars['ID'];
};


export type MutationDeleteReviewHateArgs = {
  reviewHateId: Scalars['ID'];
};


export type MutationDeleteReviewLikeArgs = {
  reviewLikeId: Scalars['ID'];
};

export type Product = {
  __typename?: 'Product';
  id: Scalars['ID'];
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  reviews?: Maybe<Array<Review>>;
};

export type Review = {
  __typename?: 'Review';
  content: Scalars['String'];
  hateCount: Scalars['Int'];
  id: Scalars['ID'];
  keywords?: Maybe<Array<ReviewKeyword>>;
  likeCount: Scalars['Int'];
  product: Product;
};

export type ReviewCreateInput = {
  content: Scalars['String'];
  keywordIds?: InputMaybe<Array<Scalars['ID']>>;
  productId: Scalars['ID'];
};

export type ReviewHate = {
  __typename?: 'ReviewHate';
  id: Scalars['ID'];
  review: Review;
};

export type ReviewHateCreateInput = {
  memberId: Scalars['ID'];
  reviewId: Scalars['ID'];
};

export type ReviewKeyword = {
  __typename?: 'ReviewKeyword';
  id: Scalars['ID'];
  title: Scalars['String'];
};

export type ReviewLike = {
  __typename?: 'ReviewLike';
  id: Scalars['ID'];
  review: Review;
};

export type ReviewLikeCreateInput = {
  memberId: Scalars['ID'];
  reviewId: Scalars['ID'];
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

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
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Member: ResolverTypeWrapper<Member>;
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<Product>;
  Query: ResolverTypeWrapper<{}>;
  Review: ResolverTypeWrapper<Review>;
  ReviewCreateInput: ReviewCreateInput;
  ReviewHate: ResolverTypeWrapper<ReviewHate>;
  ReviewHateCreateInput: ReviewHateCreateInput;
  ReviewKeyword: ResolverTypeWrapper<ReviewKeyword>;
  ReviewLike: ResolverTypeWrapper<ReviewLike>;
  ReviewLikeCreateInput: ReviewLikeCreateInput;
  String: ResolverTypeWrapper<Scalars['String']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  Int: Scalars['Int'];
  Member: Member;
  Mutation: {};
  Product: Product;
  Query: {};
  Review: Review;
  ReviewCreateInput: ReviewCreateInput;
  ReviewHate: ReviewHate;
  ReviewHateCreateInput: ReviewHateCreateInput;
  ReviewKeyword: ReviewKeyword;
  ReviewLike: ReviewLike;
  ReviewLikeCreateInput: ReviewLikeCreateInput;
  String: Scalars['String'];
}>;

export type MemberResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Member'] = ResolversParentTypes['Member']> = ResolversObject<{
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createReview?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationCreateReviewArgs, 'input'>>;
  createReviewHate?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationCreateReviewHateArgs, 'input'>>;
  createReviewLike?: Resolver<ResolversTypes['Review'], ParentType, ContextType, RequireFields<MutationCreateReviewLikeArgs, 'input'>>;
  deleteReview?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteReviewArgs, 'reviewId'>>;
  deleteReviewHate?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteReviewHateArgs, 'reviewHateId'>>;
  deleteReviewLike?: Resolver<ResolversTypes['ID'], ParentType, ContextType, RequireFields<MutationDeleteReviewLikeArgs, 'reviewLikeId'>>;
}>;

export type ProductResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  reviews?: Resolver<Maybe<Array<ResolversTypes['Review']>>, ParentType, ContextType>;
}>;

export type ReviewResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['Review'] = ResolversParentTypes['Review']> = ResolversObject<{
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  hateCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  keywords?: Resolver<Maybe<Array<ResolversTypes['ReviewKeyword']>>, ParentType, ContextType>;
  likeCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  product?: Resolver<ResolversTypes['Product'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReviewHateResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ReviewHate'] = ResolversParentTypes['ReviewHate']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  review?: Resolver<ResolversTypes['Review'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReviewKeywordResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ReviewKeyword'] = ResolversParentTypes['ReviewKeyword']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ReviewLikeResolvers<ContextType = MyContext, ParentType extends ResolversParentTypes['ReviewLike'] = ResolversParentTypes['ReviewLike']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  review?: Resolver<ResolversTypes['Review'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = MyContext> = ResolversObject<{
  Member?: MemberResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Review?: ReviewResolvers<ContextType>;
  ReviewHate?: ReviewHateResolvers<ContextType>;
  ReviewKeyword?: ReviewKeywordResolvers<ContextType>;
  ReviewLike?: ReviewLikeResolvers<ContextType>;
}>;

