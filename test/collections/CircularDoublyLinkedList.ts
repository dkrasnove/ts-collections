import { CircularDoublyLinkedList, CircularDoublyLinkedListNode } from "../../src/collections/CircularDoublyLinkedList";
import { LinkedListTests } from "./LinkedList";

export class CircularDoublyLinkedListTests extends LinkedListTests<CircularDoublyLinkedList> {
    constructor() {
        let newInstance = (values?: Iterable<any>) => new CircularDoublyLinkedList(values);
        let newNode = (value: any) => new CircularDoublyLinkedListNode(value);
        super(newInstance, newNode);
    }

    use() {
        describe("CircularDoublyLinkedList", () => {
            super.use();
        });
    }
}