import Cell from "../Cell/Cell";

type gameType = "online" | "double" | "offline";
const vars = {
  cellClasses: "w-[3vw] aspect-square flex items-center justify-center text-lg",
  boardClasses: "w-[30vw] flex flex-wrap border-border border-1 box-content",
};
export default class Chess {
  private type: gameType;
  private board = document.createElement("div");
  private playerColor: "white" | "black";
  private cells: Array<Cell | HTMLDivElement>[] = [];
  constructor(type: gameType, playerColor: "white" | "black" = "white") {
    this.type = type;
    this.board.className = vars.boardClasses;
    this.playerColor = playerColor;
    console.log("chess");
  }
  appendBoardInto = (element: HTMLElement) => element.append(this.board);
  build = async () => {
    const chars = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const nums = [1, 2, 3, 4, 5, 6, 7, 8].reverse();
    if (this.playerColor == "black") {
      chars.reverse();
      nums.reverse();
    }
    let isWhite = true;
    for (let y = -1; y < 9; y++) {
      const line: Array<HTMLDivElement | Cell> = [];
      for (let x = -1; x < 9; x++) {
        let cell;
        if (y == -1 || y == 8) {
          cell = document.createElement("div");
          cell.className = vars.cellClasses + " bg-background";
          if (x == -1 || x == 8) cell.innerHTML = "";
          else cell.innerHTML = chars[x];
        } else if (x == -1 || x == 8) {
          cell = document.createElement("div");
          cell.className = vars.cellClasses + " bg-background";
          cell.innerHTML = nums[y].toString();
        } else
          cell = new Cell(
            x,
            y,
            vars.cellClasses + " " + (isWhite ? "bg-white" : "bg-black"),
          );
        line.push(cell);
        "getX" in cell ? cell.appendInto(this.board) : this.board.append(cell);
        isWhite = !isWhite;
      }
      this.cells.push(line);
      isWhite = !isWhite;
    }
  };
}
