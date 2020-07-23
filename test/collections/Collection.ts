import { given } from "../given";
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
                it("should construct an empty collection", () => {
                    expect(this.newInstance()).to.iterate.for.lengthOf(0);
                });
            });
            context("with a collection", () => {
                given([
                    { sample: [] },
                    { sample: [1] },
                    { sample: [1, 2] },
                    { sample: [1, 2, 3] }
                ],
                ({ sample }) => {
                    it(`should construct a collection of [${sample}]`, () => {
                        expect(this.newInstance(sample)).to.iterate.over(sample);
                    });
                });
            });
        });
        describe("#size", () => {
            given([
                { sample: [],        size: 0 },
                { sample: [1],       size: 1 },
                { sample: [1, 2],    size: 2 },
                { sample: [1, 2, 3], size: 3 },
            ], 
            ({ sample, size }) => {
                it(`should return ${size} for [${sample}]`, () => {
                    expect(this.newInstance(sample).size).to.equal(size);
                });
            });
        });
        describe("#iterator()", () => {
            given([
                { sample: [] },
                { sample: [1] },
                { sample: [1, 2] },
                { sample: [1, 2, 3] }
            ], 
            ({ sample }) => {
                it(`should iterate over [${sample}]`, () => {
                    expect(this.newInstance(sample).iterator()).to.iterate.over(sample);
                });
            });
        });
        describe("#isEmpty()", () => {
            context("when collection is empty", () => {
                it("should return true", () => {
                    expect(this.newInstance().isEmpty()).to.be.true;
                });
            });
            context("when collection is not empty", () => {
                given([
                    { sample: [1] },
                    { sample: [1, 2] },
                    { sample: [1, 2, 3] }
                ], 
                ({ sample }) => {
                    it(`should return false for [${sample}]`, () => {
                        expect(this.newInstance(sample).isEmpty()).to.be.false;
                    });
                });
            });
        });
        describe("#has()", () => {
            context("when the value is present", () => {
                given([
                    { sample: [1],       value: 1 },
                    { sample: [1, 2],    value: 1 },
                    { sample: [1, 2],    value: 2 },
                    { sample: [1, 2, 3], value: 1 },
                    { sample: [1, 2, 3], value: 2 },
                    { sample: [1, 2, 3], value: 3 }
                ], 
                ({ sample, value }) => {
                    it(`should return true for ${value} in [${sample}]`, () => {
                        expect(this.newInstance(sample).has(value)).to.be.true;
                    });
                });
            });
            context("when the value is not present", () => {
                given([
                    { sample: [],        value: -1 },
                    { sample: [1],       value: -1 },
                    { sample: [1, 2],    value: -1 },
                    { sample: [1, 2, 3], value: -1 }
                ], 
                ({ sample, value }) => {
                    it(`should return false for ${value} in [${sample}]`, () => {
                        expect(this.newInstance(sample).has(value)).to.be.false;
                    });
                });
            });
        });
        describe("#add()", () => {
            given([
                { sample: [],        value: 1, expected: [1] },
                { sample: [1],       value: 2, expected: [1, 2] },
                { sample: [1, 2],    value: 3, expected: [1, 2, 3] },
                { sample: [1, 2, 3], value: 4, expected: [1, 2, 3, 4] }
            ], 
            ({ sample, value, expected }) => {
                it(`should append ${value} to [${sample}] and return [${expected}]`, () => {
                    // Arrange
                    let list = this.newInstance(sample);
    
                    // Act
                    let returnedList = list.add(value);
    
                    // Assert
                    expect(list).to.iterate.over(expected).and.equal(returnedList);
                });
            });
        })
        describe("#addEach()", () => {
            given([
                { sample: [],           values: [1, 2, 3, 4], expected: [1, 2, 3, 4] },
                { sample: [1],          values: [2, 3, 4],    expected: [1, 2, 3, 4] },
                { sample: [1, 2],       values: [3, 4],       expected: [1, 2, 3, 4] },
                { sample: [1, 2, 3],    values: [4],          expected: [1, 2, 3, 4] },
                { sample: [1, 2, 3, 4], values: [],           expected: [1, 2, 3, 4] },
            ], 
            ({ sample, values, expected }) => {
                it(`should append [${values}] to [${sample}] and return [${expected}]`, () => {
                    // Arrange
                    let list = this.newInstance(sample);
                                    
                    // Act
                    let returned = list.addEach(values);
    
                    // Assert
                    expect(list).to.iterate.over(expected).and.equal(returned);
                });
            });
        });
        describe("#delete()", () => {
            context("when the value is present", () => {
                context("and there is only one occurrence", () => {
                    given([
                        { sample: [1],       value: 1, expected: [] },
                        { sample: [1, 2],    value: 1, expected: [2] },
                        { sample: [1, 2],    value: 2, expected: [1] },
                        { sample: [1, 2, 3], value: 1, expected: [2, 3] },
                        { sample: [1, 2, 3], value: 2, expected: [1, 3] },
                        { sample: [1, 2, 3], value: 3, expected: [1, 2] }
                    ], 
                    ({ sample, value, expected }) => {
                        it(`should remove ${value} from [${sample}] and return true`, () => {
                            // Arrange
                            let list = this.newInstance(sample);

                            // Act
                            let deleted = list.delete(value);

                            // Assert
                            expect(list).to.iterate.over(expected);
                            expect(deleted).to.be.true;
                        });
                    });
                });
                context("and there are multiple occurrences", () => {
                    given([
                        { sample: [2, 1, 2, 3], value: 2, expected: [1, 2, 3] }
                    ], 
                    ({ sample, value, expected }) => {
                        it(`should remove the first occurrence of ${value} from [${sample}] and return true`, () => {
                            // Arrange
                            let list = this.newInstance(sample);
                                                            
                            // Act
                            let deleted = list.delete(value);
        
                            // Assert
                            expect(list).to.iterate.over(expected);
                            expect(deleted).to.be.true;
                        });
                    });
                });
            });
            context("when the value is not present", () => {
                given([
                    { sample: [1],       value: -1, expected: [1]},
                    { sample: [1, 2],    value: -1, expected: [1, 2]},
                    { sample: [1, 2, 3], value: -1, expected: [1, 2, 3]},
                ], 
                ({ sample, value, expected }) => {
                    it(`should not modify [${sample}] and return false`, () => {
                        // Arrange
                        let list = this.newInstance(sample);
                                                        
                        // Act
                        let deleted = list.delete(value);
    
                        // Assert
                        expect(list).to.iterate.over(expected);
                        expect(deleted).to.be.false;
                    });
                });
            });
        })
        describe("#deleteEach()", () => {
            context("when the specified values are present", () => {
                context("and there is only one occurrence of each", () => {
                    given([
                        { sample: [],        values: [],        expected: [],        deleted: 0 },
                        { sample: [1],       values: [],        expected: [1],       deleted: 0 },
                        { sample: [1],       values: [1],       expected: [],        deleted: 1 },
                        { sample: [1, 2],    values: [],        expected: [1, 2],    deleted: 0 },
                        { sample: [1, 2],    values: [1],       expected: [2],       deleted: 1 },
                        { sample: [1, 2],    values: [2],       expected: [1],       deleted: 1 },
                        { sample: [1, 2],    values: [1, 2],    expected: [],        deleted: 2 },
                        { sample: [1, 2, 3], values: [],        expected: [1, 2, 3], deleted: 0 },
                        { sample: [1, 2, 3], values: [1],       expected: [2, 3],    deleted: 1 },
                        { sample: [1, 2, 3], values: [2],       expected: [1, 3],    deleted: 1 },
                        { sample: [1, 2, 3], values: [3],       expected: [1, 2],    deleted: 1 },
                        { sample: [1, 2, 3], values: [1, 2],    expected: [3],       deleted: 2 },
                        { sample: [1, 2, 3], values: [1, 3],    expected: [2],       deleted: 2 },
                        { sample: [1, 2, 3], values: [2, 3],    expected: [1],       deleted: 2 },
                        { sample: [1, 2, 3], values: [1, 2, 3], expected: [],        deleted: 3 }
                    ], 
                    ({ sample, values, expected, deleted }) => {
                        it(`should remove each value in [${values}] from [${sample}] and return ${deleted}`, () => {
                            // Arrange
                            let list = this.newInstance(sample);
                                                        
                            // Act
                            let deleted = list.deleteEach(values);
            
                            // Assert
                            expect(list).to.iterate.over(expected);
                            expect(deleted).to.equal(deleted);
                        });
                    });
                });
                context("and there are multiple occurrences of each", () => {
                    given([
                        { sample: [1, 1],             values: [1],       expected: [1],             deleted: 1 },
                        { sample: [1, 2, 1, 2],       values: [1],       expected: [2, 1, 2],       deleted: 1 },
                        { sample: [1, 2, 1, 2],       values: [1, 2],    expected: [1, 2],          deleted: 2 },
                        { sample: [1, 2, 3, 1, 2, 3], values: [1],       expected: [2, 3, 1, 2, 3], deleted: 1 },
                        { sample: [1, 2, 3, 1, 2, 3], values: [1, 2],    expected: [3, 1, 2, 3],    deleted: 2 },
                        { sample: [1, 2, 3, 1, 2, 3], values: [1, 2, 3], expected: [1, 2, 3],       deleted: 3 }
                    ], 
                    ({ sample, values, expected, deleted }) => {
                        it(`should remove the first occurrence of each value in [${values}] from [${sample}] and return ${deleted}`, () => {
                            // Arrange
                            let list = this.newInstance(sample);
                                                        
                            // Act
                            let deleted = list.deleteEach(values);
            
                            // Assert
                            expect(list).to.iterate.over(expected);
                            expect(deleted).to.equal(deleted);
                        });
                    });
                });
            });
            context("when the specified values are not present", () => {
                given([
                    { sample: [],        values: [-1],         expected: [],        deleted: 0 },
                    { sample: [],        values: [-1, -2],     expected: [],        deleted: 0 },
                    { sample: [],        values: [-1, -2, -3], expected: [],        deleted: 0 },
                    { sample: [1],       values: [-1],         expected: [1],       deleted: 0 },
                    { sample: [1],       values: [-1, -2],     expected: [1],       deleted: 0 },
                    { sample: [1],       values: [-1, -2, -3], expected: [1],       deleted: 0 },
                    { sample: [1, 2],    values: [-1],         expected: [1, 2],    deleted: 0 },
                    { sample: [1, 2],    values: [-1, -2] ,    expected: [1, 2],    deleted: 0 },
                    { sample: [1, 2],    values: [-1, -2, -3], expected: [1, 2],    deleted: 0 },
                    { sample: [1, 2, 3], values: [-1] ,        expected: [1, 2, 3], deleted: 0 },
                    { sample: [1, 2, 3], values: [-1, -2],     expected: [1, 2, 3], deleted: 0 },
                    { sample: [1, 2, 3], values: [-1, -2, -3], expected: [1, 2, 3], deleted: 0 }
                ], 
                ({ sample, values, expected, deleted }) => {
                    it(`should not remove any elements in [${values}] from [${sample}] and return 0`, () => {
                        // Arrange
                        let list = this.newInstance(sample);
                                                    
                        // Act 
                        let deleted = list.deleteEach(values);
        
                        // Assert
                        expect(list).to.iterate.over(expected);
                        expect(deleted).to.equal(0);
                    });
                });
            });
        });
        describe("#clear()", () => {
            given([
                { sample: [] },
                { sample: [1] },
                { sample: [1, 2] },
                { sample: [1, 2, 3] },
            ],
            ({ sample }) => {
                it(`should remove all elements from [${sample}]`, () => {
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