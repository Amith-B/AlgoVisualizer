import { swap } from "../utils/arrayUtil";

let swapList = [];

function oddEvenSort(arr, n) {
  // Initially array is unsorted

  let isSorted = false;

  while (!isSorted) {
    isSorted = true;

    // Perform Bubble sort on odd indexed element
    for (let i = 1; i <= n - 2; i = i + 2) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1, swapList);
        isSorted = false;
      }
    }

    // Perform Bubble sort on even indexed element
    for (let i = 0; i <= n - 2; i = i + 2) {
      if (arr[i] > arr[i + 1]) {
        swap(arr, i, i + 1, swapList);
        isSorted = false;
      }
    }
  }

  return;
}

export default function sort(inputArr) {
  swapList = [];
  oddEvenSort([...inputArr], inputArr.length);
  return swapList;
}
