import Cell from "../Cell/Cell";
import { Actions, GameType } from "../Chess/Chess";
import Elephant from "../Elephant/Elephant";
import Figure from "../Figure/Figure";
import Horse from "../Horse/Horse";
import King from "../King/King";
import Pawn from "../Pawn/Pawn";
import Queen from "../Queen/Queen";
import Rook from "../Rook/Rook";

export default class MoveContext {
  private cells: Cell[][] = [];
  private playerColor: "white" | "black";
  private gameType: GameType;
  private turn: "white" | "black" = "white";
  private actions: Actions;
  private whiteKing?: Cell;
  private blackKing?: Cell;
  constructor(cells: Cell[][], playerColor: "white" | "black", gameType: GameType, actions: Actions) {
    this.cells = cells;
    this.playerColor = playerColor;
    this.gameType = gameType;
    this.actions = actions;
    cells.forEach((line) => line.forEach(cell => {
      const figure = cell.getFigure();
      if(figure instanceof King){
        if(figure.getColor() == "white") this.whiteKing = cell;
        else this.blackKing = cell;
      } 
    }));
  }
  private createFake = (element: HTMLImageElement) => {
    const clone = element.cloneNode(true) as HTMLImageElement;
    clone.style.position = "absolute";
    clone.style.zIndex = "999";
    clone.style.width = "3vw";
    return clone;
  };
  private onDragStart = (e: MouseEvent) => e.preventDefault();
  private onMouseDown = (e: MouseEvent) => {
    if(this.gameType == "online"){
      if(this.playerColor != this.turn) return;
    }
    if (
      e.target instanceof HTMLImageElement &&
      e.target.className.includes("figure")
    ) {
      const cell = e.target.parentElement;
      if (cell && cell.id.includes("cell-")) {
        const [cls, x, y] = cell.id.split("-");
        const oldCell = this.cells[Number(y)][Number(x)];
        let figure = oldCell.getFigure();
        if(this.gameType == "double"){
          if(figure && figure.getColor() != this.turn) return;
        }
        const fake = this.createFake(e.target);
        document.body.append(fake);
        this.toMouse(e, fake);
        e.target.style.display = "none";
        const onMove = (event: MouseEvent) => this.toMouse(event, fake);
        document.addEventListener("mousemove", onMove);
        document.onmouseup = (event) => {
          fake.remove();
          if (e.target instanceof HTMLImageElement)
            e.target.style.display = "inline";
          document.removeEventListener("mousemove", onMove);
          document.onmouseup = null;
          if (cell && cell.id.includes("cell-")) {
            const elemsBelow = document.elementsFromPoint(
              event.clientX,
              event.clientY,
            );
            for (let i = 0; i < elemsBelow.length; i++) {
              if (elemsBelow[i].id.includes("cell-")) {
                const [cls, x, y] = elemsBelow[i].id.split("-");
                const newCell = this.cells[Number(y)][Number(x)];
                if (
                  oldCell?.getFigure()?.canMoveTo(this.cells, oldCell, newCell)
                ) { 
                  const oldFigure = oldCell.getFigure();
                  if(oldFigure instanceof Pawn){
                    if(newCell.getY() === 0 || newCell.getY() == 7){
                      const res = this.actions.whenPawnOnEnd && this.actions.whenPawnOnEnd();
                      if(res == "queen") figure = new Queen(oldFigure.getColor());
                      else if(res == "rook") figure = new Rook(oldFigure.getColor());
                      else if(res == "horse") figure = new Horse(oldFigure.getColor());
                      else if(res == "elephant") figure = new Elephant(oldFigure.getColor());
                    }
                  }
                  const killedFigure = newCell.getFigure(); 
                  if(killedFigure instanceof King)
                    this.actions.whenKingIsKilled && this.actions.whenKingIsKilled(killedFigure.getColor());
                  newCell.setFigure(figure);
                  oldCell.setFigure();
                  this.turn = this.turn == "white" ? "black" : "white"; 
                }
                break;
              }
            }
          }
        };
      }
    }
  };
  private toMouse = (event: MouseEvent, element: HTMLElement) => {
    element.style.left = event.pageX - element.offsetWidth / 2 + "px";
    element.style.top = event.pageY - element.offsetHeight / 2 + "px";
  };
  startListening = () => {
    document.addEventListener("dragstart", this.onDragStart);
    document.onmousedown = this.onMouseDown;
  };
}
