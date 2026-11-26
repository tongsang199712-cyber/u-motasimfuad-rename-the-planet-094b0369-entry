// Rename the Planet — make.fun bounty entry
//
// The entry is a single funny line that gives Mercury a new name and says
// why in the same breath. Mercury orbits the Sun in just 88 days, so it
// crams a full year into less time than an Earth season — the overworked
// intern of the solar system. It also sits closest to the Sun, so it is
// constantly scorched: burned by the boss, literally and figuratively.
// The joke lands on the idea (fastest orbit + closest to the Sun), not on
// a pun on the planet's real name, and the line stays tight at 100 chars.
//
// This program writes that line to /output/entry.txt, the path the
// make.fun gate checks: UTF-8 text, 1-200 characters, not only
// whitespace, one single line, no trailing newline.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "Mercury is now The Intern, because it does a full year in 88 days and still gets burned by the boss.";

mkdirSync("/output", { recursive: true });

if (LINE.length < 1 || LINE.length > 200) {
  throw new Error(`Line must be 1-200 characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must be a single line with no newline characters");
}

writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back and verify byte-for-byte: what the gate reads must be exactly
// the line we wrote, with no trailing newline and no extra content.
const readBack = readFileSync("/output/entry.txt", "utf8");
if (readBack !== LINE) {
  throw new Error(
    `Read-back mismatch: expected ${JSON.stringify(LINE)}, got ${JSON.stringify(readBack)}`,
  );
}
if (readBack.endsWith("\n")) {
  throw new Error("entry.txt must not end with a newline");
}

console.log(`Wrote ${LINE.length} characters to /output/entry.txt`);
console.log(LINE);
