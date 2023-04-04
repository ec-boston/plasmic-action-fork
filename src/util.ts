import * as core from "@actions/core";
import { nanoid } from "nanoid";
import { existsSync } from "fs";
import path from "path";

export type Outputs = {
  synced: boolean;
  new_branch: string;
  publish_dir: string;
};

type PackageManagerCmds = {
  install: string;
  run: string;
  add: string;
  cmd: string;
};

export function assertNoSingleQuotes(str: string) {
  if (str.includes("'")) {
    throw new Error(`Invalid string (contains single quotes): ${str}`);
  }
}

export function mkPackageManagerCmds(cwd: string): PackageManagerCmds {
  const useYarn = existsSync(path.join(cwd, "yarn.lock"));

  // if (useYarn) {
  return {
    install: "yarn",
    run: "yarn",
    add: "yarn add -W",
    cmd: "yarn",
  };
}

//   return {
//     install: "npm install",
//     run: "npm run",
//     add: "npm install",
//     cmd: "npx",
//   };
// }

export function mkPrBranchName(targetBranch: string) {
  return `plasmicops/${nanoid(8)}/${targetBranch}`;
}

export function setOutputs(outputs: Partial<Outputs>) {
  for (const [k, v] of Object.entries(outputs)) {
    core.setOutput(k, v);
  }
}
