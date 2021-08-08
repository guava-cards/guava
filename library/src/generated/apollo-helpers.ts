/* eslint-disable */
import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AuthorizationResultKeySpecifier = ('message' | 'reasons' | 'value' | AuthorizationResultKeySpecifier)[];
export type AuthorizationResultFieldPolicy = {
	message?: FieldPolicy<any> | FieldReadFunction<any>,
	reasons?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type CreateDeckMutationPayloadKeySpecifier = ('clientMutationId' | 'deckEdge' | 'success' | 'validationErrors' | CreateDeckMutationPayloadKeySpecifier)[];
export type CreateDeckMutationPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	deckEdge?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	validationErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeckKeySpecifier = ('canDestroy' | 'canUpdate' | 'canView' | 'createdAt' | 'description' | 'emoji' | 'emojiAlt' | 'id' | 'name' | 'updatedAt' | 'user' | 'visibilityMode' | DeckKeySpecifier)[];
export type DeckFieldPolicy = {
	canDestroy?: FieldPolicy<any> | FieldReadFunction<any>,
	canUpdate?: FieldPolicy<any> | FieldReadFunction<any>,
	canView?: FieldPolicy<any> | FieldReadFunction<any>,
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	emoji?: FieldPolicy<any> | FieldReadFunction<any>,
	emojiAlt?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	visibilityMode?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeckConnectionKeySpecifier = ('edges' | 'nodes' | 'pageInfo' | DeckConnectionKeySpecifier)[];
export type DeckConnectionFieldPolicy = {
	edges?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	pageInfo?: FieldPolicy<any> | FieldReadFunction<any>
};
export type DeckEdgeKeySpecifier = ('cursor' | 'node' | DeckEdgeKeySpecifier)[];
export type DeckEdgeFieldPolicy = {
	cursor?: FieldPolicy<any> | FieldReadFunction<any>,
	node?: FieldPolicy<any> | FieldReadFunction<any>
};
export type FailureReasonsKeySpecifier = ('details' | 'fullMessages' | FailureReasonsKeySpecifier)[];
export type FailureReasonsFieldPolicy = {
	details?: FieldPolicy<any> | FieldReadFunction<any>,
	fullMessages?: FieldPolicy<any> | FieldReadFunction<any>
};
export type IdentityCheckMutationPayloadKeySpecifier = ('clientMutationId' | 'exists' | IdentityCheckMutationPayloadKeySpecifier)[];
export type IdentityCheckMutationPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	exists?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createDeck' | 'identityCheck' | 'updateDeck' | 'upsertUser' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createDeck?: FieldPolicy<any> | FieldReadFunction<any>,
	identityCheck?: FieldPolicy<any> | FieldReadFunction<any>,
	updateDeck?: FieldPolicy<any> | FieldReadFunction<any>,
	upsertUser?: FieldPolicy<any> | FieldReadFunction<any>
};
export type NodeKeySpecifier = ('id' | NodeKeySpecifier)[];
export type NodeFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>
};
export type PageInfoKeySpecifier = ('endCursor' | 'hasNextPage' | 'hasPreviousPage' | 'startCursor' | PageInfoKeySpecifier)[];
export type PageInfoFieldPolicy = {
	endCursor?: FieldPolicy<any> | FieldReadFunction<any>,
	hasNextPage?: FieldPolicy<any> | FieldReadFunction<any>,
	hasPreviousPage?: FieldPolicy<any> | FieldReadFunction<any>,
	startCursor?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('node' | 'nodes' | 'viewer' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	node?: FieldPolicy<any> | FieldReadFunction<any>,
	nodes?: FieldPolicy<any> | FieldReadFunction<any>,
	viewer?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpdateDeckMutationPayloadKeySpecifier = ('clientMutationId' | 'deck' | 'success' | 'validationErrors' | UpdateDeckMutationPayloadKeySpecifier)[];
export type UpdateDeckMutationPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	deck?: FieldPolicy<any> | FieldReadFunction<any>,
	success?: FieldPolicy<any> | FieldReadFunction<any>,
	validationErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UpsertUserMutationPayloadKeySpecifier = ('clientMutationId' | 'failureReason' | 'user' | 'validationErrors' | UpsertUserMutationPayloadKeySpecifier)[];
export type UpsertUserMutationPayloadFieldPolicy = {
	clientMutationId?: FieldPolicy<any> | FieldReadFunction<any>,
	failureReason?: FieldPolicy<any> | FieldReadFunction<any>,
	user?: FieldPolicy<any> | FieldReadFunction<any>,
	validationErrors?: FieldPolicy<any> | FieldReadFunction<any>
};
export type UserKeySpecifier = ('createdAt' | 'decks' | 'email' | 'id' | 'updatedAt' | 'username' | UserKeySpecifier)[];
export type UserFieldPolicy = {
	createdAt?: FieldPolicy<any> | FieldReadFunction<any>,
	decks?: FieldPolicy<any> | FieldReadFunction<any>,
	email?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	updatedAt?: FieldPolicy<any> | FieldReadFunction<any>,
	username?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ValidationErrorKeySpecifier = ('description' | 'details' | 'fullMessages' | 'messages' | ValidationErrorKeySpecifier)[];
export type ValidationErrorFieldPolicy = {
	description?: FieldPolicy<any> | FieldReadFunction<any>,
	details?: FieldPolicy<any> | FieldReadFunction<any>,
	fullMessages?: FieldPolicy<any> | FieldReadFunction<any>,
	messages?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TypedTypePolicies = TypePolicies & {
	AuthorizationResult?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AuthorizationResultKeySpecifier | (() => undefined | AuthorizationResultKeySpecifier),
		fields?: AuthorizationResultFieldPolicy,
	},
	CreateDeckMutationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | CreateDeckMutationPayloadKeySpecifier | (() => undefined | CreateDeckMutationPayloadKeySpecifier),
		fields?: CreateDeckMutationPayloadFieldPolicy,
	},
	Deck?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeckKeySpecifier | (() => undefined | DeckKeySpecifier),
		fields?: DeckFieldPolicy,
	},
	DeckConnection?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeckConnectionKeySpecifier | (() => undefined | DeckConnectionKeySpecifier),
		fields?: DeckConnectionFieldPolicy,
	},
	DeckEdge?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | DeckEdgeKeySpecifier | (() => undefined | DeckEdgeKeySpecifier),
		fields?: DeckEdgeFieldPolicy,
	},
	FailureReasons?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | FailureReasonsKeySpecifier | (() => undefined | FailureReasonsKeySpecifier),
		fields?: FailureReasonsFieldPolicy,
	},
	IdentityCheckMutationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | IdentityCheckMutationPayloadKeySpecifier | (() => undefined | IdentityCheckMutationPayloadKeySpecifier),
		fields?: IdentityCheckMutationPayloadFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	Node?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | NodeKeySpecifier | (() => undefined | NodeKeySpecifier),
		fields?: NodeFieldPolicy,
	},
	PageInfo?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | PageInfoKeySpecifier | (() => undefined | PageInfoKeySpecifier),
		fields?: PageInfoFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	UpdateDeckMutationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpdateDeckMutationPayloadKeySpecifier | (() => undefined | UpdateDeckMutationPayloadKeySpecifier),
		fields?: UpdateDeckMutationPayloadFieldPolicy,
	},
	UpsertUserMutationPayload?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UpsertUserMutationPayloadKeySpecifier | (() => undefined | UpsertUserMutationPayloadKeySpecifier),
		fields?: UpsertUserMutationPayloadFieldPolicy,
	},
	User?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | UserKeySpecifier | (() => undefined | UserKeySpecifier),
		fields?: UserFieldPolicy,
	},
	ValidationError?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ValidationErrorKeySpecifier | (() => undefined | ValidationErrorKeySpecifier),
		fields?: ValidationErrorFieldPolicy,
	}
};