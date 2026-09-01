#!/usr/bin/env node
// index.html is written to be published as a Claude Artifact, where the platform
// supplies the doctype and <head>. GitHub Pages does not, so wrap the same source
// rather than keeping a second copy that will drift.
const fs = require("fs");
const path = require("path");

const src = path.join(__dirname, "index.html");
const outDir = path.join(__dirname, "..", "docs", "bobas-machine");
const out = path.join(outDir, "index.html");

const body = fs.readFileSync(src, "utf8");

const page = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="Write song pitches that fit 440 characters.">
<meta name="color-scheme" content="light dark">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>%F0%9F%8E%80</text></svg>">
<style>
  html,body{margin:0}
  body{font:14px system-ui,-apple-system,sans-serif}
  img{max-width:100%}
  [hidden]{display:none!important}
</style>
</head>
<body>
${body}
</body>
</html>
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(out, page);
console.log("built " + path.relative(path.join(__dirname, ".."), out) + " (" + page.length + " bytes)");
