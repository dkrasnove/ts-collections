import { List } from "./List";

/*** Linked List Node Interfaces ***/
export interface LinkedListNode<T = any> {
    list?: LinkedList<T>;
    next?: LinkedListNode<T>;
    value: T;
    // insertAfter(value: T): void;
    // insertAfter(newNode: LinkedListNode<T>): void;
    // deleteAfter(): void;
    // delete(): void;
}

export interface DoublyLinkedListNode<T = any> extends LinkedListNode<T> {
    prev?: DoublyLinkedListNode<T>;
    // insertBefore(value: T): void;
    // insertBefore(newNode: LinkedListNode<T>): void;
    // deleteBefore(): void;
}

/*** Linked List Interfaces ***/
export interface LinkedList<T = any> extends List<T> { 
    size: number;
    nodes: Iterable<LinkedListNode<T>>;
    firstNode?: LinkedListNode<T>;
    findNode(value: T): LinkedListNode<T> | undefined;
    insertFirst(value: T): LinkedListNode<T>;
    insertFirst(newNode: LinkedListNode<T>): LinkedListNode<T>;
    insertAfter(node: LinkedListNode<T>, value: T): LinkedListNode<T>;
    insertAfter(node: LinkedListNode<T>, newNode: LinkedListNode<T>): LinkedListNode<T>;
    deleteFirst(): boolean;
    deleteAfter(node: LinkedListNode<T>): boolean;
}

export interface DoublyLinkedList<T = any> extends LinkedList<T> {
    lastNode?: DoublyLinkedListNode<T>;
    findLastNode(value: T): DoublyLinkedListNode<T> | undefined;
    insertLast(value: T): DoublyLinkedListNode<T>;
    insertLast(newNode: DoublyLinkedListNode<T>): DoublyLinkedListNode<T>;
    insertBefore(node: DoublyLinkedListNode<T>, value: T): DoublyLinkedListNode<T>;
    insertBefore(node: DoublyLinkedListNode<T>, newNode: DoublyLinkedListNode<T>): DoublyLinkedListNode<T>;
    deleteLast(): boolean;
    deleteBefore(node: DoublyLinkedListNode<T>): boolean;
    deleteNode(node: DoublyLinkedListNode<T>): boolean;
}