import { expect } from "chai";
import "chai-iterator";
import { LinkedList, LinkedListNode } from "../../src/collections/LinkedList";
import { given } from "../given";
import { ListTests } from "./List";

export class LinkedListTests<T extends LinkedList> extends ListTests<T> {
    newNode: (value: any) => LinkedListNode;

    constructor(newInstance: (values?: Iterable<any>) => T, newNode: (value: any) => LinkedListNode) {
        super(newInstance);
        this.newNode = newNode;
    }
    
    use() {
        super.use();
        describe("#nodes", () => {
            it("should return an iterator over the nodes in the list", () => {
                expect(this.newInstance([1, 2, 3])).to.iterate.over([1, 2, 3]);
            });
        });
        describe("#firstNode", () => {
            it("should return the first node in the list", () => {
                expect(this.newInstance([1, 2, 3]).firstNode?.value).to.equal(1);
            });
        });
        describe("#lastNode", () => {
            it("should return the last node in the list", () => {
                expect(this.newInstance([1, 2, 3]).lastNode?.value).to.equal(3);
            });
        });
        describe("#nodeIterator()", () => {
            it("should return an iterator over the nodes in this list in proper sequence", () => {
                expect(this.newInstance([1, 2, 3])).to.iterate.over([1, 2, 3]);
            });
        });
        describe("#findNode()", () => {
            it("should find the first node that contains the specified value", () => {
                expect(this.newInstance([1, 2, 3]).findNode(2)?.value).to.equal(2);
            });
        });
        describe("getNodeAt()", () => {
            it("should return the node at the specified position in the list", () => {
                expect(this.newInstance([1, 2, 3]).getNodeAt(1).value).to.equal(2);
            });
        });
        describe("#insertFirst()", () => {
            context("with a generic value", () => {
                it("should insert a new node containing the specified value at the start of the list and return the new node", () => {
                    // Arrange
                    let list = this.newInstance();
        
                    // Act
                    let newNode = list.insertFirst(1);
        
                    // Assert
                    expect(list).to.iterate.over([1]);
                    expect(newNode.value).to.equal(1);
                });
            });
            context("with a node", () => {
                it("should insert the specified new node at the start of the list and return the new node", () => {
                    // Arrange
                    let list = this.newInstance();
        
                    // Act
                    let newNode = list.insertFirst(this.newNode(1));
        
                    // Assert
                    expect(list).to.iterate.over([1]);
                    expect(newNode.value).to.equal(1);
                });
            });
            
        });
        describe("#insertAfter()", () => {
            it("should add the specified new node after the specified existing node in the list", () => {
                let list = this.newInstance();

                let firstNode = list.insertFirst(1);
                let secondNode = list.insertAfter(firstNode, 2);
                let thirdNode = list.insertAfter(secondNode, 3);

                expect(list).to.iterate.over([1, 2, 3]);
            });
        });
        describe("#deleteFirst()", () => {
            it("should remove the node at the start of the list", () => {
                // Arrange
                let list = this.newInstance([1, 2, 3]);
                
                // Act
                let deleted = list.deleteFirst();
                
                // Assert
                expect(list).to.iterate.over([2, 3]);
                expect(deleted).to.be.true;
            });
        });
        describe("deleteAfter()", () => {
            it("should remove the node after the specified existing node in the list", () => {
                let list = this.newInstance();

                let firstNode = list.insertFirst(1);
                let secondNode = list.insertAfter(firstNode, 2);
                let thirdNode = list.insertAfter(secondNode, 3);

                list.deleteAfter(firstNode);

                expect(list).to.iterate.over([1, 3]);
            });
        });
    }
}