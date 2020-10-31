import defense from "./defensive";

export default function nextMoveIA(grid, side, ownSymbol) {
  //alert("What's my next move ?");
  return defense(grid, side, ownSymbol);
}
