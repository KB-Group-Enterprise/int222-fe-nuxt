export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Category = {
  __typename?: 'Category';
  categoryId: Scalars['Int'];
  categoryName: Scalars['String'];
};

export type CategoryInput = {
  categoryId: Scalars['Int'];
  categoryName: Scalars['String'];
};

export type CreateReviewInput = {
  comment: Scalars['String'];
  gameId: Scalars['Float'];
  rating: Scalars['Int'];
  userId: Scalars['String'];
};

export type CreateVoteInput = {
  isUpvote: Scalars['Int'];
  reviewId: Scalars['Int'];
  userId: Scalars['String'];
};

export type CredentialInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type DeleteGameOutput = {
  __typename?: 'DeleteGameOutput';
  gameId: Scalars['Int'];
  status: Scalars['String'];
};

export type DeleteOutput = {
  __typename?: 'DeleteOutput';
  id: Scalars['Int'];
  status: Scalars['String'];
};

export type DeleteUserInput = {
  userId: Scalars['String'];
};

export type ForgotPasswordInput = {
  newPassword: Scalars['String'];
  restoreAnswer: Scalars['String'];
  userId: Scalars['String'];
  username: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  basePrice: Scalars['Float'];
  categories: Array<Category>;
  description: Scalars['String'];
  gameId: Scalars['Int'];
  gameName: Scalars['String'];
  images: Array<GameImage>;
  publisher: Publisher;
  rating?: Maybe<Scalars['Int']>;
  releaseDate: Scalars['String'];
  retailers: Array<Retailer>;
  reviews: Array<Review>;
};

export type GameImage = {
  __typename?: 'GameImage';
  name: Scalars['String'];
};

export type ImageOutPut = {
  __typename?: 'ImageOutPut';
  imageName: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCategory: Category;
  addGame: Game;
  addGameWithImages: Game;
  addPublisher: Publisher;
  addRetailer: Retailer;
  createReview: Review;
  createVote: Vote;
  deleteCategory: DeleteOutput;
  deleteGame: DeleteGameOutput;
  deletePublisher: DeleteOutput;
  deleteRetailer: DeleteOutput;
  deleteReview: ResponseStatus;
  deleteUser: Scalars['Boolean'];
  deleteVote: ResponseStatus;
  forgotPassword: Scalars['String'];
  getRestoreQuestion: RestoreQuestionOutput;
  login: Scalars['String'];
  logout: Scalars['Boolean'];
  me: User;
  refreshToken: Scalars['Boolean'];
  register: Scalars['String'];
  updateCategory: Category;
  updateGame: Game;
  updateGameWithImages: Game;
  updatePublisher: Publisher;
  updateRetailer: Retailer;
  updateReview: Review;
  updateRole: Scalars['Boolean'];
  updateVote: Vote;
  uploadProfileImage: ImageOutPut;
};


export type MutationAddCategoryArgs = {
  addCategoryData: NewCategoryInput;
};


export type MutationAddGameArgs = {
  newGameData: NewGameInput;
};


export type MutationAddGameWithImagesArgs = {
  files: Array<Scalars['Upload']>;
  newGameData: NewGameInput;
};


export type MutationAddPublisherArgs = {
  addPublisherData: NewPublisherInput;
};


export type MutationAddRetailerArgs = {
  addRetailerData: NewRetailerInput;
};


export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput;
};


export type MutationCreateVoteArgs = {
  createVoteInput: CreateVoteInput;
};


export type MutationDeleteCategoryArgs = {
  categoryId: Scalars['Int'];
};


export type MutationDeleteGameArgs = {
  gameId: Scalars['Int'];
};


export type MutationDeletePublisherArgs = {
  publisherId: Scalars['Int'];
};


export type MutationDeleteRetailerArgs = {
  retailerId: Scalars['Int'];
};


export type MutationDeleteReviewArgs = {
  id: Scalars['Int'];
};


export type MutationDeleteUserArgs = {
  deleteData: DeleteUserInput;
};


export type MutationDeleteVoteArgs = {
  id: Scalars['Int'];
};


export type MutationForgotPasswordArgs = {
  newData: ForgotPasswordInput;
};


export type MutationGetRestoreQuestionArgs = {
  username: Scalars['String'];
};


export type MutationLoginArgs = {
  credential: CredentialInput;
};


export type MutationRegisterArgs = {
  registerData: RegisterInput;
};


export type MutationUpdateCategoryArgs = {
  updateCategoryData: CategoryInput;
};


export type MutationUpdateGameArgs = {
  updateGameData: UpdateGameInput;
};


export type MutationUpdateGameWithImagesArgs = {
  files: Array<Scalars['Upload']>;
  newGameData: UpdateGameInput;
};


export type MutationUpdatePublisherArgs = {
  updatePublisherData: PublisherInput;
};


export type MutationUpdateRetailerArgs = {
  updateRetailerData: RetailerInput;
};


export type MutationUpdateReviewArgs = {
  updateReviewInput: UpdateReviewInput;
};


export type MutationUpdateRoleArgs = {
  updateRoleData: UpdateRoleInput;
};


export type MutationUpdateVoteArgs = {
  updateVoteInput: UpdateVoteInput;
};


export type MutationUploadProfileImageArgs = {
  file: Scalars['Upload'];
};

export type NewCategoryInput = {
  categoryName: Scalars['String'];
};

export type NewGameInput = {
  basePrice: Scalars['Float'];
  categories: Array<CategoryInput>;
  description: Scalars['String'];
  gameName: Scalars['String'];
  publisher: PublisherInput;
  releaseDate: Scalars['String'];
  retailers: Array<RetailerInput>;
};

export type NewPublisherInput = {
  publisherName: Scalars['String'];
};

export type NewRetailerInput = {
  retailerName: Scalars['String'];
};

export type Publisher = {
  __typename?: 'Publisher';
  publisherId: Scalars['Int'];
  publisherName: Scalars['String'];
};

export type PublisherInput = {
  publisherId: Scalars['Int'];
  publisherName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  categories: Array<Category>;
  category: Category;
  game: Game;
  gameWithReviews: Game;
  games: Array<Game>;
  publisher: Publisher;
  publishers: Array<Publisher>;
  questions: Array<RestoreQuestion>;
  retailer: Retailer;
  retailers: Array<Retailer>;
  review: Review;
  reviewByGameId: Array<Review>;
  reviews: Array<Review>;
  user: User;
  users: Array<User>;
  votes: Array<Vote>;
};


export type QueryCategoryArgs = {
  categoryId: Scalars['Int'];
};


export type QueryGameArgs = {
  gameId: Scalars['Int'];
};


export type QueryGameWithReviewsArgs = {
  gameId: Scalars['Int'];
};


export type QueryPublisherArgs = {
  publisherId: Scalars['Int'];
};


export type QueryRetailerArgs = {
  retailerId: Scalars['Int'];
};


export type QueryReviewArgs = {
  id: Scalars['Int'];
};


export type QueryReviewByGameIdArgs = {
  id: Scalars['Int'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};

export type RegisterInput = {
  confirmPassword: Scalars['String'];
  password: Scalars['String'];
  questionId: Scalars['Float'];
  restoreAnswer: Scalars['String'];
  username: Scalars['String'];
};

export type ResponseStatus = {
  __typename?: 'ResponseStatus';
  message: Scalars['String'];
  status: Scalars['Int'];
};

export type RestoreQuestion = {
  __typename?: 'RestoreQuestion';
  question: Scalars['String'];
  questionId: Scalars['Float'];
};

export type RestoreQuestionOutput = {
  __typename?: 'RestoreQuestionOutput';
  question: RestoreQuestion;
  userId: Scalars['String'];
};

export type Retailer = {
  __typename?: 'Retailer';
  retailerId: Scalars['Int'];
  retailerName: Scalars['String'];
};

export type RetailerInput = {
  retailerId: Scalars['Int'];
  retailerName: Scalars['String'];
};

export type Review = {
  __typename?: 'Review';
  comment: Scalars['String'];
  game: Game;
  rating: Scalars['Float'];
  reviewId: Scalars['Int'];
  reviewer: User;
  votes: Array<Vote>;
};

export type Role = {
  __typename?: 'Role';
  roleId: Scalars['Int'];
  roleName: Scalars['String'];
};

export type UpdateGameInput = {
  basePrice?: Maybe<Scalars['Float']>;
  categories?: Maybe<Array<CategoryInput>>;
  description?: Maybe<Scalars['String']>;
  gameId: Scalars['Int'];
  gameName?: Maybe<Scalars['String']>;
  publisher?: Maybe<PublisherInput>;
  releaseDate?: Maybe<Scalars['String']>;
  retailers?: Maybe<Array<RetailerInput>>;
};

export type UpdateReviewInput = {
  comment?: Maybe<Scalars['String']>;
  gameId?: Maybe<Scalars['Float']>;
  rating?: Maybe<Scalars['Int']>;
  reviewId: Scalars['Int'];
  userId?: Maybe<Scalars['String']>;
};

export type UpdateRoleInput = {
  role: Scalars['String'];
  userId: Scalars['String'];
};

export type UpdateVoteInput = {
  isUpvote?: Maybe<Scalars['Int']>;
  reviewId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
  voteId: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  profileImageName?: Maybe<Scalars['String']>;
  question: RestoreQuestion;
  role: Role;
  userId: Scalars['String'];
  username: Scalars['String'];
};

export type Vote = {
  __typename?: 'Vote';
  isUpvote: Scalars['Int'];
  review: Review;
  user: User;
  voteId: Scalars['Int'];
};

export type AddCategoryMutationVariables = Exact<{
  newCategoryData: NewCategoryInput;
}>;


export type AddCategoryMutation = { __typename?: 'Mutation', addCategory: { __typename?: 'Category', categoryId: number, categoryName: string } };

export type AddGameMutationVariables = Exact<{
  newGameData: NewGameInput;
}>;


export type AddGameMutation = { __typename?: 'Mutation', addGame: { __typename?: 'Game', gameId: number, gameName: string, basePrice: number, description: string, publisher: { __typename?: 'Publisher', publisherId: number, publisherName: string }, categories: Array<{ __typename?: 'Category', categoryId: number, categoryName: string }>, retailers: Array<{ __typename?: 'Retailer', retailerId: number, retailerName: string }> } };

export type AddGameWithImagesMutationVariables = Exact<{
  newGameData: NewGameInput;
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type AddGameWithImagesMutation = { __typename?: 'Mutation', addGameWithImages: { __typename?: 'Game', gameId: number, gameName: string, basePrice: number, description: string, publisher: { __typename?: 'Publisher', publisherId: number, publisherName: string }, categories: Array<{ __typename?: 'Category', categoryId: number, categoryName: string }>, retailers: Array<{ __typename?: 'Retailer', retailerId: number, retailerName: string }> } };

export type AddPublisherMutationVariables = Exact<{
  newPublisherData: NewPublisherInput;
}>;


export type AddPublisherMutation = { __typename?: 'Mutation', addPublisher: { __typename?: 'Publisher', publisherId: number, publisherName: string } };

export type AddRetailerMutationVariables = Exact<{
  newRetailerData: NewRetailerInput;
}>;


export type AddRetailerMutation = { __typename?: 'Mutation', addRetailer: { __typename?: 'Retailer', retailerId: number, retailerName: string } };

export type CreateReviewMutationVariables = Exact<{
  reviewData: CreateReviewInput;
}>;


export type CreateReviewMutation = { __typename?: 'Mutation', createReview: { __typename?: 'Review', reviewId: number, comment: string, rating: number, reviewer: { __typename?: 'User', userId: string, username: string } } };

export type DeleteCategoryMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteCategoryMutation = { __typename?: 'Mutation', deleteCategory: { __typename?: 'DeleteOutput', id: number, status: string } };

export type DeleteGameMutationVariables = Exact<{
  gameId: Scalars['Int'];
}>;


export type DeleteGameMutation = { __typename?: 'Mutation', deleteGame: { __typename?: 'DeleteGameOutput', gameId: number, status: string } };

export type DeletePublisherMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeletePublisherMutation = { __typename?: 'Mutation', deletePublisher: { __typename?: 'DeleteOutput', id: number, status: string } };

export type DeleteRetailerMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteRetailerMutation = { __typename?: 'Mutation', deleteRetailer: { __typename?: 'DeleteOutput', id: number, status: string } };

export type DeleteReviewMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteReviewMutation = { __typename?: 'Mutation', deleteReview: { __typename?: 'ResponseStatus', status: number, message: string } };

export type ForgotPasswordMutationVariables = Exact<{
  newData: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: string };

export type GetRestoreQuestionMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetRestoreQuestionMutation = { __typename?: 'Mutation', getRestoreQuestion: { __typename?: 'RestoreQuestionOutput', userId: string, question: { __typename?: 'RestoreQuestion', questionId: number, question: string } } };

export type UpdateCategoryMutationVariables = Exact<{
  newCategoryData: CategoryInput;
}>;


export type UpdateCategoryMutation = { __typename?: 'Mutation', updateCategory: { __typename?: 'Category', categoryId: number, categoryName: string } };

export type UpdateGameMutationVariables = Exact<{
  updateGameData: UpdateGameInput;
}>;


export type UpdateGameMutation = { __typename?: 'Mutation', updateGame: { __typename?: 'Game', gameId: number, gameName: string, basePrice: number, description: string, publisher: { __typename?: 'Publisher', publisherId: number, publisherName: string }, categories: Array<{ __typename?: 'Category', categoryId: number, categoryName: string }>, retailers: Array<{ __typename?: 'Retailer', retailerId: number, retailerName: string }> } };

export type UpdateGameWithImagesMutationVariables = Exact<{
  newGameData: UpdateGameInput;
  files: Array<Scalars['Upload']> | Scalars['Upload'];
}>;


export type UpdateGameWithImagesMutation = { __typename?: 'Mutation', updateGameWithImages: { __typename?: 'Game', gameId: number, gameName: string, basePrice: number, description: string, publisher: { __typename?: 'Publisher', publisherId: number, publisherName: string }, categories: Array<{ __typename?: 'Category', categoryId: number, categoryName: string }>, retailers: Array<{ __typename?: 'Retailer', retailerId: number, retailerName: string }> } };

export type UpdatPublisherDataMutationVariables = Exact<{
  newPublisherData: PublisherInput;
}>;


export type UpdatPublisherDataMutation = { __typename?: 'Mutation', updatePublisher: { __typename?: 'Publisher', publisherId: number, publisherName: string } };

export type UpdateRetailerMutationVariables = Exact<{
  newRetailerData: RetailerInput;
}>;


export type UpdateRetailerMutation = { __typename?: 'Mutation', updateRetailer: { __typename?: 'Retailer', retailerId: number, retailerName: string } };

export type UpdateReviewMutationVariables = Exact<{
  updateReviewInput: UpdateReviewInput;
}>;


export type UpdateReviewMutation = { __typename?: 'Mutation', updateReview: { __typename?: 'Review', reviewId: number, rating: number, comment: string } };

export type UpdateRoleMutationVariables = Exact<{
  updateRoleData: UpdateRoleInput;
}>;


export type UpdateRoleMutation = { __typename?: 'Mutation', updateRole: boolean };

export type GetGameAttributesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGameAttributesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', categoryId: number, categoryName: string }>, publishers: Array<{ __typename?: 'Publisher', publisherId: number, publisherName: string }>, retailers: Array<{ __typename?: 'Retailer', retailerId: number, retailerName: string }> };

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCategoriesQuery = { __typename?: 'Query', categories: Array<{ __typename?: 'Category', categoryId: number, categoryName: string }> };

export type GetGameQueryVariables = Exact<{
  gameId: Scalars['Int'];
}>;


export type GetGameQuery = { __typename?: 'Query', game: { __typename?: 'Game', gameId: number, gameName: string, basePrice: number, description: string, releaseDate: string, publisher: { __typename?: 'Publisher', publisherId: number, publisherName: string }, categories: Array<{ __typename?: 'Category', categoryId: number, categoryName: string }>, retailers: Array<{ __typename?: 'Retailer', retailerId: number, retailerName: string }>, images: Array<{ __typename?: 'GameImage', name: string }> } };

export type GameWithReviewsQueryVariables = Exact<{
  gameId: Scalars['Int'];
}>;


export type GameWithReviewsQuery = { __typename?: 'Query', gameWithReviews: { __typename?: 'Game', gameId: number, gameName: string, basePrice: number, description: string, rating?: number | null | undefined, publisher: { __typename?: 'Publisher', publisherName: string }, categories: Array<{ __typename?: 'Category', categoryName: string }>, images: Array<{ __typename?: 'GameImage', name: string }>, reviews: Array<{ __typename?: 'Review', reviewId: number, rating: number, comment: string, reviewer: { __typename?: 'User', userId: string, username: string }, votes: Array<{ __typename?: 'Vote', isUpvote: number }> }> } };

export type AllGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGamesQuery = { __typename?: 'Query', games: Array<{ __typename?: 'Game', gameId: number, gameName: string, description: string, basePrice: number, releaseDate: string, categories: Array<{ __typename?: 'Category', categoryId: number, categoryName: string }>, retailers: Array<{ __typename?: 'Retailer', retailerId: number, retailerName: string }>, images: Array<{ __typename?: 'GameImage', name: string }> }> };

export type GetPublishersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublishersQuery = { __typename?: 'Query', publishers: Array<{ __typename?: 'Publisher', publisherId: number, publisherName: string }> };

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = { __typename?: 'Query', questions: Array<{ __typename?: 'RestoreQuestion', questionId: number, question: string }> };

export type GetRetailersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetRetailersQuery = { __typename?: 'Query', retailers: Array<{ __typename?: 'Retailer', retailerId: number, retailerName: string }> };

export type ReviewsInGameQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type ReviewsInGameQuery = { __typename?: 'Query', reviewByGameId: Array<{ __typename?: 'Review', reviewId: number, rating: number, comment: string, reviewer: { __typename?: 'User', username: string, userId: string } }> };

export type UsersQueryVariables = Exact<{ [key: string]: never; }>;


export type UsersQuery = { __typename?: 'Query', users: Array<{ __typename?: 'User', userId: string, username: string, profileImageName?: string | null | undefined, role: { __typename?: 'Role', roleName: string } }> };
