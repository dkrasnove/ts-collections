import { expect } from "chai";
import "chai-iterator";
import { List } from "../../src/collections/List";
import { CollectionTests } from "./Collection";

export class ListTests<T extends List> extends CollectionTests<T> {
    constructor(newInstance: (values?: Iterable<any>) => T) {
        super(newInstance);
    }

    use() {
        super.use();
        describe("#insert()", () => {
            context("with a valid index", () => {
                it("should insert the specified element at the specified position in this list", () => {
                    let tests: { args: [number[], number, number], expected: number[] }[] = [
                        { args: [[], 0, 1],     expected: [1] },
                        { args: [[2], 0, 1],    expected: [1, 2] },
                        { args: [[1], 1, 2],    expected: [1, 2] },
                        { args: [[2, 3], 0, 1], expected: [1, 2, 3] },
                        { args: [[1, 3], 1, 2], expected: [1, 2, 3] },
                        { args: [[1, 2], 2, 3], expected: [1, 2, 3] },
                    ];

                    tests.forEach((test) => {
                        // Arange
                        let list = this.newInstance(test.args[0]);
                                
                        // Act
                        list.insert(test.args[1], test.args[2]);

                        // Assert
                        expect(list).to.iterate.over(test.expected);
                    });
                });
                it ("should return the list", () => {
                    // Arrange
                    let list = this.newInstance([2, 3]);
        
                    // Act
                    let returnedList = list.insert(0, 1);
        
                    // Assert
                    expect(list).to.equal(returnedList);
                });
            });
            context("with an index less than zero", () => {
                it("should throw a RangeError", () => {
                    expect(() => this.newInstance([1, 2, 3]).insert(-1, -Infinity)).to.throw(RangeError);
                });
            });
            context("with an index greater than the size of the list", () => {
                it("should throw a RangeError", () => {
                    expect(() => this.newInstance([1, 2, 3]).insert(4, Infinity)).to.throw(RangeError);
                });
            })
        });
        describe("#insertEach()", () => {
            context("with a valid index", () => {
                it("should insert the specified elements at the specified position in this list", () => {
                    let tests: { args: [number[], number, number[]], expected: number[] }[] = [
                        { args: [[4, 5, 6, 7, 8, 9], 0, [1, 2, 3]], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
                        { args: [[1, 2, 3, 7, 8, 9], 3, [4, 5, 6]], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
                        { args: [[1, 2, 3, 4, 5, 6], 6, [7, 8, 9]], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
                    ];

                    tests.forEach((test) => {
                        // Arrange
                        let list = this.newInstance(test.args[0]);
            
                        // Act
                        list.insertEach(test.args[1], ...test.args[2]);
            
                        // Assert
                        expect(list).to.iterate.over(test.expected);
                    });
                });
                it ("should return the list", () => {
                    // Arrange
                    let list = this.newInstance([4, 5, 6]);
        
                    // Act
                    let returnedList = list.insertEach(0, 1, 2, 3);
        
                    // Assert
                    expect(list).to.equal(returnedList);
                });
            });
            context("with an index less than zero", () => {
                it("should throw a RangeError", () => {
                    expect(() => this.newInstance([4, 5, 6]).insertEach(-1, [1, 2, 3])).to.throw(RangeError);
                });
            });
            context("with an index greater than the size of the list", () => {
                it("should throw a RangeError", () => {
                    expect(() => this.newInstance([4, 5, 6]).insertEach(4, [7, 8, 9])).to.throw(RangeError);
                });
            })
        });
        describe("#set()", () => {
            it("should replace the element at the specified position in the list with the specified element", () => {
                let tests: { args: [number[], number, number], expected: number[] }[] = [
                    { args: [[1], 0, 4],       expected: [4] },
                    { args: [[1, 2], 0, 4],    expected: [4, 2] },
                    { args: [[1, 2], 1, 4],    expected: [1, 4] },
                    { args: [[1, 2, 3], 0, 4], expected: [4, 2, 3] },
                    { args: [[1, 2, 3], 1, 4], expected: [1, 4, 3] },
                    { args: [[1, 2, 3], 2, 4], expected: [1, 2, 4] },
                ];

                tests.forEach((test) => {
                    // Arrange
                    let list = this.newInstance(test.args[0]);
                            
                    // Act
                    list.set(test.args[1], test.args[2]);

                    // Assert
                    expect(list).to.iterate.over(test.expected);
                });
            });
        });
        describe("#get()", () => {
            it("should return the element at the specified position in the list", () => {
                [[1], [1, 2], [1, 2, 3]].forEach((sample) => {
                    sample.forEach((value, index) => {
                        expect(this.newInstance(sample).get(index)).to.equal(value);
                    });
                });
            });
        });
        describe("#indexOf()", () => {
            it("should return the index of the first occurrence of the specified element in the list, or -1 if the list does not contain the element", () => {
                expect(this.newInstance([1, 0, 1, 0, 1]).indexOf(1)).to.equal(0);
            });
        });
        describe("#lastIndexOf", () => {
            it("should return the index of the last occurrence of the specified element in the list, or -1 if the list does not contain the element", () => {
                expect(this.newInstance([1, 0, 1, 0, 1]).lastIndexOf(1)).to.equal(4);
            });
        });
        describe("#deleteAt()", () => {
            it("should remove the element at the specified position in this list", () => {
                let tests: { args: [number[], number], expected: number[] }[] = [
                    { args: [[1], 0],       expected: [] },
                    { args: [[1, 2], 0],    expected: [2] },
                    { args: [[1, 2], 1],    expected: [1] },
                    { args: [[1, 2, 3], 0], expected: [2, 3] },
                    { args: [[1, 2, 3], 1], expected: [1, 3] },
                    { args: [[1, 2, 3], 2], expected: [1, 2] },
                ];

                tests.forEach((test) => {
                    // Arrange
                    let list = this.newInstance(test.args[0]);
                            
                    // Act
                    let deleted = list.deleteAt(test.args[1]);

                    // Assert
                    expect(list).to.iterate.over(test.expected);
                });
            });
        });
    }
}