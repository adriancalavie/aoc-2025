import { getInput } from "../download-utils";

type Direction = "L" | "R";
type Value = number;
type Rotation = {
  direction: Direction;
  distance: Value;
};
const STARTING = 50;
const MAX = 99;

function turnRight(from: Value, distance: Value): Value {
  let result = from + distance;

  while (result > MAX) {
    result -= MAX + 1;
  }

  return result;
}

function turnLeft(from: Value, distance: Value): Value {
  let result = from - distance;

  while (result < 0) {
    result += MAX + 1;
  }

  return result;
}

function turn(from: Value, rotation: Rotation): Value {
  switch (rotation.direction) {
    case "R":
      return turnRight(from, rotation.distance);
    case "L":
      return turnLeft(from, rotation.distance);
  }
}

export async function solve(): Promise<void> {
  const lines = await getInput({ day: 1 }).then((text) =>
    text.split("\n").filter((line) => line.trim().length > 0),
  );

  const rotations = lines.map((line) => {
    const [direction, distance] = [line[0], line.slice(1)];
    return {
      direction: direction as Direction,
      distance: parseInt(distance),
    };
  });

  const result = rotations.reduce(
    (acc, rotation) => {
      return {
        value: turn(acc.value, rotation),
        zeroCount: acc.zeroCount + (acc.value === 0 ? 1 : 0),
      };
    },
    { value: STARTING, zeroCount: 0 },
  );

  console.log(`Result: ${result.zeroCount}`);
}
