import { compilerOptions } from "./tsconfig.json";
import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  roots: ["<rootDir>"],
  modulePaths: [compilerOptions.baseUrl],
};

export default jestConfig;
