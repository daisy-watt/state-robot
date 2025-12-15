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

    it('moves north within bounds', () => {
    robot.place(0, 0, Direction.NORTH);
    robot.move();
    expect(robot.getPosition()).toEqual({ x: 0, y: 1, direction: Direction.NORTH });
  });

  it('prevents falling off the table', () => {
    robot.place(0, 4, Direction.NORTH); // top edge
    robot.move();
    expect(robot.getPosition()).toEqual({ x: 0, y: 4, direction: Direction.NORTH });
  });

  it('moves in all directions within bounds', () => {
    robot.place(2, 2, Direction.SOUTH);
    robot.move();
    expect(robot.getPosition()).toEqual({ x: 2, y: 1, direction: Direction.SOUTH });

    robot.place(2, 2, Direction.EAST);
    robot.move();
    expect(robot.getPosition()).toEqual({ x: 3, y: 2, direction: Direction.EAST });

    robot.place(2, 2, Direction.WEST);
    robot.move();
    expect(robot.getPosition()).toEqual({ x: 1, y: 2, direction: Direction.WEST });
  });

  it('ignores move if robot not placed', () => {
    robot.move();
    expect(robot.getPosition()).toBeNull();
  });
});

describe('Robot rotation', () => {
  let table: Table;
  let robot: Robot;

  beforeEach(() => {
    table = new Table(5, 5);
    robot = new Robot(table);
  });

  it('rotates left correctly', () => {
    robot.place(2, 2, Direction.NORTH);
    robot.rotateLeft();
    expect(robot.getPosition()?.direction).toBe(Direction.WEST);

    robot.rotateLeft();
    expect(robot.getPosition()?.direction).toBe(Direction.SOUTH);

    robot.rotateLeft();
    expect(robot.getPosition()?.direction).toBe(Direction.EAST);

    robot.rotateLeft();
    expect(robot.getPosition()?.direction).toBe(Direction.NORTH);
  });

  it('rotates right correctly', () => {
    robot.place(2, 2, Direction.NORTH);
    robot.rotateRight();
    expect(robot.getPosition()?.direction).toBe(Direction.EAST);

    robot.rotateRight();
    expect(robot.getPosition()?.direction).toBe(Direction.SOUTH);

    robot.rotateRight();
    expect(robot.getPosition()?.direction).toBe(Direction.WEST);

    robot.rotateRight();
    expect(robot.getPosition()?.direction).toBe(Direction.NORTH);
  });

  it('ignores rotation if robot not placed', () => {
    robot.rotateLeft();
    robot.rotateRight();
    expect(robot.getPosition()).toBeNull();
  });
});

describe('Robot report', () => {
  let table: Table;
  let robot: Robot;

  beforeEach(() => {
    table = new Table(5, 5);
    robot = new Robot(table);
  });

  it('returns formatted position when placed', () => {
    robot.place(1, 2, Direction.NORTH);
    expect(robot.report()).toBe('1,2,NORTH');
  });

  it('returns null if robot not placed', () => {
    expect(robot.report()).toBeNull();
  });

  it('reflects updated position after move', () => {
    robot.place(0, 0, Direction.NORTH);
    robot.move();
    expect(robot.report()).toBe('0,1,NORTH');
  });

  it('reflects updated direction after rotation', () => {
    robot.place(0, 0, Direction.NORTH);
    robot.rotateLeft();
    expect(robot.report()).toBe('0,0,WEST');
  });
});
