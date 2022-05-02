export function generateHslaColors(saturation, lightness, alpha, amount) {
  let colors = [];
  let huedelta = Math.trunc(360 / amount);

  console.log("generating color");
  for (let i = 0; i < amount; i++) {
    let hue = i * huedelta;
    colors.push(`hsla(${hue},${saturation}%,${lightness}%,${alpha})`);
  }

  return colors;
}
