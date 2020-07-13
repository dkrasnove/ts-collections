import { Collection } from "./Collection";

export interface List<T = any> extends Collection<T> {  
    insert(index: number, value: T): this;
    insertEach(index: number, ...values: T[]): this;
    set(index: number, value: T): this;
    get(index: number): T;
    indexOf(searchValue: T): number;
    lastIndexOf(searchValue: T): number;
    deleteAt(index: number): T;
}

// slice(start?: number, end?: number): T[];
// splice(start: number, length: number, ...values: T[]): T[];
// find(callbackFn: (value: T, key: keyof this, collection: this) => boolean, thisArg?: any): T;
// findLast(callbackFn: (value: T, key: keyof this, collection: this) => boolean, thisArg?: any): T;
// sort(compare?: (o1: T, o2: T) => number): T[];
// reverse(): T[];

/*** ArrayList ***/
class ArrayList<T> {

}

interface Stack<T> extends Collection<T>{
    push(...values: T[]): number;
    pop(): T;
    peek(): T;
}

interface Queue<T> extends Collection<T> {
    enqueue(...values: T[]): number;
    dequeue(): T;
    peek(): T;
}