import { mkdir } from "node:fs/promises";
import { DAYS, INPUTS_ROOT } from "./constants";

async function ensureResourcesDir(): Promise<void> {
  await mkdir(INPUTS_ROOT, { recursive: true });
}

function getPath(day: number): string {
  return `${INPUTS_ROOT}/day${day}.txt`;
}

async function fetchInput(day: number): Promise<void> {
  const link = `https://adventofcode.com/2025/day/${day}/input`;
  const path = getPath(day);

  const response = await fetch(link, {
    headers: {
      Cookie: `session=${process.env.AOC_SESSION}`,
    },
  });
  const text = await response.text();
  if (!response.ok) {
    throw new Error(
      `Failed to download input for day ${day}: ${response.status} ${response.statusText} - ${text.slice(0, 200)}`,
    );
  }

  await Bun.write(path, text);
}

async function checkIfInputExists(day: number): Promise<string | false> {
  const path = getPath(day);
  const exists = await Bun.file(path).exists();
  if (!exists) {
    return false;
  }
  return path;
}

export async function downloadInputs(selectedDay?: string): Promise<void> {
  await ensureResourcesDir();

  const session = process.env.AOC_SESSION;
  if (!session || session.trim() === "") {
    throw new Error(
      "Missing AOC_SESSION environment variable. Set it to your Advent of Code session cookie value.",
    );
  }
  if (selectedDay) {
    const day = parseInt(selectedDay, 10);
    if (!isNaN(day)) {
      await fetchInput(day);
    }
  } else {
    for (let day = 1; day <= DAYS; day++) {
      await fetchInput(day);
    }
  }
}

export async function checkIfInputsExist(
  selectedDay: string | undefined,
): Promise<boolean> {
  const day = selectedDay ? parseInt(selectedDay, 10) : NaN;
  if (!isNaN(day)) {
    return (await checkIfInputExists(day)) !== false;
  }

  for (let day = 1; day <= DAYS; day++) {
    if (!(await checkIfInputExists(day))) {
      return false;
    }
  }
  return true;
}

export async function getInput({ day }: { day: number }): Promise<string> {
  const path = await checkIfInputExists(day);
  if (!path) {
    throw new Error(`Input for day ${day} does not exist.`);
  }
  return Bun.file(path).text();
}
