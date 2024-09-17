import Figure from "../Figure/Figure";
import king from "@/assets/king.png";
import kingWhite from "@/assets/king-white.png";
import Cell from "../Cell/Cell";

export default class King extends Figure {
  private kingIsMoved = false;
  constructor(color: "white" | "black") {
    super(color, color == "white" ? kingWhite.src : king.src);
  }
  setIsMoved = (isMoved: boolean) => this.kingIsMoved = isMoved;
  isMoved = () => this.kingIsMoved;
  canMoveTo = (cells: Cell[][], current: Cell, to: Cell) => {
    const variants: Cell[] = [];
    const plus = [
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: -1, y: 1 },
      { x: 1, y: 0 },
      { x: -1, y: 0 },
      { x: 0, y: -1 },
      { x: 1, y: -1 },
      { x: -1, y: -1 },
    ];
    const y = current.getY();
    const x = current.getX();
    plus.forEach((data) => {
      const cellY = y + data.y;
      const cellX = x + data.x;
      if (cells[cellY] && cells[cellY][cellX]) {
        if (cells[cellY][cellX]?.getFigure()?.getColor() != this.getColor())
          variants.push(cells[cellY][cellX]);
      }
    });
    for (let i = 0; i < variants.length; i++) {
      if (variants[i].getX() == to.getX() && variants[i].getY() == to.getY())
        return true;
    }
    return false;
  };
}
