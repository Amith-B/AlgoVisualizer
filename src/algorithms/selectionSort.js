function selectionSort(inputArr, swapList) {
  // TODO: replace below code with actual algorithm, below code is bubble sort
  let len = inputArr.length;
  let checked;
  do {
    checked = false;
    for (let i = 0; i < len; i++) {
      if (inputArr[i] > inputArr[i + 1]) {
        [inputArr[i], inputArr[i + 1]] = [inputArr[i + 1], inputArr[i]];
        swapList.push([i, i + 1]);
        checked = true;
      }
    }
  } while (checked);
}

export default function sort(inputArr) {
  const swapList = [];
  selectionSort([...inputArr], swapList);
  return swapList;
}
