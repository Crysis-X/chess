import Cell from "../Cell/Cell";
import MoveContext from "../MoveContext/MoveContext";
import Pawn from "../Pawn/Pawn";

type gameType = "online" | "double" | "offline";
const vars = {
  cellClasses: "w-[3vw] aspect-square flex items-center justify-center text-lg",
  boardClasses: "w-[30vw] flex flex-wrap border-border border-1 box-content",
};
export default class Chess {
  private type: gameType;
  private board = document.createElement("div");
  private playerColor: "white" | "black";
  private cells: Cell[][] = [];
  private moveContext?: MoveContext;
  constructor(type: gameType, playerColor: "white" | "black" = "white") {
    this.type = type;
    this.board.className = vars.boardClasses;
    this.playerColor = playerColor;
  }
  addInteract = () => {
    if(!this.cells.length) return false;
    this.moveContext = new MoveContext(this.cells);
    this.moveContext.startListening();
    return true;
  }
  appendBoardInto = (element: HTMLElement) => {
    if(!this.cells.length) return false;
    element.append(this.board);
    return true;
  }
  build = async () => {
    const chars = ["a", "b", "c", "d", "e", "f", "g", "h"];
    const nums = [1, 2, 3, 4, 5, 6, 7, 8].reverse();
    if (this.playerColor == "black") {
      chars.reverse();
      nums.reverse();
    }
    let isWhite = false;
    for (let y = -1; y < 9; y++) {
      const line: Cell[] = [];
      for (let x = -1; x < 9; x++) {
        if (y == -1 || y == 8) {
          const voidCell = document.createElement("div");
          voidCell.className = vars.cellClasses + " bg-background";
          if (x == -1 || x == 8) voidCell.innerHTML = "";
          else voidCell.innerHTML = chars[x];
          this.board.append(voidCell);
          continue;
        }
        if (x == -1 || x == 8) {
          const voidCell = document.createElement("div");
          voidCell.className = vars.cellClasses + " bg-background";
          voidCell.innerHTML = nums[y].toString();
          this.board.append(voidCell);
          continue;
        }
        const cell = new Cell(x, y, "cell-" + x + "-" + y, 
          vars.cellClasses + " " + (isWhite ? "bg-white" : "bg-black"));
        line.push(cell);
        cell.appendInto(this.board);
        isWhite = !isWhite;
      }
      if(line.length) this.cells.push(line);
      isWhite = !isWhite;
    }
    this.spawnFigures();
  };
  private spawnFigures = () => {
    if(!this.cells.length) return false;
    for(let i = 0; i < 8; i++){
      this.cells[1][i].setFigure(new Pawn("black", this.playerColor == "white" ? "+" : "-"));
      this.cells[6][i].setFigure(new Pawn("white", this.playerColor == "white" ? "-" : "+"));
    }
    return true;
  }
}
