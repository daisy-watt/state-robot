// 4 facing directions
export enum Direction {
  NORTH = 'NORTH',
  EAST = 'EAST',
  SOUTH = 'SOUTH',
  WEST = 'WEST'
}

// ol clockwise of directions for rotation
const DIRECTIONS_CLOCKWISE = [
  Direction.NORTH,
  Direction.EAST,
  Direction.SOUTH,
  Direction.WEST
];

// rotates direction 90 degrees to the left
export function rotateLeft(direction: Direction): Direction {
  const index = DIRECTIONS_CLOCKWISE.indexOf(direction);
  return DIRECTIONS_CLOCKWISE[
    (index + DIRECTIONS_CLOCKWISE.length - 1) % DIRECTIONS_CLOCKWISE.length
  ];
}

// rotates direction 90 degrees to the right
export function rotateRight(direction: Direction): Direction {
  const index = DIRECTIONS_CLOCKWISE.indexOf(direction);
  return DIRECTIONS_CLOCKWISE[
    (index + 1) % DIRECTIONS_CLOCKWISE.length
  ];
}
