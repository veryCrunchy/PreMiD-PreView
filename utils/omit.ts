export function omit<T extends object, K extends keyof T>(obj: T, keysToOmit: K[]): Omit<T, K> {
    const result = { ...obj }; // Make a shallow copy of the object
    keysToOmit.forEach(key => {
        delete result[key];  // Remove each key from the copied object
    });
    return result;
}