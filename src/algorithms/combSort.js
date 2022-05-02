import { swap } from "../utils/arrayUtil";

let swapList = [];

function getNextGap(gap) {
  // Shrink gap by Shrink factor
  gap = parseInt((gap * 10) / 13, 10);
  if (gap < 1) return 1;
  return gap;
}

// Function to sort arr[] using Comb Sort
function combSort(arr) {
  let n = arr.length;

  // initialize gap
  let gap = n;

  // Initialize swapped as true to
  // make sure that loop runs
  let swapped = true;

  // Keep running while gap is more than
  // 1 and last iteration caused a swap
  while (gap != 1 || swapped == true) {
    // Find next gap
    gap = getNextGap(gap);

    // Initialize swapped as false so that we can
    // check if swap happened or not
    swapped = false;

    // Compare all elements with current gap
    for (let i = 0; i < n - gap; i++) {
      if (arr[i] > arr[i + gap]) {
        // Swap arr[i] and arr[i+gap]
        swap(arr, i, i + gap, swapList);

        // Set swapped
        swapped = true;
      }
    }
  }
}

export default function sort(inputArr) {
  swapList = [];
  combSort([...inputArr]);
  return swapList;
}
