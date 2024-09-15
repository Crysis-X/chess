import Cell from "../Cell/Cell";

export default class MoveContext {
  private cells: Cell[][] = [];
  constructor(cells: Cell[][]) {
    this.cells = cells;
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
    if (
      e.target instanceof HTMLImageElement &&
      e.target.className.includes("figure")
    ) {
      const cell = e.target.parentElement;
      if (cell && cell.id.includes("cell-")) {
        const [cls, x, y] = cell.id.split("-");
        const oldCell = this.cells[Number(y)][Number(x)];
        const figure = oldCell.getFigure();
        const fake = this.createFake(e.target);
        e.target.style.display = "none";
        document.body.append(fake);
        this.toMouse(e, fake);
        const onMove = (event: MouseEvent) => this.toMouse(event, fake);
        document.addEventListener("mousemove", onMove);
        document.onmouseup = (event) => {
          fake.remove();
          if (e.target instanceof HTMLImageElement) e.target.style.display = "inline";
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
                  const newCell =
                    this.cells[Number(y)][Number(x)];
                  if (
                    oldCell
                      ?.getFigure()
                      ?.canMoveTo(this.cells, oldCell, newCell)
                  ) {
                    newCell.setFigure(figure);
                    oldCell.setFigure();
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
