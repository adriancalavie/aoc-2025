# Advent of Code 2025 - Typescript

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run src/main.ts
# or via the package script:
bun run main
# or for a specific day:
bun run main --day 1
```

## Environment setup

This project expects an Advent of Code session cookie to download puzzle inputs.

1) Get your Advent of Code session token
- Log in at https://adventofcode.com/
- Open your browser’s developer tools and find the cookie named `session` for the `adventofcode.com` domain
- Copy its value

2) Provide the token to the app
- Option A: Set an environment variable before running
  - macOS/Linux:
    ```bash
    export AOC_SESSION="your_session_token_here"
    ```
  - Windows PowerShell:
    ```powershell
    $env:AOC_SESSION="your_session_token_here"
    ```
- Option B: Create a `.env` file in the project root:
  ```bash
  AOC_SESSION=your_session_token_here
  ```
  `.env` is gitignored and will be loaded when running with Bun.

## Using the CLI

- Install dependencies:
  ```bash
  bun install
  ```
- Run the CLI:
  ```bash
  bun run src/main.ts
  # or:
  bun run main
  ```

### Downloading inputs
- From the menu, choose “Download inputs”, or choose “Run Advent of Code implementation” and accept the prompt to download
- Inputs are saved to `./resources/dayN.txt` (e.g., `resources/day1.txt`)

### Troubleshooting
- If you see “Missing AOC_SESSION environment variable”, set it as shown above
- If you receive 4xx/5xx responses:
  - Ensure your `AOC_SESSION` cookie is valid and you’re logged in
  - Inputs for a day are only available after the day unlocks; before then, the endpoint may return 404
  - Make sure you’re requesting the correct year (this project targets 2025)

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
