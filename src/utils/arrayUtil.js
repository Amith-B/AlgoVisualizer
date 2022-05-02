export function shuffleArray(array) {
  const arr = [...array];
  let currentIndex = arr.length,
    randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [arr[currentIndex], arr[randomIndex]] = [
      arr[randomIndex],
      arr[currentIndex],
    ];
  }
  return arr;
}

export function getStepWiseArray(arr, swapList) {
  const partialSortedArr = [...arr];
  const stepWiseArr = [];
  swapList.forEach(([leftIndex, rightIndex]) => {
    [partialSortedArr[leftIndex], partialSortedArr[rightIndex]] = [
      partialSortedArr[rightIndex],
      partialSortedArr[leftIndex],
    ];
    stepWiseArr.push([...partialSortedArr]);
  });
  return stepWiseArr;
}
