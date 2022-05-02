import { swap } from "../utils/arrayUtil";

let swapList = [];

function gnomeSort(arr, n) {
  let index = 0;

  while (index < n) {
    if (index == 0) index++;
    if (arr[index] >= arr[index - 1]) index++;
    else {
      swap(arr, index, index - 1, swapList);
      index--;
    }
  }
  return;
}

export default function sort(inputArr) {
  swapList = [];
  gnomeSort([...inputArr], inputArr.length);
  return swapList;
}
