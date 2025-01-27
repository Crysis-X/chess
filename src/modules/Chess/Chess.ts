import Cell from "../Cell/Cell";
import Elephant from "../Elephant/Elephant";
import Horse from "../Horse/Horse";
import King from "../King/King";
import MoveContext from "../MoveContext/MoveContext";
import Pawn from "../Pawn/Pawn";
import Queen from "../Queen/Queen";
import Rook from "../Rook/Rook";

export type GameType = "online" | "double";

const vars = {
  cellClasses: "w-[3vw] aspect-square flex items-center justify-center text-lg",
  boardClasses: "w-[30vw] flex flex-wrap border-border border-1 box-content",
};
export type Actions = {
  whenKingIsKilled: Array<(winner: "white" | "black") => unknown>;
  whenTurnToggled: Array<(turn: "white" | "black" | undefined) => unknown>;
  whenPawnOnEnd?: () => "queen" | "rook" | "horse" | "elephant";
};
export default class Chess {
  private type: GameType;
  private board = document.createElement("div");
  private playerColor: "white" | "black";
  private cells: Cell[][] = [];
  private moveContext?: MoveContext;
  actions: Actions = {
    whenKingIsKilled: [],
    whenTurnToggled: [],
  };
  constructor(type: GameType, playerColor: "white" | "black" = "white") {
    this.type = type;
    this.board.className = vars.boardClasses;
    this.playerColor = playerColor;
  }
  getTurn = () => this.moveContext?.getTurn();
  addInteract = () => {
    if (!this.cells.length) return false;
    this.moveContext = new MoveContext(
      this.cells,
      this.playerColor,
      this.type,
      this.actions,
    );
    this.moveContext.startListening();
    return true;
  };
  removeinteract = () => {
    if (!this.moveContext) return false;
    this.moveContext.stopListeting();
  };
  appendBoardInto = (element: HTMLElement) => {
    if (!this.cells.length) return false;
    element.append(this.board);
    return true;
  };
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
        const cell = new Cell(
          x,
          y,
          "cell-" + x + "-" + y,
          vars.cellClasses + " " + (isWhite ? "bg-white" : "bg-black"),
        );
        line.push(cell);
        cell.appendInto(this.board);
        isWhite = !isWhite;
      }
      if (line.length) this.cells.push(line);
      isWhite = !isWhite;
    }
    this.spawnFigures();
  };
  private spawnFigures = () => {
    if (!this.cells.length) return false;
    for (let i = 0; i < 8; i++) {
      if (this.playerColor == "white") {
        this.cells[1][i].setFigure(new Pawn("black", "+"));
        this.cells[6][i].setFigure(new Pawn("white", "-"));
      } else {
        this.cells[1][i].setFigure(new Pawn("white", "+"));
        this.cells[6][i].setFigure(new Pawn("black", "-"));
      }
    }
    if (this.playerColor == "white") {
      this.cells[0][4].setFigure(new King("black"));
      this.cells[7][4].setFigure(new King("white"));
      this.cells[7][3].setFigure(new Queen("white"));
      this.cells[0][3].setFigure(new Queen("black"));
      this.cells[0][2].setFigure(new Elephant("black"));
      this.cells[0][5].setFigure(new Elephant("black"));
      this.cells[7][2].setFigure(new Elephant("white"));
      this.cells[7][5].setFigure(new Elephant("white"));
      this.cells[0][1].setFigure(new Horse("black"));
      this.cells[0][6].setFigure(new Horse("black"));
      this.cells[7][1].setFigure(new Horse("white"));
      this.cells[7][6].setFigure(new Horse("white"));
      this.cells[0][0].setFigure(new Rook("black"));
      this.cells[0][7].setFigure(new Rook("black"));
      this.cells[7][0].setFigure(new Rook("white"));
      this.cells[7][7].setFigure(new Rook("white"));
    } else {
      this.cells[0][3].setFigure(new King("white"));
      this.cells[7][3].setFigure(new King("black"));
      this.cells[0][4].setFigure(new Queen("white"));
      this.cells[7][4].setFigure(new Queen("black"));
      this.cells[7][2].setFigure(new Elephant("black"));
      this.cells[7][5].setFigure(new Elephant("black"));
      this.cells[0][2].setFigure(new Elephant("white"));
      this.cells[0][5].setFigure(new Elephant("white"));
      this.cells[7][1].setFigure(new Horse("black"));
      this.cells[7][6].setFigure(new Horse("black"));
      this.cells[0][1].setFigure(new Horse("white"));
      this.cells[0][6].setFigure(new Horse("white"));
      this.cells[0][0].setFigure(new Rook("white"));
      this.cells[0][7].setFigure(new Rook("white"));
      this.cells[7][0].setFigure(new Rook("black"));
      this.cells[7][7].setFigure(new Rook("black"));
    }
    return true;
  };
}
