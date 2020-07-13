import { LinearSinglyLinkedList, LinearSinglyLinkedListNode } from "../../src/collections/LinearSinglyLinkedList";
import { SinglyLinkedListTests } from "./SinglyLinkedList";

export class LinearSinglyLinkedListTests extends SinglyLinkedListTests<LinearSinglyLinkedList> {
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