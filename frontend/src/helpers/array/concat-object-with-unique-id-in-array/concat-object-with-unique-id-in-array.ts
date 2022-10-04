const ConcatObjectWithUniqueIdInArray = <T>(array1: T & { id: string }[], array2: T & { id: string }[]): void => {
  for (const elementOfSecondArray of array2) {
    const { id: secondArrayElementId } = elementOfSecondArray;
    const isElementInFirstArr = array1.findIndex((element) => element.id === secondArrayElementId);
    if (isElementInFirstArr === -1) {
      array1.push(elementOfSecondArray);
    }
  }
};

export { ConcatObjectWithUniqueIdInArray };
