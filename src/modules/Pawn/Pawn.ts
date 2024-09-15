import Figure from "../Figure/Figure";
import pawn from "@/assets/pawn.png";
import pawnWhite from "@/assets/pawn-white.png";
import Cell from "../Cell/Cell";

export default class Pawn extends Figure {
  private direction: "+" | "-";
  constructor(color: "white" | "black", direction: "+" | "-") {
    super(color, color == "white" ? pawnWhite.src : pawn.src);
    this.direction = direction;
  }
  canMoveTo = (cells: Cell[][], current: Cell, to: Cell) => {
    if (!current.getFigure()) return false;
    const variants: Cell[] = [];
    let y = this.direction == "+" ? current.getY() + 1 : current.getY() - 1;
    let x = current.getX();
    if (cells[y] && !cells[y][x]?.getFigure()) variants.push(cells[y][x]);
    x = current.getX() + 1;
    if (cells[y] && cells[y][x]?.getFigure()) {
      const cell = cells[y][x];
      if (!(cell.getFigure()?.getColor() == this.getColor()))
        variants.push(cell);
    }
    x = current.getX() - 1;
    if (cells[y] && cells[y][x]?.getFigure()) {
      const cell = cells[y][x];
      if (!(cell.getFigure()?.getColor() == this.getColor()))
        variants.push(cell);
    }
    if (current.getY() == 1 && this.direction == "+") {
      if (
        cells[current.getY() + 2] &&
        !cells[current.getY() + 2][current.getX()]?.getFigure()
      ) {
        variants.push(cells[current.getY() + 2][current.getX()]);
      }
    }
    if (current.getY() == 6 && this.direction == "-") {
      if (
        cells[current.getY() - 2] &&
        !cells[current.getY() - 2][current.getX()]?.getFigure()
      ) {
        variants.push(cells[current.getY() - 2][current.getX()]);
      }
    }
    if (!variants.length) return false;
    for (let i = 0; i < variants.length; i++) {
      if (variants[i].getX() == to.getX() && variants[i].getY() == to.getY())
        return true;
    }
    return false;
  };
}
