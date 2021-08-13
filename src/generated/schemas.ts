
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
    education?: Nullable<Nullable<EducationInput>[]>;
    workExperience?: Nullable<Nullable<WorkExperienceInput>[]>;
    skills?: Nullable<Nullable<SkillInput>[]>;
}

export class UpdateUserInput {
    name?: Nullable<string>;
    lastName?: Nullable<string>;
    bornDate?: Nullable<string>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    phone?: Nullable<string>;
    socialNetworks?: Nullable<Nullable<UserSocialNetworkInput>[]>;
    education?: Nullable<Nullable<EducationInput>[]>;
    workExperience?: Nullable<Nullable<WorkExperienceInput>[]>;
    skills?: Nullable<Nullable<SkillInput>[]>;
}

export class UserSocialNetworkInput {
    name: string;
    link: string;
    description?: Nullable<string>;
}

export class EducationInput {
    institute: string;
    title: string;
    startDate?: Nullable<string>;
    endDate?: Nullable<string>;
    isCurrentStudy?: Nullable<boolean>;
    description?: Nullable<string>;
}

export class WorkExperienceInput {
    jobTitle: string;
    jobType: string;
    company: string;
    location?: Nullable<string>;
    startDate?: Nullable<string>;
    endDate?: Nullable<string>;
    isCurrentJob?: Nullable<boolean>;
    description?: Nullable<string>;
}

export class SkillInput {
    name: string;
    score: number;
}

export class PaginationInput {
    first?: Nullable<number>;
    after?: Nullable<Cursor>;
    last?: Nullable<number>;
    before?: Nullable<Cursor>;
}

export abstract class IQuery {
    abstract user(id: string): Nullable<User> | Promise<Nullable<User>>;

    abstract users(pagination?: Nullable<PaginationInput>): Nullable<UserPaginationResult> | Promise<Nullable<UserPaginationResult>>;
}

export abstract class IMutation {
    abstract createUser(input: CreateUserInput): Nullable<User> | Promise<Nullable<User>>;

    abstract updateUser(input: UpdateUserInput): Nullable<User> | Promise<Nullable<User>>;
}

export class User {
    id?: Nullable<string>;
    name?: Nullable<string>;
    lastName?: Nullable<string>;
    bornDate?: Nullable<string>;
    title?: Nullable<string>;
    description?: Nullable<string>;
    username?: Nullable<string>;
    email?: Nullable<string>;
    phone?: Nullable<string>;
    socialNetworks?: Nullable<Nullable<UserSocialNetwork>[]>;
    education?: Nullable<Nullable<Education>[]>;
    workExperience?: Nullable<Nullable<WorkExperience>[]>;
    skills?: Nullable<Nullable<Skill>[]>;
}

export class UserSocialNetwork {
    name?: Nullable<string>;
    link?: Nullable<string>;
    description?: Nullable<string>;
}

export class Education {
    institute?: Nullable<string>;
    title?: Nullable<string>;
    startDate?: Nullable<string>;
    endDate?: Nullable<string>;
    isCurrentStudy?: Nullable<boolean>;
    description?: Nullable<string>;
}

export class WorkExperience {
    jobTitle?: Nullable<string>;
    jobType?: Nullable<string>;
    company?: Nullable<string>;
    location?: Nullable<string>;
    startDate?: Nullable<string>;
    endDate?: Nullable<string>;
    isCurrentJob?: Nullable<boolean>;
    description?: Nullable<string>;
}

export class Skill {
    name?: Nullable<string>;
    score?: Nullable<number>;
}

export class UserEdge {
    node?: Nullable<User>;
}

export class UserPaginationResult {
    edges?: Nullable<Nullable<UserEdge>[]>;
}

export class Edge {
    node?: Nullable<Node>;
    cursor?: Nullable<Cursor>;
}

export class PageInfo {
    startCursor?: Nullable<Cursor>;
    hasNextPage?: Nullable<boolean>;
    endCursor?: Nullable<Cursor>;
    hasPreviousPage?: Nullable<boolean>;
}

export class PaginationResult {
    totalCount?: Nullable<number>;
    edges?: Nullable<Nullable<Edge>[]>;
    pageInfo?: Nullable<PageInfo>;
}

export type Cursor = any;
export type Node = any;
type Nullable<T> = T | null;
