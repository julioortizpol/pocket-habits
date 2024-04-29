export function removeEmptyFromArray(arr: any[]) {
    let filtered = arr.reduce((acc, i) => (i ? [...acc, i] : acc), []);
    return filtered;
  }