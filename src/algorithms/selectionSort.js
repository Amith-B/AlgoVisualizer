import { swap } from "../utils/arrayUtil";

let swapList = [];

function selectionSort(arr, n) {
  var i, j, min_idx;

  // One by one move boundary of unsorted subarray
  for (i = 0; i < n - 1; i++) {
    // Find the minimum element in unsorted array
    min_idx = i;
    for (j = i + 1; j < n; j++) if (arr[j] < arr[min_idx]) min_idx = j;

    // Swap the found minimum element with the first element
    swap(arr, min_idx, i, swapList);
  }
}
export default function sort(inputArr) {
  swapList = [];
  selectionSort([...inputArr], inputArr.length);
  return swapList;
}
