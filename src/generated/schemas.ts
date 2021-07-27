
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export class CreateUserInput {
    name: string;
    lastName: string;
    bornDate?: Nullable<string>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    username: string;
    email: string;
    phone?: Nullable<string>;
    socialNetworks?: Nullable<Nullable<UserSocialNetworkInput>[]>;
}

export class UserSocialNetworkInput {
    name: string;
    link: string;
    description?: Nullable<string>;
}

export abstract class IQuery {
    abstract findUser(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract findUsers(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
}

export abstract class IMutation {
    abstract createUser(input: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id: string;
    name?: Nullable<string>;
    lastName?: Nullable<string>;
    bornDate?: Nullable<string>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    username?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    socialNetworks?: Nullable<Nullable<UserSocialNetwork>[]>;
}

export class UserSocialNetwork {
    name: string;
    link: string;
    description?: Nullable<string>;
}

type Nullable<T> = T | null;
