import { CircularDoublyLinkedList, CircularDoublyLinkedListNode } from "../../src/collections/CircularDoublyLinkedList";
import { SinglyLinkedListTests } from "./SinglyLinkedList";

export class CircularDoublyLinkedListTests extends SinglyLinkedListTests<CircularDoublyLinkedList> {
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