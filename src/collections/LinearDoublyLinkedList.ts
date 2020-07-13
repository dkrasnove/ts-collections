import { DoublyLinkedListNode, DoublyLinkedList } from "./LinkedList";

/*** Doubly Linked List ***/
export class LinearDoublyLinkedListNode<T> implements DoublyLinkedListNode<T> {
    list?: LinearDoublyLinkedList<T>;
    next?: LinearDoublyLinkedListNode<T>;
    prev?: LinearDoublyLinkedListNode<T>;
    value: T;
    constructor(value: T) {
        this.value = value;
    }
}

export class LinearDoublyLinkedList<T = any> implements DoublyLinkedList<T> {
    get size(): number {
        return this._size;
    }
    get nodes(): Iterable<LinearDoublyLinkedListNode<T>> {
        return this.nodeIterator();
    }
    get firstNode(): LinearDoublyLinkedListNode<T> | undefined {
        return this._firstNode;
    }
    get lastNode(): LinearDoublyLinkedListNode<T> | undefined {
        return this._lastNode;
    }
    private _size: number = 0;
    private _firstNode?: LinearDoublyLinkedListNode<T>;
    private _lastNode?: LinearDoublyLinkedListNode<T>;

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

    *reverseIterator(): IterableIterator<T> {
        for (let node of this.reverseNodeIterator()) {
            yield node.value;
        }
    }

    *nodeIterator(): IterableIterator<LinearDoublyLinkedListNode<T>> {
        let currentNode = this.firstNode;
        while (currentNode) {
            yield currentNode;
            currentNode = currentNode.next;
        }
    }

    *reverseNodeIterator(): IterableIterator<LinearDoublyLinkedListNode<T>> {
        let currentNode = this.lastNode;
        while (currentNode) {
            yield currentNode;
            currentNode = currentNode.prev;
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
            if (node.value === value) {
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
        this._firstNode = undefined;
        this._lastNode = undefined;
    }

    // List Operations
    insert(index: number, value: T): this {
        return this.insertEach(index, value);
    }
    insertEach(index: number, ...values: T[]): this {
        let currentNode: LinearDoublyLinkedListNode<T>;
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
    findNode(value: T): LinearDoublyLinkedListNode<T> | undefined {
        for (let node of this.nodes) {
            if (node.value === value) {
                return node;
            }
        }
    }

    findLastNode(value: T): LinearDoublyLinkedListNode<T> | undefined {
        for (let node of this.reverseNodeIterator()) {
            if (node.value === value) {
                return node;
            }
        }
    }

    getNodeAt(index: number): LinearDoublyLinkedListNode<T> {
        this.validateIndex(index);
        let iter = this.nodeIterator();
        let currentNode: LinearDoublyLinkedListNode<T>;
        for (let i = 0; i <= index; i++) {
            currentNode = iter.next().value;
        }
        return currentNode!;
    }

    insertFirst(value: T): LinearDoublyLinkedListNode<T>;
    insertFirst(newNode: LinearDoublyLinkedListNode<T>): LinearDoublyLinkedListNode<T>;
    insertFirst(o: T | LinearDoublyLinkedListNode<T>) {
        let newNode = this.coalesceToNode(o);
        this.validateNewNode(newNode);
        this.__internal__insertFirst(newNode);
        newNode.list = this;
        this._size++;
        return newNode;
    }

    insertLast(value: T): LinearDoublyLinkedListNode<T>;
    insertLast(newNode: LinearDoublyLinkedListNode<T>): LinearDoublyLinkedListNode<T>;
    insertLast(o: T | LinearDoublyLinkedListNode<T>) {
        let newNode = this.coalesceToNode(o);
        this.validateNewNode(newNode);
        this.__internal__insertLast(newNode);
        newNode.list = this;
        this._size++;
        return newNode;
    }

    insertBefore(node: LinearDoublyLinkedListNode<T>, value: T): LinearDoublyLinkedListNode<T>;
    insertBefore(node: LinearDoublyLinkedListNode<T>, newNode: LinearDoublyLinkedListNode<T>): LinearDoublyLinkedListNode<T>
    insertBefore(node: LinearDoublyLinkedListNode<T>, o: T | LinearDoublyLinkedListNode<T>) {
        let newNode = this.coalesceToNode(o);
        this.validateNode(node);
        this.validateNewNode(newNode);
        this.__internal__insertBefore(node, newNode);
        newNode.list = this;
        this._size++;
        return newNode;
    }    

    insertAfter(node: LinearDoublyLinkedListNode<T>, value: T): LinearDoublyLinkedListNode<T>;
    insertAfter(node: LinearDoublyLinkedListNode<T>, newNode: LinearDoublyLinkedListNode<T>): LinearDoublyLinkedListNode<T> 
    insertAfter(node: LinearDoublyLinkedListNode<T>, o: T | LinearDoublyLinkedListNode<T>) {
        let newNode = this.coalesceToNode(o);
        this.validateNode(node);
        this.validateNewNode(newNode);
        this.__internal__insertAfter(node, newNode);
        newNode.list = this;
        this._size++;
        return newNode;
    }

    deleteFirst(): boolean {
        if (this.firstNode) {
            this.deleteNode(this.firstNode);
            return true;
        }
        return false;
    }

    deleteLast(): boolean {
        if (this.lastNode) {
            this.deleteNode(this.lastNode);
            return true;
        }
        return false;
    }

    deleteBefore(node: LinearDoublyLinkedListNode<T>): boolean {
        if (node.prev) {
            this.deleteNode(node.prev);
            return true;
        }
        return false;
    }

    deleteAfter(node: LinearDoublyLinkedListNode<T>): boolean {
        if (node.next) {
            this.deleteNode(node.next);
            return true;
        }
        return false;
    }

    deleteNode(node: LinearDoublyLinkedListNode<T>): boolean {
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
    private validateNode(node: LinearDoublyLinkedListNode<T>): void {
        if (node.list != this) {
            throw new Error("node is not in this list.");
        }
    }
    private validateNewNode(newNode: LinearDoublyLinkedListNode<T>): void {
        if (newNode.list != null) {
            throw new Error("node is already in another list.");
        }
    }
    private coalesceToNode(o: T | LinearDoublyLinkedListNode<T>) {
        return !(o instanceof LinearDoublyLinkedListNode) ? new LinearDoublyLinkedListNode<T>(o) : o;
    }
    private __internal__insertFirst(newNode: LinearDoublyLinkedListNode<T>): void {
        if (!this.firstNode) {
            this._firstNode = newNode;
            this._lastNode = newNode;
            newNode.prev = undefined;
            newNode.next = undefined;
        } else {
            this.__internal__insertBefore(this.firstNode, newNode);
        }
    }
    private __internal__insertLast(newNode: LinearDoublyLinkedListNode<T>): void {
        if (!this.lastNode) {
            this.__internal__insertFirst(newNode);
        } else {
            this.__internal__insertAfter(this.lastNode, newNode);
        }
    }
    private __internal__insertBefore(node: LinearDoublyLinkedListNode<T>, newNode: LinearDoublyLinkedListNode<T>): void {
        newNode.next = node;
        if (!node.prev) {
            newNode.prev = undefined;
            this._firstNode = newNode;
        } else {
            newNode.prev = node.prev;
            node.prev.next = newNode;
        }
        node.prev = newNode;
    }
    private __internal__insertAfter(node: LinearDoublyLinkedListNode<T>, newNode: LinearDoublyLinkedListNode<T>): void {
        newNode.prev = node;
        if (!node.next) {
            newNode.next = undefined;
            this._lastNode = newNode;
        } else {
            newNode.next = node.next;
            node.next.prev = newNode;
        }
        node.next = newNode;
    }
    private __internal__delete(node: LinearDoublyLinkedListNode<T>): void {
        if (!node.prev) {
            this._firstNode = node.next;
        } else {
            node.prev.next = node.next;
        }
        if (!node.next) {
            this._lastNode = node.prev;
        } else {
            node.next.prev = node.prev;
        }
    }
    
}