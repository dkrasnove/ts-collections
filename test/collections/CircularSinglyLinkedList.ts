import { CircularSinglyLinkedList, CircularSinglyLinkedListNode } from "../../src/collections/CircularSinglyLinkedList";
import { LinkedListTests } from "./LinkedList";

export class CircularSinglyLinkedListTests extends LinkedListTests<CircularSinglyLinkedList> {
    constructor() {
        let newInstance = (values?: Iterable<any>) => new CircularSinglyLinkedList(values);
        let newNode = (value: any) => new CircularSinglyLinkedListNode(value);
        super(newInstance, newNode);
    }

    use() {
        describe("CircularSinglyLinkedList", () => {
            super.use();
        });
    }
}