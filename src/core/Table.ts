
// "table" the bot can move on, only forces rules - no tracking!

export class Table {
  constructor(
    // number of cols
    private readonly width: number = 5, 
    // number of rows
    private readonly height: number = 5
  ) {}

// decides if x & y are within table bounds
  isValidPosition(x: number, y: number): boolean {
    return (
      x >= 0 &&         // x must not be left of the table
      x < this.width && // x must not go past the right edge
      y >= 0 &&         // y must not be below the table
      y < this.height   // y must not go past the top edge
    );
  }
}
