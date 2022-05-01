export function getAlgoList(algos) {
  return Object.keys(algos).map((algo) => {
    const algoName = algo
      .split("_")
      .map((name) => name[0].toUpperCase() + name.slice(1))
      .join(" ");
    return {
      algoFunctionName: algo,
      algoName,
    };
  });
}
