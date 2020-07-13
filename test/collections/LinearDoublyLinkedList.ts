import { LinearDoublyLinkedList, LinearDoublyLinkedListNode } from "../../src/collections/LinearDoublyLinkedList";
import { SinglyLinkedListTests } from "./SinglyLinkedList";

export class LinearDoublyLinkedListTests extends SinglyLinkedListTests<LinearDoublyLinkedList> {
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