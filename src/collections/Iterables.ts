export const Iterables = {
    equals<T>(o1: Iterable<T>, o2: Iterable<T>) {
        let iter1 = o1[Symbol.iterator]();
        let iter2 = o2[Symbol.iterator]();

        let next1: IteratorResult<T>, next2: IteratorResult<T>;
        do {
            next1 = iter1.next();
            next2 = iter2.next();
            if (next1.done !== next2.done || next1.value !== next2.value) {
                return false
            }
        } while (!next1.done && !next2.done);

        return true;
    }
}