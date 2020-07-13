import { LinkedListNode, LinkedList } from "./LinkedList";

/*** Singly Linked List ***/
export class LinearSinglyLinkedListNode<T> implements LinkedListNode<T> {
    list?: LinearSinglyLinkedList<T>;
    next?: LinearSinglyLinkedListNode<T>;
    value: T;
    constructor(value: T) {
        this.value = value;
    }
}

export class LinearSinglyLinkedList<T = any> implements LinkedList<T> {
    get size(): number {
        return this._size;
    }
    get nodes(): Iterable<LinearSinglyLinkedListNode<T>> {
        return this.nodeIterator();
    }
    get firstNode(): LinearSinglyLinkedListNode<T> | undefined {
        return this._firstNode;
    }
    get lastNode(): LinearSinglyLinkedListNode<T> | undefined {
            let currentNode = this.firstNode;
            while (currentNode?.next) {
                currentNode = currentNode.next;
            }
            return currentNode;
    }
    private _size: number = 0;
    private _firstNode?: LinearSinglyLinkedListNode<T>;

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

    *nodeIterator(): IterableIterator<LinearSinglyLinkedListNode<T>> {
        let currentNode = this.firstNode;
        while (currentNode) {
            yield currentNode;
            currentNode = currentNode.next;
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
        let lastNode = this.lastNode;
        for (let val of values) {
            if (!lastNode) {
                lastNode = this.insertFirst(val);
            } else {
                lastNode = this.insertAfter(lastNode, val);
            }
        }
        return this;
    }
    delete(value: T): boolean {
        let previousNode: LinearSinglyLinkedListNode<T> | undefined;
        for (let node of this.nodes) {
            if (node.value == value) {
                if (!previousNode) {
                    this.deleteFirst();
                } else {
                    this.deleteAfter(previousNode);
                }
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
        this._firstNode = undefined;
    }

    // List Operations
    insert(index: number, value: T): this {
        return this.insertEach(index, value);
    }
    insertEach(index: number, ...values: T[]): this {
        let currentNode: LinearSinglyLinkedListNode<T>;
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
    findNode(value: T): LinearSinglyLinkedListNode<T> | undefined {
        for (let node of this.nodes) {
            if (node.value === value) {
                return node;
            }
        }
    }
    getNodeAt(index: number): LinearSinglyLinkedListNode<T> {
        this.validateIndex(index);
        let iter = this.nodeIterator();
        let currentNode: LinearSinglyLinkedListNode<T>;
        for (let i = 0; i <= index; i++) {
            currentNode = iter.next().value;
        }
        return currentNode!;
    }

    insertFirst(value: T): LinearSinglyLinkedListNode<T>;
    insertFirst(newNode: LinearSinglyLinkedListNode<T>): LinearSinglyLinkedListNode<T>;
    insertFirst(o: T | LinearSinglyLinkedListNode<T>) {
        let newNode = this.coalesceToNode(o);
        this.validateNewNode(newNode);
        this.__internal__insertFirst(newNode);
        newNode.list = this;
        this._size++;
        return newNode;
    }
    
    insertAfter(node: LinearSinglyLinkedListNode<T>, value: T): LinearSinglyLinkedListNode<T>
    insertAfter(node: LinearSinglyLinkedListNode<T>, newNode: LinearSinglyLinkedListNode<T>): LinearSinglyLinkedListNode<T> 
    insertAfter(node: LinearSinglyLinkedListNode<T>, o: T | LinearSinglyLinkedListNode<T>) {
        let newNode = this.coalesceToNode(o);
        this.validateNode(node);
        this.validateNewNode(newNode);
        this.__internal__insertAfter(node, newNode);
        newNode.list = this;
        this._size++;
        return newNode;
    }
    
    deleteFirst(): boolean {
        let hasNode = this.firstNode != null;
        if (hasNode) {
            this.firstNode!.list = undefined
            this.__internal__deleteFirst();
            this._size--;
        }
        return hasNode;
    }

    deleteAfter(node: LinearSinglyLinkedListNode<T>): boolean {
        this.validateNode(node);
        let hasNode = node.next != null;
        if (hasNode) {
            node.next!.list = undefined;
            this.__internal__deleteAfter(node);
            this._size--;
        }
        return hasNode;
    }

    protected validateIndex(index: number): void {
        if (index < 0 || index > this.size - 1) {
            throw new RangeError("Index was out of range. Must be non-negative and less than the size of the collection.");
        }
    }
    private validateNode(node: LinearSinglyLinkedListNode<T>): void {
        if (node.list != this) {
            throw new Error("node is not in this list.");
        }
    }
    private validateNewNode(newNode: LinearSinglyLinkedListNode<T>): void {
        if (newNode.list != null) {
            throw new Error("node is already in another list.");
        }
    }
    private coalesceToNode(o: T | LinearSinglyLinkedListNode<T>) {
        return !(o instanceof LinearSinglyLinkedListNode) ? new LinearSinglyLinkedListNode<T>(o) : o;
    }
    private __internal__insertFirst(newNode: LinearSinglyLinkedListNode<T>): void {
        newNode.next = this._firstNode;
        this._firstNode = newNode;
    }
    private __internal__insertAfter(node: LinearSinglyLinkedListNode<T>, newNode: LinearSinglyLinkedListNode<T>): void {
        newNode.next = node.next;
        node.next = newNode;
    }
    private __internal__deleteFirst(): void {
        this._firstNode = this._firstNode?.next;
    }
    private __internal__deleteAfter(node: LinearSinglyLinkedListNode<T>): void {
        node.next = node.next?.next;
    }
    
}