function selectionSort(inputArr, swapList) {
  let n = inputArr.length;

  for (let i = 0; i < n; i++) {
    // Finding the smallest number in the subarray
    let min = i;
    for (let j = i + 1; j < n; j++) {
      if (inputArr[j] < inputArr[min]) {
        min = j;
      }
    }
    if (min != i) {
      // Swapping the elements
      [inputArr[i], inputArr[min]] = [inputArr[min], inputArr[i]];
      swapList.push([i, min]);
    }
  }
  return inputArr;
}

export default function sort(inputArr) {
  const swapList = [];
  selectionSort([...inputArr], swapList);
  return swapList;
}
