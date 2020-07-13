import { LinkedListNode, LinkedList } from "./LinkedList";

/*** Circular Singly Linked List ***/
export class CircularSinglyLinkedListNode<T> implements LinkedListNode<T> {
    list?: CircularSinglyLinkedList<T>;
    next: CircularSinglyLinkedListNode<T> = this;
    value: T;
    constructor(value: T) {
        this.value = value;
    }
}

export class CircularSinglyLinkedList<T = any> implements LinkedList<T> {
    get size(): number {
        return this._size;
    }
    get nodes(): Iterable<CircularSinglyLinkedListNode<T>> {
        return this.nodeIterator();
    }
    get firstNode(): CircularSinglyLinkedListNode<T> | undefined {
        return this._lastNode?.next;
    }
    get lastNode(): CircularSinglyLinkedListNode<T> | undefined {
        return this._lastNode;
    }
    private _size: number = 0;
    private _lastNode?: CircularSinglyLinkedListNode<T>;

    constructor(values?: Iterable<T>) {
        if (values) {
            this.addEach(values);
        }
    }

    // Iterable Operations
    [Symbol.iterator](): IterableIterator<T> {
        return this.iterator();
    }

    *iterator(): IterableIterator<T> {
        for (let node of this.nodeIterator()) {
            yield node.value;
        }
    }

    *nodeIterator(): IterableIterator<CircularSinglyLinkedListNode<T>> {
        if (this.firstNode) {
            let currentNode = this.firstNode;
            do {
                yield currentNode;
                currentNode = currentNode.next;
            } while (currentNode != this.firstNode);
        }
    }

    // Collection Operations
    isEmpty(): boolean {
        return this.size === 0;
    }
    has(value: T): boolean {
        for (let val of this) {
            if (val === value) {
                return true;
            }
        }
        return false;
    }
    add(value: T): this {
        return this.addEach([value]);
    }
    addEach(values: Iterable<T>): this {
        for (let val of values) {
            this.insertLast(val);
        }
        return this;
    }
    delete(value: T): boolean {
        let previousNode = this.lastNode;
        for (let node of this.nodes) {
            if (node.value == value) {
                this.deleteAfter(previousNode!);
                return true;
            }
            previousNode = node;
        }
        return false;
    }
    deleteEach(values: Iterable<T>): number {
        let deleted = 0;
        for (let val of values) {
            if (this.delete(val)) {
                deleted++;
            }
        }
        return deleted;
    }
    clear(): void {
        this._lastNode = undefined;
    }

    // List Operations
    insert(index: number, value: T): this {
        return this.insertEach(index, value);
    }
    insertEach(index: number, ...values: T[]): this {
        let currentNode: CircularSinglyLinkedListNode<T>;
        if (index === 0) {
            currentNode = this.insertFirst(values[0]);
        } else {
            currentNode = this.insertAfter(this.getNodeAt(index - 1), values[0]);
        }
        for (let i = 1; i < values.length; i++) {
            currentNode = this.insertAfter(currentNode, values[i]);
        }
        return this;
    }
    set(index: number, value: T): this {
        let targetNode = this.getNodeAt(index);
        targetNode.value = value;
        return this;
    }
    get(index: number): T {
        let targetNode = this.getNodeAt(index);
        return targetNode.value;
    }
    indexOf(searchValue: T): number {
        let index = 0;
        for (let value of this) {
            if (value === searchValue) {
                return index;
            }
            index++;
        }
        return -1;
    }
    lastIndexOf(searchValue: T): number {
        let index = 0;
        let foundAt = -1;
        for (let value of this) {
            if (value === searchValue) {
                foundAt = index;
            }
            index++;
        }
        return foundAt;
    }
    deleteAt(index: number): T {
        this.validateIndex(index);
        let deletedValue: T;
        if (index === 0) {
            deletedValue = this.firstNode?.value!;
            this.deleteFirst();
        } else {
            let targetNode = this.getNodeAt(index - 1);
            deletedValue = targetNode.value;
            this.deleteAfter(targetNode);
        }
        return deletedValue;
    }

    // Linked List Operations
    findNode(value: T): CircularSinglyLinkedListNode<T> | undefined {
        for (let node of this.nodes) {
            if (node.value === value) {
                return node;
            }
        }
    }
    getNodeAt(index: number): CircularSinglyLinkedListNode<T> {
        this.validateIndex(index);
        let iter = this.nodeIterator();
        let currentNode: CircularSinglyLinkedListNode<T>;
        for (let i = 0; i <= index; i++) {
            currentNode = iter.next().value;
        }
        return currentNode!;
    }

    insertFirst(value: T): CircularSinglyLinkedListNode<T>;
    insertFirst(newNode: CircularSinglyLinkedListNode<T>): CircularSinglyLinkedListNode<T>;
    insertFirst(o: T | CircularSinglyLinkedListNode<T>) {
        let newNode = this.coalesceToNode(o);
        this.validateNewNode(newNode);
        this.__internal__insertAfter(this.lastNode, newNode);
        newNode.list = this;
        this._size++;
        return newNode;
    }

    insertLast(value: T): CircularSinglyLinkedListNode<T>;
    insertLast(newNode: CircularSinglyLinkedListNode<T>): CircularSinglyLinkedListNode<T>;
    insertLast(o: T | CircularSinglyLinkedListNode<T>) {
        let newNode = this.coalesceToNode(o);
        this.validateNewNode(newNode);
        this.__internal__insertAfter(this.lastNode, newNode);
        this._lastNode = newNode;
        newNode.list = this;
        this._size++;
        return newNode;
    }

    insertAfter(node: CircularSinglyLinkedListNode<T>, value: T): CircularSinglyLinkedListNode<T>;
    insertAfter(node: CircularSinglyLinkedListNode<T>, newNode: CircularSinglyLinkedListNode<T>): CircularSinglyLinkedListNode<T>;
    insertAfter(node: CircularSinglyLinkedListNode<T>, o: T | CircularSinglyLinkedListNode<T>) {
        let newNode = this.coalesceToNode(o);
        this.validateNode(node);
        this.validateNewNode(newNode);
        this.__internal__insertAfter(node, newNode);
        if (node === this.lastNode) {
            this._lastNode = newNode;
        }
        newNode.list = this;
        this._size++;
        return newNode;
    }

    deleteFirst(): boolean {
        if (this.lastNode) {
            this.deleteAfter(this.lastNode);
            return true;
        }
        return false;
    }

    deleteAfter(node: CircularSinglyLinkedListNode<T>): boolean {
        this.validateNode(node);
        node.next.list = undefined;
        if (node.next === this.lastNode) {
            this._lastNode = node;
        }
        this.__internal__deleteAfter(node);
        this._size--;
        return true;
    }

    protected validateIndex(index: number): void {
        if (index < 0 || index > this.size - 1) {
            throw new RangeError("Index was out of range. Must be non-negative and less than the size of the collection.");
        }
    }
    private validateNode(node: CircularSinglyLinkedListNode<T>): void {
        if (node.list != this) {
            throw new Error("node is not in this list.");
        }
    }
    private validateNewNode(newNode: CircularSinglyLinkedListNode<T>): void {
        if (newNode.list != null) {
            throw new Error("node is already in another list.");
        }
    }
    private coalesceToNode(o: T | CircularSinglyLinkedListNode<T>) {
        return !(o instanceof CircularSinglyLinkedListNode) ? new CircularSinglyLinkedListNode<T>(o) : o;
    }
    private __internal__insertAfter(node: CircularSinglyLinkedListNode<T> | undefined, newNode: CircularSinglyLinkedListNode<T>): void {
        if (!node) {
            this._lastNode = newNode;
        } else {
            newNode.next = node.next;
            node.next = newNode;
        }
    }
    private __internal__deleteAfter(node: CircularSinglyLinkedListNode<T>): void {
        if (node === node.next) {
            this._lastNode = undefined;
        } else {
            node.next = node.next.next;
        }
    }

}