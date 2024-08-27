import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Project {
  'id' : bigint,
  'title' : string,
  'description' : [] | [string],
  'author' : string,
  'stars' : bigint,
  'imageUrl' : [] | [string],
  'category' : string,
}
export interface _SERVICE {
  'addProject' : ActorMethod<
    [string, string, [] | [string], [] | [string], string],
    bigint
  >,
  'getProjects' : ActorMethod<[[] | [string]], Array<Project>>,
  'starProject' : ActorMethod<[bigint], boolean>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
