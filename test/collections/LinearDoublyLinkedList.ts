import { LinearDoublyLinkedList, LinearDoublyLinkedListNode } from "../../src/collections/LinearDoublyLinkedList";
import { LinkedListTests } from "./LinkedList";

export class LinearDoublyLinkedListTests extends LinkedListTests<LinearDoublyLinkedList> {
    constructor() {
        let newInstance = (values?: Iterable<any>) => new LinearDoublyLinkedList(values);
        let newNode = (value: any) => new LinearDoublyLinkedListNode(value);
        super(newInstance, newNode);
    }

    use() {
        describe("LinearDoublyLinkedList", () => {
            super.use();
        });
    }
}