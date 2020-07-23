import { given } from "../given";
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
                given([
                    { sample: [],     index: 0, value: 1, expected: [1] },
                    { sample: [2],    index: 0, value: 1, expected: [1, 2] },
                    { sample: [1],    index: 1, value: 2, expected: [1, 2] },
                    { sample: [2, 3], index: 0, value: 1, expected: [1, 2, 3] },
                    { sample: [1, 3], index: 1, value: 2, expected: [1, 2, 3] },
                    { sample: [1, 2], index: 2, value: 3, expected: [1, 2, 3] }
                ], 
                ({ sample, index, value, expected }) => {
                    it(`should insert ${value} at pos ${index} in [${sample}] and return [${expected}]`, () => {
                        // Arange
                        let list = this.newInstance(sample);
                                
                        // Act
                        let returnedList = list.insert(index, value);
    
                        // Assert
                        expect(list).to.iterate.over(expected).and.equal(returnedList);
                    });
                });
            });
            context("with an index less than zero", () => {
                given([
                    { sample: [],        index: -1, value: -Infinity },
                    { sample: [1],       index: -1, value: -Infinity },
                    { sample: [1, 2],    index: -1, value: -Infinity },
                    { sample: [1, 2, 3], index: -1, value: -Infinity }
                ], 
                ({ sample, index, value }) => {
                    it(`should throw a RangeError for pos ${index} of [${sample}]`, () => {
                        expect(() => this.newInstance(sample).insert(index, value)).to.throw(RangeError);
                    });
                });
            });
            context("with an index greater than the size of the list", () => {
                given([
                    { sample: [],        index: 1, value: Infinity },
                    { sample: [1],       index: 2, value: Infinity },
                    { sample: [1, 2],    index: 3, value: Infinity },
                    { sample: [1, 2, 3], index: 4, value: Infinity }
                ], 
                ({ sample, index, value }) => {
                    it(`should throw a RangeError for pos ${index} of [${sample}]`, () => {
                        expect(() => this.newInstance(sample).insert(index, value)).to.throw(RangeError);
                    });
                });
            });
        });
        describe("#insertEach()", () => {
            context("with a valid index", () => {
                given([
                    { sample: [4, 5, 6, 7, 8, 9], index: 0, values: [1, 2, 3], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
                    { sample: [1, 2, 3, 7, 8, 9], index: 3, values: [4, 5, 6], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
                    { sample: [1, 2, 3, 4, 5, 6], index: 6, values: [7, 8, 9], expected: [1, 2, 3, 4, 5, 6, 7, 8, 9] },
                ], 
                ({ sample, index, values, expected }) => { 
                    it(`should insert [${values}] at pos ${index} in [${sample}] and return [${expected}]`, () => {
                        // Arrange
                        let list = this.newInstance(sample);
            
                        // Act
                        let returnedList = list.insertEach(index, ...values);
            
                        // Assert
                        expect(list).to.iterate.over(expected).and.equal(returnedList);
                    });
                });
            });
            context("with an index less than zero", () => {
                given([
                    { sample: [],        index: -1, values: [-Infinity] },
                    { sample: [1],       index: -1, values: [-Infinity] },
                    { sample: [1, 2],    index: -1, values: [-Infinity] },
                    { sample: [1, 2, 3], index: -1, values: [-Infinity] }
                ],
                ({ sample, index, values }) => {
                    it(`should throw a RangeError for pos ${index} of [${sample}]`, () => {
                        expect(() => this.newInstance(sample).insertEach(index, values)).to.throw(RangeError);
                    });
                });
            });
            context("with an index greater than the size of the list", () => {
                given([
                    { sample: [],        index: 1, values: [Infinity] },
                    { sample: [1],       index: 2, values: [Infinity] },
                    { sample: [1, 2],    index: 3, values: [Infinity] },
                    { sample: [1, 2, 3], index: 4, values: [Infinity] }
                ],
                ({ sample, index, values }) => {
                    it(`should throw a RangeError for pos ${index} of [${sample}]`, () => {
                        expect(() => this.newInstance(sample).insert(index, values)).to.throw(RangeError);
                    });
                });
            });
        });
        describe("#set()", () => {
            context("with a valid index", () => {
                given([
                    { sample: [1],       index: 0, value: 4, expected: [4] },
                    { sample: [1, 2],    index: 1, value: 4, expected: [1, 4] },
                    { sample: [1, 2, 3], index: 0, value: 4, expected: [4, 2, 3] },
                    { sample: [1, 2, 3], index: 1, value: 4, expected: [1, 4, 3] },
                    { sample: [1, 2, 3], index: 2, value: 4, expected: [1, 2, 4] },
                ], 
                ({ sample, index, value, expected }) => {
                    it(`should replace the element at pos ${index} in [${sample}] with ${value} and return [${expected}]`, () => {
                        // Arrange
                        let list = this.newInstance(sample);
    
                        // Act
                        let returnedList = list.set(index, value);
    
                        // Assert
                        expect(list).to.iterate.over(expected).and.equal(returnedList);
                    });
                });
            });
            context("with an index less than zero", () => {
                given([
                    { sample: [],        index: -1, value: -Infinity },
                    { sample: [1],       index: -1, value: -Infinity },
                    { sample: [1, 2],    index: -1, value: -Infinity },
                    { sample: [1, 2, 3], index: -1, value: -Infinity }
                ],
                ({ sample, index, value }) => {
                    it(`should throw a RangeError for pos ${index} of [${sample}]`, () => {
                        expect(() => this.newInstance(sample).set(index, value)).to.throw(RangeError);
                    });
                });
            });
            context("with an index greater than the size of the list", () => {
                given([
                    { sample: [],        index: 1, value: Infinity },
                    { sample: [1],       index: 2, value: Infinity },
                    { sample: [1, 2],    index: 3, value: Infinity },
                    { sample: [1, 2, 3], index: 4, value: Infinity }
                ],
                ({ sample, index, value }) => {
                    it(`should throw a RangeError for pos ${index} of [${sample}]`, () => {
                        expect(() => this.newInstance(sample).set(index, value)).to.throw(RangeError);
                    });
                });
            });
        });
        describe("#get()", () => {
            context("with a valid index", () => {
                given([
                    { sample: [1],       index: 0, expected: 1 },
                    { sample: [1, 2],    index: 0, expected: 1 },
                    { sample: [1, 2],    index: 1, expected: 2 },
                    { sample: [1, 2, 3], index: 0, expected: 1 },
                    { sample: [1, 2, 3], index: 1, expected: 2 },
                    { sample: [1, 2, 3], index: 2, expected: 3 },
                ], 
                ({ sample, index, expected }) => {
                    it(`should retrieve the element at pos ${index} in [${sample}] and return ${expected}`, () => {
                        expect(this.newInstance(sample).get(index)).to.equal(expected);
                    });
                });
            });
            context("with an index less than zero", () => {
                given([
                    { sample: [],        index: -1 },
                    { sample: [1],       index: -1 },
                    { sample: [1, 2],    index: -1 },
                    { sample: [1, 2, 3], index: -1 }
                ],
                ({ sample, index }) => {
                    it(`should throw a RangeError for pos ${index} of [${sample}]`, () => {
                        expect(() => this.newInstance(sample).get(index)).to.throw(RangeError);
                    });
                });
            });
            context("with an index greater than the size of the list", () => {
                given([
                    { sample: [],        index: 1 },
                    { sample: [1],       index: 2 },
                    { sample: [1, 2],    index: 3 },
                    { sample: [1, 2, 3], index: 4 }
                ],
                ({ sample, index }) => {
                    it(`should throw a RangeError for pos ${index} of [${sample}]`, () => {
                        expect(() => this.newInstance(sample).get(index)).to.throw(RangeError);
                    });
                });
            });
        });
        describe("#indexOf()", () => {
            context("when the value is present", () => {
                context("and there is only one occurrence", () => {
                    given([
                        { sample: [1],       value: 1, expected: 0 },
                        { sample: [1, 2],    value: 1, expected: 0 },
                        { sample: [1, 2],    value: 2, expected: 1 },
                        { sample: [1, 2, 3], value: 1, expected: 0 },
                        { sample: [1, 2, 3], value: 2, expected: 1 },
                        { sample: [1, 2, 3], value: 3, expected: 2 }
                    ], 
                    ({ sample, value, expected }) => {
                        it(`should return ${expected} for ${value} in [${sample}]`, () => {
                            expect(this.newInstance(sample).indexOf(value)).to.equal(expected);
                        });
                    });
                });
                context("and there are multiple occurrences", () => {
                    given([
                        { sample: [2, 1, 2, 3], value: 2, expected: 0 }
                    ], 
                    ({ sample, value, expected }) => {
                        it(`should return ${expected} for the first occurrence of ${value} in [${sample}]`, () => {
                            expect(this.newInstance(sample).indexOf(value)).to.equal(expected);
                        });
                    });
                });
            });
            context("when the value is not present", () => {
                given([
                    { sample: [1],       value: 2, expected: -1 },
                    { sample: [1, 2],    value: 3, expected: -1 },
                    { sample: [1, 2, 3], value: 4, expected: -1 }
                ], 
                ({ sample, value, expected }) => {
                    it(`should return -1 for ${value} in [${sample}]`, () => {
                        expect(this.newInstance(sample).indexOf(value)).to.equal(expected);
                    });
                });
            });
        });
        describe("#lastIndexOf", () => {
            context("when the value is present", () => {
                context("and there is only one occurrence", () => {
                    given([
                        { sample: [1],       value: 1, expected: 0 },
                        { sample: [1, 2],    value: 1, expected: 0 },
                        { sample: [1, 2],    value: 2, expected: 1 },
                        { sample: [1, 2, 3], value: 1, expected: 0 },
                        { sample: [1, 2, 3], value: 2, expected: 1 },
                        { sample: [1, 2, 3], value: 3, expected: 2 }
                    ], 
                    ({ sample, value, expected }) => {
                        it(`should return ${expected} for ${value} in [${sample}]`, () => {
                            expect(this.newInstance(sample).lastIndexOf(value)).to.equal(expected);
                        });
                    });
                });
                context("and there are multiple occurrences", () => {
                    given([
                        { sample: [2, 1, 2, 3], value: 2, expected: 2 }
                    ], 
                    ({ sample, value, expected }) => {
                        it(`should return ${expected} for the last occurrence of ${value} in [${sample}]`, () => {
                            expect(this.newInstance(sample).lastIndexOf(value)).to.equal(expected);
                        });
                    });
                });
            });
            context("when the value is not present", () => {
                given([
                    { sample: [1],       value: 2, expected: -1 },
                    { sample: [1, 2],    value: 3, expected: -1 },
                    { sample: [1, 2, 3], value: 4, expected: -1 }
                ], 
                ({ sample, value, expected }) => {
                    it(`should return -1 for ${value} in [${sample}]`, () => {
                        expect(this.newInstance(sample).lastIndexOf(value)).to.equal(expected);
                    });
                });
            });
        });
        describe("#deleteAt()", () => {
            context("with a valid index", () => {
                given([
                    { sample: [1],       index: 0, expected: [],     value: 1 },
                    { sample: [1, 2],    index: 0, expected: [2],    value: 1 },
                    { sample: [1, 2],    index: 1, expected: [1],    value: 2 },
                    { sample: [1, 2, 3], index: 0, expected: [2, 3], value: 1 },
                    { sample: [1, 2, 3], index: 1, expected: [1, 3], value: 2 },
                    { sample: [1, 2, 3], index: 2, expected: [1, 2], value: 3 },
                ], 
                ({ sample, index, expected, value }) => {
                    it(`should remove the element at pos ${index} in [${sample}] and return ${value}`, () => {
                        // Arrange
                        let list = this.newInstance(sample);
                                
                        // Act
                        let deleted = list.deleteAt(index);

                        // Assert
                        expect(list).to.iterate.over(expected);
                        expect(deleted).to.equal(value);
                    });
                });
            });
            context("with an index less than zero", () => {
                given([
                    { sample: [],        index: -1 },
                    { sample: [1],       index: -1 },
                    { sample: [1, 2],    index: -1 },
                    { sample: [1, 2, 3], index: -1 }
                ],
                ({ sample, index }) => {
                    it(`should throw a RangeError for pos ${index} of [${sample}]`, () => {
                        expect(() => this.newInstance(sample).deleteAt(index)).to.throw(RangeError);
                    });
                });
            });
            context("with an index greater than the size of the list", () => {
                given([
                    { sample: [],        index: 1 },
                    { sample: [1],       index: 2 },
                    { sample: [1, 2],    index: 3 },
                    { sample: [1, 2, 3], index: 4 }
                ],
                ({ sample, index }) => {
                    it(`should throw a RangeError for pos ${index} of [${sample}]`, () => {
                        expect(() => this.newInstance(sample).deleteAt(index)).to.throw(RangeError);
                    });
                });
            });
        });
    }
}