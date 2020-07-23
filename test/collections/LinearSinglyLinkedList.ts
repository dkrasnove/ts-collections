import { LinearSinglyLinkedList, LinearSinglyLinkedListNode } from "../../src/collections/LinearSinglyLinkedList";
import { LinkedListTests } from "./LinkedList";

export class LinearSinglyLinkedListTests extends LinkedListTests<LinearSinglyLinkedList> {
    constructor() {
        let newInstance = (values?: Iterable<any>) => new LinearSinglyLinkedList(values);
        let newNode = (value: any) => new LinearSinglyLinkedListNode(value);
        super(newInstance, newNode);
    }

    use() {
        describe("LinearSinglyLinkedList", () => {
            super.use();
        });
    }
}