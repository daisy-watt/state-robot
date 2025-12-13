import { Table } from './Table';
import { Direction } from './Direction';


//robot does NOT know about input commands or output formatting only manages its own position and orientation
export class Robot {
  private x: number | null = null;
  private y: number | null = null;
  private direction: Direction | null = null;

  constructor(private readonly table: Table) {}

//puts the robot on the table if the position is valid
//invaild placements ignored
  place(x: number, y: number, direction: Direction): void {
    if (!this.table.isValidPosition(x, y)) {
      return;
    }

    this.x = x;
    this.y = y;
    this.direction = direction;
  }


// shows if the robot has been successfully placed
  isPlaced(): boolean {
    return this.x !== null && this.y !== null && this.direction !== null;
  }

// returns the current robot state
// !! use this later by REPORT and visualisation ad on
  getPosition(): { x: number; y: number; direction: Direction } | null {
    if (!this.isPlaced()) {
      return null;
    }

    return {
      x: this.x as number,
      y: this.y as number,
      direction: this.direction as Direction
    };
  }
}
