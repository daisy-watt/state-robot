import { Table } from './Table';
import { Direction, rotateLeft, rotateRight } from './Direction';

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

// incriments robot move one unit forward in the direction faced, ignores if invalid
  move(): void {
    if (!this.isPlaced()) return;

    let newX = this.x as number;
    let newY = this.y as number;

    switch (this.direction) {
        case Direction.NORTH:
        newY += 1; // moving up
        break;
        case Direction.SOUTH:
        newY -= 1; // moving down
        break;
        case Direction.EAST:
        newX += 1; // moving right
        break;
        case Direction.WEST:
        newX -= 1; // moving left
        break;
    }

    // Only update the position if it's valid
    if (this.table.isValidPosition(newX, newY)) {
        this.x = newX;
        this.y = newY;
    }
  }

//rotate the robot 90 degrees to the left.
  rotateLeft(): void {
    if (!this.isPlaced()) return;
        this.direction = rotateLeft(this.direction as Direction);
    }

//rotate the robot 90 degrees to the right.
  rotateRight(): void {
    if (!this.isPlaced()) return;
        this.direction = rotateRight(this.direction as Direction);
    }

//returns string (Format: X,Y,DIRECTION) of robot's position and direction
  report(): string | null {
    if (!this.isPlaced()) return null;
        return `${this.x},${this.y},${this.direction}`;
    }
}
