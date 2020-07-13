import chai from "chai";
import chaiIterator from "chai-iterator";
import faker from "faker"
import { LinearSinglyLinkedListTests } from "./collections/LinearSinglyLinkedList";
import { CircularSinglyLinkedListTests } from "./collections/CircularSinglyLinkedList";
import { LinearDoublyLinkedListTests } from "./collections/LinearDoublyLinkedList";
import { CircularDoublyLinkedListTests } from "./collections/CircularDoublyLinkedList";

chai.use(chaiIterator);

new LinearSinglyLinkedListTests().use();
new CircularSinglyLinkedListTests().use();
new LinearDoublyLinkedListTests().use();
new CircularDoublyLinkedListTests().use();