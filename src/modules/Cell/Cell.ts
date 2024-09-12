import Figure from "../Figure/Figure";

export default class Cell {
  private figure: Figure | undefined;
  private x: number;
  private y: number;
  private cell = document.createElement("div");
  constructor(x: number, y: number, className?: string) {
    console.log("cell");
    this.x = x;
    this.y = y;
    this.cell.className = className || "";
  }
  getX = () => this.x;
  getY = () => this.y;
  setFigure = (figure?: Figure) => {
    this.figure = figure;
    this.cell.innerHTML = "";
    if(figure) figure.appendInto(this.cell);
    return figure;
  }
  appendInto = (element: HTMLElement) => element.append(this.cell);
  setClassName = (fn: (className: string) => any) => fn(this.cell.className);
}
