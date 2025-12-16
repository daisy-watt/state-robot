import { Robot } from '../core/Robot';
import { Direction } from '../core/Direction';

export class CommandProcessor {
  constructor(private robot: Robot) {}

  process(command: string): string | null {
    const trimmed = command.trim();

    if (trimmed.startsWith('PLACE')) {
      this.handlePlace(trimmed);
      return null;
    }

    switch (trimmed) {
      case 'MOVE':
        this.robot.move();
        return null;
      case 'LEFT':
        this.robot.rotateLeft();
        return null;
      case 'RIGHT':
        this.robot.rotateRight();
        return null;
      case 'REPORT':
        return this.robot.report();
      default:
        // Unknown command — ignore..
        return null;
    }
  }

  private handlePlace(command: string): void {
    // Expected format: PLACE X,Y,DIRECTION
    const parts = command.replace('PLACE ', '').split(',');

    if (parts.length !== 3) return;

    const x = Number(parts[0]);
    const y = Number(parts[1]);
    const direction = parts[2] as Direction;

    if (!Object.values(Direction).includes(direction)) return;

    this.robot.place(x, y, direction);
  }
}
