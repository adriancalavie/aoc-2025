import { select } from "@inquirer/prompts";
import { parseArgs } from "node:util";
import { downloadInputs } from "./download-utils";
import { run } from "./run";

const { positionals, values } = parseArgs({
  args: process.argv.slice(2),
  options: {
    day: { type: "string" },
  },
  allowPositionals: true,
});

const day = values.day ?? positionals[1];

if (day) {
  run(day);
} else {
  const choice = await select({
    message: "What do you want to do?",
    default: "run",
    choices: [
      { name: "Run Advent of Code implementation", value: "run" },
      { name: "Download inputs", value: "download" },
      { name: "Exit", value: "exit" },
    ],
  });

  if (choice === "run") {
    run();
  }

  if (choice === "download") {
    console.log("Downloading inputs...");
    await downloadInputs();
  }
}
