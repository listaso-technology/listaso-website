import { createHash } from "node:crypto";
import { createReadStream } from "node:fs";
import { appendFile, lstat, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";

// Packages an already validated build. Never connects to a deployment target.
const destination = process.argv[2];
if (!destination) throw new Error("Usage: node scripts/package-static-export.mjs <new-output-directory>");
const root = process.cwd();
const output = path.resolve(root, "out");
const target = path.resolve(destination);
if (target === output || target.startsWith(`${output}${path.sep}`)) {
  throw new Error("Package destination must be outside out/");
}
const git = (...args) => execFileSync("git", args, { encoding: "utf8" }).trim();
const commit = git("rev-parse", "HEAD");
if (!/^[a-f0-9]{40}$/.test(commit)) throw new Error("Expected a complete commit SHA");
if (process.env.GITHUB_SHA && process.env.GITHUB_SHA !== commit) {
  throw new Error("Checked-out commit does not match GITHUB_SHA");
}
const clean = git("status", "--porcelain") === "";
if (process.env.GITHUB_ACTIONS === "true" && !clean) {
  throw new Error("CI checkout contains uncommitted changes");
}
const nodeVersion = (await readFile(".node-version", "utf8")).trim();
if (process.versions.node !== nodeVersion) throw new Error(`Expected Node ${nodeVersion}`);
const pkg = JSON.parse(await readFile("package.json", "utf8"));
const pnpmVersion = execFileSync("pnpm", ["--version"], { encoding: "utf8" }).trim();
if (`pnpm@${pnpmVersion}` !== pkg.packageManager) throw new Error("Unexpected pnpm version");

async function checkTree(directory) {
  if (!(await lstat(directory)).isDirectory()) throw new Error(`Not a directory: ${directory}`);
  for (const name of await readdir(directory)) {
    const file = path.join(directory, name);
    const stat = await lstat(file);
    // Empty-directory markers from public/ are not web assets.
    if (name === ".gitkeep" && stat.isFile()) continue;
    if (name.startsWith(".") || stat.isSymbolicLink()) throw new Error(`Hidden file or link in export: ${file}`);
    if (stat.isDirectory()) await checkTree(file);
    else if (!stat.isFile()) throw new Error(`Unsupported export entry: ${file}`);
  }
}
await checkTree(output);
for (const file of ["index.html", "404.html"]) {
  if (!(await lstat(path.join(output, file))).isFile()) throw new Error(`Missing ${file}`);
}
if (!(await lstat(path.join(output, "_next"))).isDirectory()) throw new Error("Missing _next/");

// Refuse to overwrite or mix with an older package.
await mkdir(target);
const archive = `listaso-${commit}.tgz`;
execFileSync("tar", ["--exclude=.gitkeep", "-C", output, "-czf", path.join(target, archive), "."], {
  env: { ...process.env, COPYFILE_DISABLE: "1" },
  stdio: "inherit",
});
async function sha256(file) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(file)) hash.update(chunk);
  return hash.digest("hex");
}
const info = {
  commit,
  workingTreeClean: clean,
  builtAtUtc: new Date().toISOString(),
  node: process.versions.node,
  pnpm: pnpmVersion,
  next: pkg.dependencies.next,
  lockfileSha256: await sha256("pnpm-lock.yaml"),
  archive,
  archiveSha256: await sha256(path.join(target, archive)),
  buildCommand: "pnpm build",
  repository: process.env.GITHUB_REPOSITORY ?? null,
  event: process.env.GITHUB_EVENT_NAME ?? "local-validation",
  ref: process.env.GITHUB_REF ?? null,
  runId: process.env.GITHUB_RUN_ID ?? null,
  runAttempt: process.env.GITHUB_RUN_ATTEMPT ?? null,
};
await writeFile(path.join(target, "BUILD_INFO.json"), `${JSON.stringify(info, null, 2)}\n`);
await writeFile(path.join(target, "SHA256SUMS"),
  `${info.archiveSha256}  ${archive}\n${await sha256(path.join(target, "BUILD_INFO.json"))}  BUILD_INFO.json\n`);
if (process.env.GITHUB_STEP_SUMMARY) {
  await appendFile(process.env.GITHUB_STEP_SUMMARY,
    `### Static export package\n\nCommit: \`${commit}\`\n\nArchive: \`${archive}\`\n\nSHA-256: \`${info.archiveSha256}\`\n\nDownload and verify SHA256SUMS before manual transfer. No deployment performed.\n`);
}
console.log(`Package created: ${target}\nCommit: ${commit}\nSHA-256: ${info.archiveSha256}`);
