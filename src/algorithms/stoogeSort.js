import { swap } from "../utils/arrayUtil";

let swapList = [];

function stoogesort(arr, l, h) {
  if (l >= h) return;

  // If first element is smaller
  // than last, swap them
  if (arr[l] > arr[h]) {
    swap(arr, l, h, swapList);
  }

  // If there are more than 2
  // elements in the array
  if (h - l + 1 > 2) {
    let t = parseInt((h - l + 1) / 3, 10);

    // Recursively sort first
    // 2/3 elements
    stoogesort(arr, l, h - t);

    // Recursively sort last
    // 2/3 elements
    stoogesort(arr, l + t, h);

    // Recursively sort first
    // 2/3 elements again to
    // confirm
    stoogesort(arr, l, h - t);
  }
}

export default function sort(inputArr) {
  swapList = [];
  stoogesort([...inputArr], 0, inputArr.length - 1);
  return swapList;
}
