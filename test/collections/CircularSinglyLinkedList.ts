import { CircularSinglyLinkedList, CircularSinglyLinkedListNode } from "../../src/collections/CircularSinglyLinkedList";
import { SinglyLinkedListTests } from "./SinglyLinkedList";

export class CircularSinglyLinkedListTests extends SinglyLinkedListTests<CircularSinglyLinkedList> {
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