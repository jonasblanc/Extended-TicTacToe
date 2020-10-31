export function random(grid, side) {
  let i = 0;
  let j = 0;
  let result = 0;
  do {
    i = Math.floor(Math.random() * (side - 1));
    j = Math.floor(Math.random() * (side - 1));
    result = Number(i * side) + Number(j);
  } while (grid[result] != null);

  return result;
}
