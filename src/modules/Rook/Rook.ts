import Figure from "../Figure/Figure";
import rook from "@/assets/rook.png";
import rookWhite from "@/assets/rook-white.png";
import Cell from "../Cell/Cell";
export default class Rook extends Figure {
  constructor(color: "white" | "black") {
    super(color, color == "white" ? rookWhite.src : rook.src);
  }
  private checker = (cells: Cell[][], x: number, y: number) => {
    if (cells[y] && cells[y][x]) {
      const figure = cells[y][x].getFigure();
      if (figure) {
        if (figure.getColor() == this.getColor()) return "break";
        return "variant-break";
      }
      return "variant";
    }
    return "break";
  };
  canMoveTo = (cells: Cell[][], current: Cell, to: Cell) => {
    if (!current.getFigure()) return false;
    const variants: Cell[] = [];
    for (let i = 1; cells[i]; i++) {
      const y = current.getY() + i;
      const x = current.getX();
      const res = this.checker(cells, x, y);
      if (res == "variant") variants.push(cells[y][x]);
      else if (res == "variant-break") {
        variants.push(cells[y][x]);
        break;
      } else break;
    }
    for (let i = 1; cells[i]; i++) {
      const y = current.getY() - i;
      const x = current.getX();
      const res = this.checker(cells, x, y);
      if (res == "variant") variants.push(cells[y][x]);
      else if (res == "variant-break") {
        variants.push(cells[y][x]);
        break;
      } else break;
    }
    for (let i = 1; cells[i]; i++) {
      const y = current.getY();
      const x = current.getX() + i;
      const res = this.checker(cells, x, y);
      if (res == "variant") variants.push(cells[y][x]);
      else if (res == "variant-break") {
        variants.push(cells[y][x]);
        break;
      } else break;
    }
    for (let i = 1; cells[i]; i++) {
      const y = current.getY();
      const x = current.getX() - i;
      const res = this.checker(cells, x, y);
      if (res == "variant") variants.push(cells[y][x]);
      else if (res == "variant-break") {
        variants.push(cells[y][x]);
        break;
      } else break;
    }
    for (let i = 0; i < variants.length; i++) {
      if (variants[i].getX() == to.getX() && variants[i].getY() == to.getY())
        return true;
    }
    return false;
  };
}
