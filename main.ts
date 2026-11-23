// One Letter: Coffee or Tea — make.fun bounty entry.
//
// The entry is a single letter: "A" for coffee. Coffee wins this argument
// the way it wins most mornings: louder, bolder, and impossible to ignore.
// Tea whispers; coffee shows up.
//
// The program writes exactly that one letter to the output file the
// competition gate reads, and nothing else.

import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const LETTER = "A";

// Guard: the gate only accepts exactly one non-whitespace character.
if (!/^[^\s]$/.test(LETTER)) {
  throw new Error(`LETTER must be a single non-whitespace character, got ${JSON.stringify(LETTER)}`);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outputPath = join(outputDir, "entry.txt");

mkdirSync(outputDir, { recursive: true });
writeFileSync(outputPath, LETTER, { encoding: "utf8", mode: 0o644 });

// Read it back and confirm the gate sees exactly one letter.
const written = readFileSync(outputPath, "utf8");
if (written !== LETTER) {
  throw new Error(`expected exactly ${JSON.stringify(LETTER)} in ${outputPath}`);
}
