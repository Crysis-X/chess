import horse from "@/assets/horse.png";
import horseWhite from "@/assets/horse-white.png";
import Figure from "../Figure/Figure";
import Cell from "../Cell/Cell";

export default class Horse extends Figure {
  constructor(color: "white" | "black") {
    super(color, color == "white" ? horseWhite.src : horse.src);
  }
  private checker = (cells: Cell[][], x: number, y: number) => {
    if (cells[y] && cells[y][x]) {
      if (cells[y][x].getFigure()?.getColor() != this.getColor()) return true;
    }
    return false;
  };
  canMoveTo = (cells: Cell[][], current: Cell, to: Cell) => {
    if (!current.getFigure()) return false;
    const variants: Cell[] = [];
    const plus = [
      { x: 1, y: 2 },
      { x: -1, y: 2 },
      { x: 1, y: -2 },
      { x: -1, y: -2 },
      { x: 2, y: 1 },
      { x: -2, y: 1 },
      { x: 2, y: -1 },
      { x: -2, y: -1 },
    ];
    plus.forEach((data) => {
      const x = current.getX() + data.x;
      const y = current.getY() + data.y;
      if (this.checker(cells, x, y)) variants.push(cells[y][x]);
    });
    for (let i = 0; i < variants.length; i++) {
      if (variants[i].getX() == to.getX() && variants[i].getY() == to.getY())
        return true;
    }
    return false;
  };
}
