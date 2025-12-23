import { select } from "@inquirer/prompts";
import { DAYS } from "./constants";
import { checkIfInputsExist, downloadInputs } from "./download-utils";

export async function run(day?: string): Promise<void> {
  const inputsExist = await checkIfInputsExist(day);
  if (!inputsExist) {
    const download = await select({
      message:
        "The inputs folder seems to be empty or have missing files.\nDo you want to download them?",
      choices: [
        { name: "Yes", value: true },
        { name: "No", value: false },
      ],
    });

    if (download) {
      console.log("Downloading inputs...");
      await downloadInputs(day);
    }
  }

  let selectedDay = day
    ? parseInt(day)
    : await select({
        loop: false,
        message: "Which day do you want to run?",
        choices: Array.from(Array(DAYS).keys()).map((day) => ({
          name: `Day ${day + 1}`,
          value: day + 1,
        })),
      });

  await import(`./day${selectedDay}/solve`).then((module) => module.solve());
}
