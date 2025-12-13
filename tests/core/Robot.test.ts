import { Robot } from '../../src/core/Robot';
import { Table } from '../../src/core/Table';
import { Direction } from '../../src/core/Direction';

describe('Robot placement', () => {
  let table: Table;
  let robot: Robot;

  beforeEach(() => {
    table = new Table(5, 5);
    robot = new Robot(table);
  });

  it('is not placed initially', () => {
    expect(robot.isPlaced()).toBe(false);
    expect(robot.getPosition()).toBeNull();
  });

  it('places the robot when given a valid position', () => {
    robot.place(1, 2, Direction.NORTH);

    expect(robot.isPlaced()).toBe(true);
    expect(robot.getPosition()).toEqual({
      x: 1,
      y: 2,
      direction: Direction.NORTH
    });
  });

  it('ignores invalid placement outside table bounds', () => {
    robot.place(10, 10, Direction.EAST);

    expect(robot.isPlaced()).toBe(false);
    expect(robot.getPosition()).toBeNull();
  });

  it('allows re-placement with another valid PLACE command', () => {
    robot.place(0, 0, Direction.NORTH);
    robot.place(4, 4, Direction.SOUTH);

    expect(robot.getPosition()).toEqual({
      x: 4,
      y: 4,
      direction: Direction.SOUTH
    });
  });
});
