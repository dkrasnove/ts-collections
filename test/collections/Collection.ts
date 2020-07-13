import { expect } from "chai";
import "chai-iterator";
import { Collection } from "../../src/collections/Collection";

export class CollectionTests<T extends Collection> {
    newInstance: (values?: Iterable<any>) => T;

    constructor(newInstance: (values?: Iterable<any>) => T) {
        this.newInstance = newInstance;
    }

    use() {
        describe("#constructor()", () => {
            context("with no args", () => { 
                it("should construct an empty list", () => {
                    expect(this.newInstance()).to.iterate.for.lengthOf(0);
                });
            });
            context("with a collection", () => {
                it("should construct a list containing the elements of the specified collection", () => {
                    [[], [1], [1, 2], [1, 2, 3]].forEach((sample) => {
                        expect(this.newInstance(sample)).to.iterate.over(sample);
                    });
                });
            });
        });
        describe("#size", () => {
            it("should return the number of elements in the list", () => {
                [[], [1], [1, 2], [1, 2, 3]].forEach((sample) => {
                    expect(this.newInstance(sample).size).to.equal(sample.length);
                });
            });
        });
        describe("#iterator()", () => {
            it("should return an iterator over the elements in this list in proper sequence", () => {
                [[], [1], [1, 2], [1, 2, 3]].forEach((sample) => {
                    expect(this.newInstance(sample).iterator()).to.iterate.over(sample);
                });
            });
        });
        describe("#isEmpty()", () => {
            context("when list is empty", () => {
                it("should return true", () => {
                    expect(this.newInstance().isEmpty()).to.be.true;
                });
            });
            context("when list is not empty", () => {
                it("should return false", () => {
                    [[1], [1, 2], [1, 2, 3]].forEach((sample) => {
                        expect(this.newInstance(sample).isEmpty()).to.be.false;
                    });
                });
            });
        });
        describe("#has()", () => {
            context("when the specified element is present", () => {
                it("should return true", () => {
                    [[1], [1, 2], [1, 2, 3]].forEach((sample) => {
                        sample.forEach((value) => {
                            expect(this.newInstance(sample).has(value)).to.be.true;
                        });
                    });
                });
            });
            context("when the specified element is not present", () => {
                it("should return false", () => {
                    [[], [1], [1, 2], [1, 2, 3]].forEach((sample) => {
                        expect(this.newInstance(sample).has(4)).to.be.false;
                    });
                });
            });
        });
        describe("#add()", () => {
            it("should append the specified element to the end of the list", () => {
                let tests: { args: [number[], number], expected: number[] }[] = [
                    { args: [[], 1],        expected: [1] },
                    { args: [[1], 2],       expected: [1, 2] },
                    { args: [[1, 2], 3],    expected: [1, 2, 3] },
                    { args: [[1, 2, 3], 4], expected: [1, 2, 3, 4] }
                ];

                tests.forEach((test) => {
                    // Arrange
                    let list = this.newInstance(test.args[0]);
                            
                    // Act
                    list.add(test.args[1]);

                    // Assert
                    expect(list).to.iterate.over(test.expected);
                });
            });
            it("should return the list", () => {
                // Arrange
                let list = this.newInstance([1, 2, 3]);
        
                // Act
                let returnedList = list.add(4);
        
                // Assert
                expect(list).to.equal(returnedList);
            });
        })
        describe("#addEach()", () => {
            it("should append all of the elements in the specified collection to the end of the list", () => {
                let tests: { args: [number[], number[]], expected: number[] }[] = [
                    { args: [[], [1, 2, 3, 4]], expected: [1, 2, 3, 4] },
                    { args: [[1], [2, 3, 4]],   expected: [1, 2, 3, 4] },
                    { args: [[1, 2], [3, 4]],   expected: [1, 2, 3, 4] },
                    { args: [[1, 2, 3], [4]],   expected: [1, 2, 3, 4] },
                    { args: [[1, 2, 3, 4], []], expected: [1, 2, 3, 4] }
                ];

                tests.forEach((test) => {
                    // Arrange
                    let list = this.newInstance(test.args[0]);
                                    
                    // Act
                    list.addEach(test.args[1]);

                    // Assert
                    expect(list).to.iterate.over(test.expected);
                });
            });
            it("should return the list", () => {
                // Arrange
                let list = this.newInstance([1, 2, 3]);
        
                // Act
                let returnedList = list.addEach([4, 5, 6]);
        
                // Assert
                expect(list).to.equal(returnedList);
            });
        });
        describe("#delete()", () => {
            context("when the specified element is present", () => {
                it("should remove the first occurrence from the list", () => {
                    let tests: { args: [number[], number], expected: number[] }[] = [
                        { args: [[1], 1],       expected: [] },
                        { args: [[1, 2], 1],    expected: [2] },
                        { args: [[1, 2], 2],    expected: [1] },
                        { args: [[1, 2, 3], 1], expected: [2, 3] },
                        { args: [[1, 2, 3], 2], expected: [1, 3] },
                        { args: [[1, 2, 3], 3], expected: [1, 2] }
                    ];

                    tests.forEach((test) => {
                        // Arrange
                        let list = this.newInstance(test.args[0]);
                                
                        // Act
                        list.delete(test.args[1]);

                        // Assert
                        expect(list).to.iterate.over(test.expected);
                    });
                });
                it("should return true", () => {
                    // Arrange
                    let list = this.newInstance([1, 2, 3]);
        
                    // Act
                    let deleted = list.delete(2);
        
                    // Assert
                    expect(deleted).to.be.true;
                });
            });
            context("when the specified element is not present", () => {
                it("should not modify the list", () => {
                    let tests: { args: [number[], number], expected: number[] }[] = [
                        { args: [[1], -1],       expected: [1] },
                        { args: [[1, 2], -1],    expected: [1, 2] },
                        { args: [[1, 2, 3], -1], expected: [1, 2, 3] },
                    ];
                    
                    tests.forEach((test) => {
                        // Arrange
                        let list = this.newInstance(test.args[0]);
                                
                        // Act
                        list.delete(test.args[1]);

                        // Assert
                        expect(list).to.iterate.over(test.expected);
                    });
                });
                it("should return false", () => {
                    // Arrange
                    let list = this.newInstance([1, 2, 3]);
        
                    // Act
                    let deleted = list.delete(4);
        
                    // Assert
                    expect(deleted).to.be.false;
                })
            });
        });
        describe("#deleteEach()", () => {
            it("should remove from the list the first occurrence of each element that is contained in the specified collection", () => {
                let tests: { args: [number[], number[]], expected: number[] }[] = [
                    { args: [[], []],               expected: [] },
                    { args: [[1], []],              expected: [1] },
                    { args: [[1], [1]],             expected: [] },
                    { args: [[1, 2], []],           expected: [1, 2] },
                    { args: [[1, 2], [1]],          expected: [2] },
                    { args: [[1, 2], [2]],          expected: [1] },
                    { args: [[1, 2], [1, 2]],       expected: [] },
                    { args: [[1, 2, 3], []],        expected: [1, 2, 3] },
                    { args: [[1, 2, 3], [1]],       expected: [2, 3] },
                    { args: [[1, 2, 3], [2]],       expected: [1, 3] },
                    { args: [[1, 2, 3], [3]],       expected: [1, 2] },
                    { args: [[1, 2, 3], [1, 2]],    expected: [3] },
                    { args: [[1, 2, 3], [1, 3]],    expected: [2] },
                    { args: [[1, 2, 3], [2, 3]],    expected: [1] },
                    { args: [[1, 2, 3], [1, 2, 3]], expected: [] },
                ];

                tests.forEach((test) => {
                    // Arrange
                    let list = this.newInstance(test.args[0]);
                            
                    // Act
                    list.deleteEach(test.args[1]);

                    // Assert
                    expect(list).to.iterate.over(test.expected);
                });
            });
            it ("should return the number of deleted elements", () => {
                // Arrange
                let list = this.newInstance([1, 2, 3, 4, 5]);
        
                // Act
                let deleted = list.deleteEach([1, 3, 5]);
        
                // Assert
                expect(deleted).to.equal(3);
            });
        });
        describe("#clear()", () => {
            it("should remove all of the elements from the list", () => {
                [[], [1], [1, 2], [1, 2, 3]].forEach((sample) => {
                    // Arrange
                    let list = this.newInstance(sample);
                            
                    // Act
                    list.clear();

                    // Assert
                    expect(list).to.iterate.for.lengthOf(0);
                });
            });
        });
    }
}