// Generates ../sami-widget.html (+ sami-widget.css / sami-widget.js) from the running dev server.
// Usage: pnpm dev (port 3000), then: node wordpress-widget/sami/build/build-widget.mjs
/* eslint-disable */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import os from "node:os";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repo = path.resolve(here, "../../..");
const out = path.resolve(here, "..");
const pnpm = path.join(repo, "node_modules/.pnpm");
const find = (prefix) => fs.readdirSync(pnpm).filter((d) => d.startsWith(prefix)).sort().pop();
const require = createRequire(import.meta.url);
const postcss = require(path.join(pnpm, find("postcss@"), "node_modules/postcss"));
const lightningcss = require(path.join(pnpm, find("lightningcss@"), "node_modules/lightningcss"));

const ORIGIN = process.env.SAMI_ORIGIN || "http://localhost:3000";
const ROOT = "#listaso-sami";
const PFX = "lsm-";

const page = await (await fetch(`${ORIGIN}/sami/`)).text();

/* ---------- 1. HTML: first five sections of <main> ---------- */
const mainStart = page.indexOf("<main");
const re = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][\w:-]*)((?:"[^"]*"|'[^']*'|[^>"'])*?)(\/?)>/g;
re.lastIndex = page.indexOf(">", mainStart) + 1;
const VOID = new Set(["img", "br", "hr", "input", "meta", "link"]);
let depth = 0, begin = 0, m;
const sections = [];
while ((m = re.exec(page))) {
  if (m[0].startsWith("<!--")) continue;
  const [full, close, tag, , self] = m;
  if (close) { if (depth === 0) break; depth--; if (depth === 0) sections.push(page.slice(begin, m.index + full.length)); continue; }
  if (VOID.has(tag.toLowerCase()) || self) { if (depth === 0) sections.push(full); continue; }
  if (depth === 0) begin = m.index;
  depth++;
}
// Page sections in order; NextPage, FinalCta and the hidden analytics marker belong to the site shell.
const WIDGET_SECTIONS = ["hero-title", "examples-title", "included-title", "sami-pricing-title", "sami-sales-contact-title", "faq-title"];
const picked = WIDGET_SECTIONS.map((id) => {
  const found = sections.find((x) => x.includes(`aria-labelledby="${id}"`));
  if (!found) throw new Error(`Section ${id} not found on /sami/`);
  return found;
});
let html = picked.join("\n");
html = html
  .replace(/<!--[\s\S]*?-->/g, "")
  .replace(/ data-nimg="1"| decoding="async"/g, "")
  .replace(/ style="color:transparent;?([^"]*)"/g, (_, rest) => (rest ? ` style="${rest}"` : ""))
  .replace(/<nav aria-label="Breadcrumb">[\s\S]*?<\/nav>/, "")
  .replace(/\sloading="lazy"/g, "");

const dataUri = (file, type = "image/webp") => `data:${type};base64,${fs.readFileSync(file.startsWith("/") ? file : path.join(repo, "public", file)).toString("base64")}`;
html = html.replaceAll('src="/brand/sami/sami-logo.webp"', `src="${dataUri("brand/sami/sami-logo.webp")}"`);

// Hero mark: the poster is 1080px but shown at ~280px, so embed a 560px copy (sips, macOS).
let posterFile = path.join(repo, "public/brand/sami/sami-poster.png");
try {
  const small = path.join(fs.mkdtempSync(path.join(os.tmpdir(), "sami-poster-")), "poster-560.png");
  execFileSync("sips", ["-Z", "560", posterFile, "--out", small], { stdio: "ignore" });
  posterFile = small;
} catch { console.warn("sips unavailable: embedding the full-size poster"); }
html = html.replaceAll('src="/brand/sami/sami-poster.png"', `src="${dataUri(posterFile, "image/png")}"`);
// The 1.2 MB WebM is not inlined. Host it (e.g. WordPress Media Library) and pass SAMI_VIDEO_URL to enable the intro.
html = html.replace(/<source src="\/brand\/sami\/sami-animation\.webm"[^>]*\/?>/g, "");
const videoUrl = process.env.SAMI_VIDEO_URL || "";
for (const img of ["hero-bg", "hero-swirl"]) {
  html = html.replaceAll(`src="/images/sami/${img}.webp"`, `src="${dataUri(`images/sami/${img}.webp`)}"`);
}

const used = new Set();
html = html.replace(/\sclass="([^"]*)"/g, (_, c) => {
  const names = c.split(/\s+/).filter(Boolean);
  names.forEach((n) => used.add(n));
  return ` class="${names.map((n) => PFX + n).join(" ")}"`;
});

const leftoverUrls = [...html.matchAll(/(?:src|href)="(\/[^"]*)"/g)].map((x) => x[1]);
if (leftoverUrls.length) console.warn("Root-relative URLs left:", leftoverUrls);

/* ---------- 2. CSS: flatten layers, prune, scope, prefix ---------- */
const cssLinks = [...page.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)].map((x) => x[1]);
let raw = "";
for (const href of cssLinks) raw += (await (await fetch(ORIGIN + href)).text()) + "\n";

const hashes = {};
for (const x of raw.matchAll(/\.(SamiConversation|SamiExamples)-module__(\w+)__/g)) hashes[x[1]] = x[2];
const alwaysUsed = /^(SamiConversation|SamiExamples|SamiFaqAccordion|GlassPanel)-module__|^samiBrandName$|^sr-only$|^rotate-45$/;
const classOf = (n) => n.replace(/\\(.)/g, "$1");

const root = postcss.parse(raw);
const declared = [];
root.walkAtRules("layer", (r) => { if (!r.nodes) r.params.split(",").forEach((n) => declared.push(n.trim())); });
const rank = (name) => { const i = declared.indexOf(name); return i === -1 ? 50 : i; };

// Flatten @layer blocks in layer order; unlayered rules (CSS Modules) go last, as in the browser.
const buckets = [];
root.each((node, idx) => {
  if (node.type === "atrule" && node.name === "layer") {
    if (!node.nodes || node.params === "properties") return;
    node.nodes.forEach((child) => buckets.push({ rank: rank(node.params), idx: buckets.length, node: child.clone() }));
  } else if (node.type === "comment") { /* skip */ }
  else buckets.push({ rank: 99, idx: buckets.length, node: node.clone() });
});
buckets.sort((a, b) => a.rank - b.rank || a.idx - b.idx);
const flat = postcss.root();
buckets.forEach((b) => flat.append(b.node));

const isRoot = /^(:root|html|body)(?![\w-])/;
function scopeSelector(sel) {
  let s = sel.trim();
  if (!s) return null;
  if (/data-theme="dark"|:not\(\[data-theme|::backdrop|^:host/.test(s)) return null;
  s = s.replace(/\[data-theme(?:="light")?\]/g, "");
  if (/\.home-motion-ready/.test(s)) {
    s = s.replace(/^(?:html|:root)?\.home-motion-ready/, `${ROOT}.${PFX}motion-ready`);
    return s.startsWith(ROOT) ? s.replace(/\.(?!lsm-motion-ready)((?:\\.|[\w-])+)/g, (_, n) => (n === `${PFX}motion-ready` ? `.${n}` : `.${PFX}${n}`)).replace(`.${PFX}${PFX}`, `.${PFX}`) : null;
  }
  // Prefix classes first (rename), then add the root scope.
  const classes = [];
  s = s.replace(/\.((?:\\.|[\w-])+)/g, (_, n) => { classes.push(classOf(n)); return `.${PFX}${n}`; });
  if (classes.some((c) => !used.has(c) && !alwaysUsed.test(c) && !["group", "peer"].includes(c))) return null;
  if (s === "") return ROOT;
  if (isRoot.test(s)) return s.replace(isRoot, ROOT);
  if (s.startsWith("[") && !s.includes(" ")) return `${ROOT} ${s}`;
  return `${ROOT} ${s}`;
}

flat.walkAtRules("media", (r) => { if (/prefers-color-scheme:\s*dark/.test(r.params)) r.remove(); });
flat.walkRules((rule) => {
  if (rule.parent?.type === "atrule" && /keyframes/.test(rule.parent.name)) return;
  const sels = [...new Set(rule.selectors.map(scopeSelector).filter(Boolean))];
  if (!sels.length) rule.remove(); else rule.selectors = sels;
});
// Drop empty at-rules, fallbacks, and keyframes nobody references.
let changed = true;
while (changed) {
  changed = false;
  flat.walkAtRules((r) => {
    if (["media", "supports", "container"].includes(r.name) && !r.nodes?.length) { r.remove(); changed = true; }
  });
}
let css = flat.toString();
flat.walkAtRules(/keyframes$/, (r) => {
  const name = r.params;
  const count = css.split(name).length - 1;
  if (count < 2) r.remove();
});
css = flat.toString();

const base = `
${ROOT} :where(h1,h2,h3,h4,h5,h6,p,a,li,button){text-transform:none;letter-spacing:normal;word-spacing:normal;text-indent:0;text-shadow:none}
${ROOT}{font-family:inherit;isolation:isolate;overflow-x:clip;max-width:100%}
${ROOT} .${PFX}samiBrandName{font-family:Montserrat,"Avenir Next","Segoe UI",Arial,sans-serif}
`;
css += base;
let min = lightningcss.transform({ filename: "sami.css", code: Buffer.from(css), minify: true, targets: { chrome: 100 << 16, safari: 15 << 16, firefox: 100 << 16 } }).code.toString();

// lightningcss re-creates the OS dark-mode switch from its light-dark() helper vars; the widget is light-only.
min = min.replace(/@media \(prefers-color-scheme:\s*dark\)\{[^{}]*\{[^{}]*\}\}/g, "");

/* ---------- 3. JS from source of truth ---------- */
const src = fs.readFileSync(path.join(repo, "src/content/products/sami.ts"), "utf8");
const qStart = src.indexOf("questions: [", src.indexOf("export const examples"));
const qEnd = src.indexOf("\n};", qStart);
const questions = new Function(`return ${src.slice(qStart + "questions: ".length, qEnd).replace(/,\s*$/, "")}`)();
const iconSrc = fs.readFileSync(path.join(repo, "src/components/icons/icon-data.ts"), "utf8");
const rep = iconSrc.slice(iconSrc.indexOf('"report": {'));
const paths = [...rep.slice(0, rep.indexOf("},")).matchAll(/"(M[^"]+)"/g)].map((x) => `<path d="${x[1]}"/>`).join("");
const reportIcon = `<svg viewBox="0 0 1024 1024" width="20" height="20" fill="currentColor" focusable="false" aria-hidden="true">${paths}</svg>`;
let js = fs.readFileSync(path.join(here, "widget.template.txt"), "utf8")
  .replace("{{CONV}}", hashes.SamiConversation).replace("{{EX}}", hashes.SamiExamples)
  .replace("{{EXAMPLES}}", JSON.stringify(questions)).replace("{{REPORT_ICON}}", reportIcon.replace(/'/g, "\\'"));

/* ---------- 4. Write ---------- */
const markup = `<div id="listaso-sami" data-lsm-version="2"${videoUrl ? ` data-video-src="${videoUrl}"` : ""}>\n${html}\n</div>`;
fs.writeFileSync(path.join(out, "sami-widget.css"), min);
fs.writeFileSync(path.join(out, "sami-widget.js"), js);
fs.writeFileSync(
  path.join(out, "sami-widget.html"),
  `<!-- Listaso SAMI preview widget. Paste into an Elementor Pro HTML widget. Generated by build/build-widget.mjs -->\n<style>${min}</style>\n${markup}\n<script>${js}</script>\n`,
);
console.log({ css: min.length, js: js.length, html: html.length, questions: questions.length, hashes });
