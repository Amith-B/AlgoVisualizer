import { swap } from "../utils/arrayUtil";

let swapList = [];

// Reverses arr[0..i]
function flip(arr, i) {
  let start = 0;
  while (start < i) {
    swap(arr, start, i, swapList);
    start++;
    i--;
  }
}

// Returns index of the
// maximum element in
// arr[0..n-1]
function findMax(arr, n) {
  let mi, i;
  for (mi = 0, i = 0; i < n; ++i) if (arr[i] > arr[mi]) mi = i;

  return mi;
}

// The main function that
// sorts given array using
// flip operations
function pancakeSort(arr, n) {
  // Start from the complete
  // array and one by one
  // reduce current size by one
  for (let curr_size = n; curr_size > 1; --curr_size) {
    // Find index of the
    // maximum element in
    // arr[0..curr_size-1]
    let mi = findMax(arr, curr_size);

    // Move the maximum element
    // to end of current array
    // if it's not already at
    // the end
    if (mi != curr_size - 1) {
      // To move at the end,
      // first move maximum
      // number to beginning
      flip(arr, mi);

      // Now move the maximum
      // number to end by
      // reversing current array
      flip(arr, curr_size - 1);
    }
  }

  return 0;
}

export default function sort(inputArr) {
  swapList = [];
  pancakeSort([...inputArr], inputArr.length);
  return swapList;
}
