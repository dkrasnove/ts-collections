interface Iterable<T> {
    // iterator(): Iterator<T>;
    // forEach(callbackFn: (value: T, key: keyof this, collection: this) => void, thisArg?: any): void; 
    // map(callbackFn: (value: T, key: keyof this, collection: this) => T, thisArg?: any): T[];
    // filter(callbackFn: (value: T, key: keyof this, collection: this) => boolean, thisArg?: any): T[];
    // group(callbackFn: (value: T, key: keyof this, collection: this) => any, thisArg?: any): {key: any, group: T[]};
    // reduce(callbackFn: (accumulator: T, value: T, key: keyof this, collection: this) => boolean, thisArg?: any): T;
    // reduceRight(callbackFn: (accumulator: T, value: T, key: keyof this, collection: this) => boolean, thisArg?: any, accumulator?: T): T;
    // sum(): T;
    // average(): T;
    // min(): T;
    // max(): T;
    // some(callbackFn: (value: T, key: keyof this, collection: this) => boolean, thisArg?: any): boolean;
    // every(callbackFn: (value: T, key: keyof this, collection: this) => boolean, thisArg?: any): boolean;
    // only(): T | undefined;
    // sorted(compare?: (o1: T, o2: T) => number): T[];
    // reversed(): T[]
    // enumerate(start?: number): [number, T];
    // flatten(): T[];
    // join(delimiter?: string): string;
    // concat(...iterables: Iterable<T>[]): T[];
    // zip(...iterables: Iterable<T>[]): T[];
    // toArray(): T[];
    // toObject(): {};
    // toJSON(): any;
    // clone(): Collection<T>;
    // equals(value: any): boolean;
    // compare(value: any): number;
}