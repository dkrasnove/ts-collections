import { DoublyLinkedListNode, DoublyLinkedList } from "./LinkedList";

/*** Circular Doubly Linked List ***/
export class CircularDoublyLinkedListNode<T> implements DoublyLinkedListNode<T>  {
    list?: CircularDoublyLinkedList<T>;
    next: CircularDoublyLinkedListNode<T> = this;
    prev: CircularDoublyLinkedListNode<T> = this;
    value: T;
    constructor(value: T) {
        this.value = value;
    }
}

export class CircularDoublyLinkedList<T = any> implements DoublyLinkedList<T> {
    get size(): number {
        return this._size;
    }
    get nodes(): Iterable<CircularDoublyLinkedListNode<T>> {
        return this.nodeIterator();
    }
    get firstNode(): CircularDoublyLinkedListNode<T> | undefined {
        return this._lastNode?.next;
    }
    get lastNode(): CircularDoublyLinkedListNode<T> | undefined {
        return this._lastNode;
    }
    private _size: number = 0;
    private _lastNode?: CircularDoublyLinkedListNode<T>;

    constructor(values?: Iterable<T>) {
        if (values) {
            this.addEach(values);
        }
    }

    // Iterable Operations
    [Symbol.iterator]() {
        return this.iterator();
    }

    *iterator(): IterableIterator<T> {
        for (let node of this.nodeIterator()) {
            yield node.value;
        }
    }

    *reverseIterator(): IterableIterator<T> {
        for (let node of this.reverseNodeIterator()) {
            yield node.value;
        }
    }

    *nodeIterator(): IterableIterator<CircularDoublyLinkedListNode<T>> {
        if (this._lastNode) {
            let currentNode = this._lastNode.next;
            do {
                yield currentNode;
                currentNode = currentNode.next;
            } while (currentNode != this._lastNode.next);
        }
    }

    *reverseNodeIterator(): IterableIterator<CircularDoublyLinkedListNode<T>> {
        if (this._lastNode) {
            let currentNode = this._lastNode;
            do {
                yield currentNode;
                currentNode = currentNode.prev;
            } while (currentNode != this._lastNode);
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
        for (let node of this.nodes) {
            if (node.value == value) {
                this.deleteNode(node);
                return true;
            }
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
        let currentNode: CircularDoublyLinkedListNode<T>;
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
        let index = this.size - 1;
        for (let value of this.reverseIterator()) {
            if (value === searchValue) {
                return index;
            }
            index--;
        }
        return -1;
    }
    deleteAt(index: number): T {
        let targetNode = this.getNodeAt(index);
        let deletedValue = targetNode.value;
        this.deleteNode(targetNode);
        return deletedValue;
    }

    // Linked List Operations
    findNode(value: T): CircularDoublyLinkedListNode<T> | undefined {
        for (let node of this.nodes) {
            if (node.value === value) {
                return node;
            }
        }
    }

    findLastNode(value: T): CircularDoublyLinkedListNode<T> | undefined {
        for (let node of this.reverseNodeIterator()) {
            if (node.value === value) {
                return node;
            }
        }
    }

    getNodeAt(index: number): CircularDoublyLinkedListNode<T> {
        this.validateIndex(index);
        let iter = this.nodeIterator();
        let currentNode: CircularDoublyLinkedListNode<T>;
        for (let i = 0; i <= index; i++) {
            currentNode = iter.next().value;
        }
        return currentNode!;
    }

    insertFirst(value: T): CircularDoublyLinkedListNode<T>;
    insertFirst(newNode: CircularDoublyLinkedListNode<T>): CircularDoublyLinkedListNode<T>;
    insertFirst(o: T | CircularDoublyLinkedListNode<T>) {
        let newNode = this.coalesceToNode(o);
        this.validateNewNode(newNode);
        this.__internal__insertFirst(newNode);
        newNode.list = this;
        this._size++;
        return newNode;
    }

    insertLast(value: T): CircularDoublyLinkedListNode<T>;
    insertLast(newNode: CircularDoublyLinkedListNode<T>): CircularDoublyLinkedListNode<T>;
    insertLast(o: T | CircularDoublyLinkedListNode<T>) {
        let newNode = this.coalesceToNode(o);
        this.insertFirst(newNode);
        this._lastNode = newNode;
        return newNode;
    }

    insertBefore(node: CircularDoublyLinkedListNode<T>, value: T): CircularDoublyLinkedListNode<T>;
    insertBefore(node: CircularDoublyLinkedListNode<T>, newNode: CircularDoublyLinkedListNode<T>): CircularDoublyLinkedListNode<T>
    insertBefore(node: CircularDoublyLinkedListNode<T>, o: T | CircularDoublyLinkedListNode<T>) {
        let newNode = this.coalesceToNode(o);
        this.insertAfter(node.prev, newNode);
        return newNode;
    }

    insertAfter(node: CircularDoublyLinkedListNode<T>, value: T): CircularDoublyLinkedListNode<T>;
    insertAfter(node: CircularDoublyLinkedListNode<T>, newNode: CircularDoublyLinkedListNode<T>): CircularDoublyLinkedListNode<T> 
    insertAfter(node: CircularDoublyLinkedListNode<T>, o: T | CircularDoublyLinkedListNode<T>) {
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
        if (this._lastNode?.next) {
            this.deleteNode(this._lastNode.next);
            return true;
        }
        return false;
    }

    deleteLast(): boolean {
        if (this._lastNode) {
            this.deleteNode(this._lastNode);
            return true;
        }
        return false;
    }

    deleteBefore(node: CircularDoublyLinkedListNode<T>): boolean {
        if (node.prev) {
            this.deleteNode(node.prev);
            return true;
        }
        return false;
    }

    deleteAfter(node: CircularDoublyLinkedListNode<T>): boolean {
        if (node.next) {
            this.deleteNode(node.next);
            return true;
        }
        return false;
    }

    deleteNode(node: CircularDoublyLinkedListNode<T>): boolean {
        this.validateNode(node);
        node.list = undefined;
        this.__internal__delete(node);
        this._size--;
        return true;
    }

    protected validateIndex(index: number): void {
        if (index < 0 || index > this.size - 1) {
            throw new RangeError("Index was out of range. Must be non-negative and less than the size of the collection.");
        }
    }
    private validateNode(node: CircularDoublyLinkedListNode<T>): void {
        if (node.list != this) {
            throw new Error("node is not in this list.");
        }
    }
    private validateNewNode(newNode: CircularDoublyLinkedListNode<T>): void {
        if (newNode.list != null) {
            throw new Error("node is already in another list.");
        }
    }
    private coalesceToNode(o: T | CircularDoublyLinkedListNode<T>) {
        return !(o instanceof CircularDoublyLinkedListNode) ? new CircularDoublyLinkedListNode<T>(o) : o;
    }
    private __internal__insertFirst(newNode: CircularDoublyLinkedListNode<T>) {
        if (!this._lastNode) {
            this._lastNode = newNode;
        } else {
            this.__internal__insertAfter(this._lastNode, newNode);
        }
    }
    private __internal__insertAfter(node: CircularDoublyLinkedListNode<T>, newNode: CircularDoublyLinkedListNode<T>): void {
        newNode.next = node.next;
        newNode.prev = node;
        node.next.prev = newNode;
        node.next = newNode;
    }
    private __internal__delete(node: CircularDoublyLinkedListNode<T>): void {
        if (node.next === node) {
            this._lastNode = undefined;
        } else {
            node.next.prev = node.prev;
            node.prev.next = node.next;
            if (node === this.lastNode) {
                this._lastNode = node.prev;
            }
        }
    }

}