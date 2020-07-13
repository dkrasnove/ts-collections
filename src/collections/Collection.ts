export interface Collection<T = any> extends Iterable<T> {
    size: number;
    iterator(): Iterator<T>;
    isEmpty(): boolean;
    has(value: T): boolean;
    add(value: T): this;
    addEach(values: Iterable<T>): this;
    delete(value: T): boolean;
    deleteEach(values: Iterable<T>): number;
    clear(): void;
}