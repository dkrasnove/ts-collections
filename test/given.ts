export function given<T>(testCases: T[], callback: (testCases: T) => void) {
    testCases.forEach(callback);
}