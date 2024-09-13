import Figure from "../Figure/Figure";

export default class Cell {
  private figure: Figure | undefined;
  private x: number;
  private y: number;
  private cell = document.createElement("div");
  private id: string;
  constructor(x: number, y: number, id: string, className?: string) {
    console.log("cell");
    this.x = x;
    this.y = y;
    this.id = id;
    this.cell.className = className || "";
  }
  getId = () => this.id;
  getX = () => this.x;
  getY = () => this.y;
  setFigure = (figure?: Figure) => {
    this.figure = figure;
    this.cell.innerHTML = "";
    if (figure) figure.appendInto(this.cell);
    return figure;
  };
  getFigure = () => this.figure;
  appendInto = (element: HTMLElement) => element.append(this.cell);
  setClassName = (fn: (className: string) => any) => fn(this.cell.className);
}
