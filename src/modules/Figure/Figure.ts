type FigureType = "pawn" | "rook" | "horse" | "elephant" | "queen" | "king";
export default class Figure {
  private figureType: FigureType;
  private color: "white" | "black";
  private figure: HTMLImageElement;
  constructor(
    figureType: FigureType,
    color: "white" | "black",
    texture: string | HTMLImageElement,
  ) {
    this.figureType = figureType;
    this.color = color;
    if (typeof texture == "string") {
      const img = new Image();
      img.src = texture;
      img.className = "w-full aspect-square";
      this.figure = img;
    } else this.figure = texture;
  }
  getColor = () => this.color;
  getType = () => this.figureType;
  appendInto = (element: HTMLElement) => element.append(this.figure);
  setTexture = (texture: string | HTMLImageElement) => {
    this.figure.src = typeof texture == "string" ? texture : texture.src;
  };
}
