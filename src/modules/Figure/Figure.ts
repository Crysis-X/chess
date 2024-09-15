import Cell from "@/modules/Cell/Cell";
export default abstract class Figure {
  private color: "white" | "black";
  private figure: HTMLImageElement;
  constructor(color: "white" | "black", texture: string | HTMLImageElement) {
    this.color = color;
    if (typeof texture == "string") {
      const img = new Image();
      img.src = texture;
      img.className = "w-full aspect-square";
      this.figure = img;
    } else this.figure = texture;
    this.figure.className += " figure";
  }
  getColor = () => this.color;
  appendInto = (element: HTMLElement) => element.append(this.figure);
  setTexture = (texture: string | HTMLImageElement) => {
    this.figure.src = typeof texture == "string" ? texture : texture.src;
  };
  abstract canMoveTo: (cells: Cell[][], current: Cell, to: Cell) => boolean;
}
