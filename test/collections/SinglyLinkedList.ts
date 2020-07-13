import { expect } from "chai";
import "chai-iterator";
import { LinkedList, LinkedListNode } from "../../src/collections/LinkedList";
import { ListTests } from "./List";

export class SinglyLinkedListTests<T extends LinkedList> extends ListTests<T> {
    newNode: (value: any) => LinkedListNode;

    constructor(newInstance: (values?: Iterable<any>) => T, newNode: (value: any) => LinkedListNode) {
        super(newInstance);
        this.newNode = newNode;
    }
    
    use() {
        super.use();
        describe.skip("#nodes", () => {
            it("should return an iterator over the nodes in the list", () => {
                expect(this.newInstance([1, 2, 3])).to.iterate.over([1, 2, 3]);
            });
        });
        describe.skip("#firstNode", () => {
            it("should return the first node in the list", () => {
                expect(this.newInstance([1, 2, 3]).firstNode?.value).to.equal(1);
            });
        });
        describe.skip("#lastNode", () => {
            it("should return the last node in the list", () => {
                //expect(this.newInstance([1, 2, 3]).lastNode?.value).to.equal(3);
            });
        });
        describe.skip("#nodeIterator()", () => {
            it("should return an iterator over the nodes in this list in proper sequence", () => {
                
            });
        });
        describe.skip("#findNode()", () => {
            it("should find the first node that contains the specified value", () => {
        
            });
        });
        describe.skip("getNodeAt()", () => {
            it("should return the node at the specified position in the list", () => {
        
            });
        });
        describe.skip("#insertFirst()", () => {
            context("with a generic value", () => {
                it("should insert a new node containing the specified value at the start of the list", () => {
                    // Arrange
                    let list = this.newInstance();
        
                    // Act
                    list.insertFirst(1);
        
                    // Assert
                    expect(list).to.iterate.over([1]);
                });
                it ("should return the new node", () => {
                    // Arrange
                    let list = this.newInstance();
        
                    // Act
                    let newNode = list.insertFirst(1);
        
                    // Assert
                    expect(newNode.value).to.equal(1);
                });
            });
            context("with a node", () => {
                it("should insert the specified new node at the start of the list", () => {
                    // Arrange
                    let list = this.newInstance();
        
                    // Act
                    list.insertFirst(this.newNode(1));
        
                    // Assert
                    expect(list).to.iterate.over([1]);
                });
                it("should return the new node", () => {
                    // Arrange
                    let list = this.newInstance();
                    let newNode = this.newNode(1);
        
                    // Act
                    let returnedNode = list.insertFirst(newNode);
        
                    // Assert
                    expect(newNode).to.equal(returnedNode);
                });
            });
            
        });
        describe.skip("#insertAfter()", () => {
            it("should add the specified new node after the specified existing node in the list", () => {
                
            });
        });
        describe.skip("#deleteFirst()", () => {
            it("should remove the node at the start of the list", () => {
        
            });
        });
        describe.skip("deleteAfter()", () => {
            it("should remove the node after the specified existing node in the list", () => {
        
            });
        });
    }
}
