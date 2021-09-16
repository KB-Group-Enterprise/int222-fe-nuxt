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

export type Car = {
  __typename?: 'Car';
  id: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  gas: Scalars['String'];
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
  rating: Scalars['Int'];
  comment: Scalars['String'];
  userId: Scalars['String'];
  gameId: Scalars['Float'];
};

export type CreateVoteInput = {
  reviewId: Scalars['Int'];
  userId: Scalars['String'];
  isUpvote: Scalars['Int'];
};

export type CredentialInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type DeleteCarInput = {
  id: Scalars['String'];
};

export type DeleteGameInput = {
  gameId: Scalars['Int'];
};

export type DeleteGameOutput = {
  __typename?: 'DeleteGameOutput';
  gameId: Scalars['Int'];
  status: Scalars['String'];
};

export type DeleteUserInput = {
  userId: Scalars['String'];
};

export type ForgotPasswordInput = {
  username: Scalars['String'];
  userId: Scalars['String'];
  restoreAnswer: Scalars['String'];
  newPassword: Scalars['String'];
};

export type Game = {
  __typename?: 'Game';
  gameId: Scalars['Int'];
  gameName: Scalars['String'];
  basePrice: Scalars['Float'];
  description: Scalars['String'];
  publisher: Publisher;
  categories: Array<Category>;
  retailers: Array<Retailer>;
  images: Array<GameImage>;
};

export type GameImage = {
  __typename?: 'GameImage';
  name: Scalars['String'];
};

export type ImageOutPut = {
  __typename?: 'ImageOutPut';
  url: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addCar: Car;
  updateCar: Car;
  deleteCar: Car;
  addGame: Game;
  addGameWithImages: Game;
  updateGameWithImages: Game;
  updateGame: Game;
  deleteGame: DeleteGameOutput;
  login: Scalars['String'];
  register: Scalars['String'];
  refreshToken: Scalars['Boolean'];
  me: User;
  logout: Scalars['Boolean'];
  forgotPassword: Scalars['String'];
  deleteUser: Scalars['Boolean'];
  uploadProfileImage: ImageOutPut;
  getRestoreQuestion: RestoreQuestionOutput;
  uploadMultiple: Array<Scalars['String']>;
  test: Scalars['String'];
  createReview: Review;
  updateReview: Review;
  deleteReview: ResponseStatus;
  createVote: Vote;
  updateVote: Vote;
  deleteVote: ResponseStatus;
};


export type MutationAddCarArgs = {
  newCarData: NewCarInput;
};


export type MutationUpdateCarArgs = {
  updatedCarData: UpdateCarInput;
};


export type MutationDeleteCarArgs = {
  deleteCarData: DeleteCarInput;
};


export type MutationAddGameArgs = {
  newGameData: NewGameInput;
};


export type MutationAddGameWithImagesArgs = {
  files: Scalars['Upload'];
  newGameData: NewGameInput;
};


export type MutationUpdateGameWithImagesArgs = {
  files: Array<Scalars['Upload']>;
  newGameData: UpdateGameInput;
};


export type MutationUpdateGameArgs = {
  updateGameData: UpdateGameInput;
};


export type MutationDeleteGameArgs = {
  deleteGameData: DeleteGameInput;
};


export type MutationLoginArgs = {
  credential: CredentialInput;
};


export type MutationRegisterArgs = {
  registerData: RegisterInput;
};


export type MutationForgotPasswordArgs = {
  newData: ForgotPasswordInput;
};


export type MutationDeleteUserArgs = {
  deleteData: DeleteUserInput;
};


export type MutationUploadProfileImageArgs = {
  file: Scalars['Upload'];
};


export type MutationGetRestoreQuestionArgs = {
  username: Scalars['String'];
};


export type MutationUploadMultipleArgs = {
  files: Array<Scalars['Upload']>;
};


export type MutationCreateReviewArgs = {
  createReviewInput: CreateReviewInput;
};


export type MutationUpdateReviewArgs = {
  updateReviewInput: UpdateReviewInput;
};


export type MutationDeleteReviewArgs = {
  id: Scalars['Int'];
};


export type MutationCreateVoteArgs = {
  createVoteInput: CreateVoteInput;
};


export type MutationUpdateVoteArgs = {
  updateVoteInput: UpdateVoteInput;
};


export type MutationDeleteVoteArgs = {
  id: Scalars['Int'];
};

export type NewCarInput = {
  name: Scalars['String'];
  price: Scalars['Int'];
  gas?: Maybe<Scalars['String']>;
};

export type NewGameInput = {
  gameName: Scalars['String'];
  basePrice: Scalars['Float'];
  description: Scalars['String'];
  publisher: PublisherInput;
  categories: Array<CategoryInput>;
  retailers: Array<RetailerInput>;
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
  cars: Array<Car>;
  car: Car;
  game: Game;
  games: Array<Game>;
  user: User;
  questions: Array<RestoreQuestion>;
  users: Array<User>;
  reviews: Array<Review>;
  review: Review;
  votes: Array<Vote>;
};


export type QueryCarArgs = {
  id: Scalars['String'];
};


export type QueryGameArgs = {
  gameId: Scalars['Int'];
};


export type QueryUserArgs = {
  username: Scalars['String'];
};


export type QueryReviewArgs = {
  id: Scalars['Int'];
};

export type RegisterInput = {
  username: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
  questionId: Scalars['Float'];
  restoreAnswer: Scalars['String'];
};

export type ResponseStatus = {
  __typename?: 'ResponseStatus';
  status: Scalars['Int'];
  message: Scalars['String'];
};

export type RestoreQuestion = {
  __typename?: 'RestoreQuestion';
  questionId: Scalars['Float'];
  question: Scalars['String'];
};

export type RestoreQuestionOutput = {
  __typename?: 'RestoreQuestionOutput';
  userId: Scalars['String'];
  question: RestoreQuestion;
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
  reviewId: Scalars['Int'];
  rating: Scalars['Float'];
  comment: Scalars['String'];
  reviewer: User;
  game: Game;
};

export type Role = {
  __typename?: 'Role';
  roleId: Scalars['Int'];
  roleName: Scalars['String'];
};

export type UpdateCarInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  price: Scalars['Float'];
  gas: Scalars['String'];
};

export type UpdateGameInput = {
  gameName?: Maybe<Scalars['String']>;
  basePrice?: Maybe<Scalars['Float']>;
  description?: Maybe<Scalars['String']>;
  publisher?: Maybe<PublisherInput>;
  categories?: Maybe<Array<CategoryInput>>;
  retailers?: Maybe<Array<RetailerInput>>;
  gameId: Scalars['Int'];
};

export type UpdateReviewInput = {
  rating?: Maybe<Scalars['Int']>;
  comment?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['String']>;
  gameId?: Maybe<Scalars['Float']>;
  reviewId: Scalars['Int'];
};

export type UpdateVoteInput = {
  reviewId?: Maybe<Scalars['Int']>;
  userId?: Maybe<Scalars['String']>;
  isUpvote?: Maybe<Scalars['Int']>;
  voteId: Scalars['Int'];
};


export type User = {
  __typename?: 'User';
  userId: Scalars['String'];
  username: Scalars['String'];
  role: Role;
  question: RestoreQuestion;
  profileImageName?: Maybe<Scalars['String']>;
};

export type Vote = {
  __typename?: 'Vote';
  voteId: Scalars['Int'];
  isUpvote: Scalars['Int'];
  review: Review;
  user: User;
};

export type ForgotPasswordMutationVariables = Exact<{
  newData: ForgotPasswordInput;
}>;


export type ForgotPasswordMutation = { __typename?: 'Mutation', forgotPassword: string };

export type GetRestoreQuestionMutationVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetRestoreQuestionMutation = { __typename?: 'Mutation', getRestoreQuestion: { __typename?: 'RestoreQuestionOutput', userId: string, question: { __typename?: 'RestoreQuestion', questionId: number, question: string } } };

export type AllGamesQueryVariables = Exact<{ [key: string]: never; }>;


export type AllGamesQuery = { __typename?: 'Query', games: Array<{ __typename?: 'Game', gameId: number, gameName: string, description: string, basePrice: number, categories: Array<{ __typename?: 'Category', categoryId: number, categoryName: string }>, retailers: Array<{ __typename?: 'Retailer', retailerId: number, retailerName: string }> }> };

export type Unnamed_1_QueryVariables = Exact<{ [key: string]: never; }>;


export type Unnamed_1_Query = { __typename?: 'Query', questions: Array<{ __typename?: 'RestoreQuestion', questionId: number, question: string }> };
